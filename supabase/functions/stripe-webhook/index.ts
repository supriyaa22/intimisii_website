
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// This endpoint needs to be public - no JWT verification
// since Stripe will call it directly
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Stripe webhook received");
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Get the signature from the header
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // Get the raw body for verification
    const body = await req.text();
    
    // Get the webhook signing secret from environment variables
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("Stripe webhook secret not configured");
    }

    // Verify and construct the event
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Stripe event type: ${event.type}`);
    
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(`Processing checkout session: ${session.id}`);
      
      // Create a Supabase client using the service role key to bypass RLS
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
        {
          auth: {
            persistSession: false,
          },
        }
      );

      // Get user information from session metadata
      const customerId = session.customer;
      const customerEmail = session.customer_details?.email || session.metadata?.customer_email || '';
      const totalAmount = parseFloat(session.metadata?.order_total || '0');
      
      // Fetch or create user ID
      let userId = null;
      
      // If we have an email, try to find the user or use anonymous
      if (customerEmail) {
        const { data: userData } = await supabaseAdmin
          .from('auth.users')
          .select('id')
          .eq('email', customerEmail)
          .single();
        
        userId = userData?.id;
        console.log(`Found user ID: ${userId}`);
      }
      
      // Create order record
      const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          user_id: userId,
          stripe_session_id: session.id,
          total_amount: totalAmount,
        })
        .select()
        .single();
      
      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }
      
      console.log(`Created order: ${orderData.id}`);
      
      // Retrieve line items from the session to create order items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      // Create order items
      const orderItems = lineItems.data.map(item => ({
        order_id: orderData.id,
        product_name: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100 / (item.quantity || 1), // Convert from cents and divide by quantity
      }));
      
      if (orderItems.length > 0) {
        const { error: itemsError } = await supabaseAdmin
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) {
          console.error('Error creating order items:', itemsError);
          throw itemsError;
        }
        
        console.log(`Created ${orderItems.length} order items`);
      }
    }

    // Return a success response
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
