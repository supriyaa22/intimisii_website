
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
      const userId = session.metadata?.user_id || null;
      const totalAmount = parseFloat(session.metadata?.order_total || '0');
      
      // Determine the final user ID for the order
      let finalUserId = userId;
      
      if (!finalUserId && customerId) {
        // Try to find user by Stripe customer ID
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .maybeSingle();
        
        if (userData) {
          finalUserId = userData.id;
          console.log(`Found user ID from stripe_customer_id: ${finalUserId}`);
        }
      }
      
      if (!finalUserId && customerEmail) {
        // Try to find user by email
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', customerEmail)
          .maybeSingle();
        
        if (userData) {
          finalUserId = userData.id;
          console.log(`Found user ID from email: ${finalUserId}`);
        } else {
          // Look for the user in auth.users
          const { data: authUser } = await supabaseAdmin.auth.admin.listUsers({
            filter: {
              email: customerEmail
            }
          });
          
          if (authUser && authUser.users && authUser.users.length > 0) {
            finalUserId = authUser.users[0].id;
            console.log(`Found auth user ID: ${finalUserId}`);
          }
        }
      }
      
      // If we still don't have a user ID, create a guest user ID
      if (!finalUserId) {
        finalUserId = crypto.randomUUID();
        console.log(`Created guest user ID: ${finalUserId} for email: ${customerEmail}`);
      }
      
      // Create order record
      const { data: orderData, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          user_id: finalUserId,
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
      
      // If this was a successful checkout and we have a customerId but no user mapping,
      // create or update the user record with the Stripe customer ID for future orders
      if (customerId && customerEmail && !userId) {
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id, stripe_customer_id')
          .eq('email', customerEmail)
          .maybeSingle();
        
        if (existingUser) {
          // Only update if the stripe_customer_id isn't already set
          if (!existingUser.stripe_customer_id) {
            await supabaseAdmin
              .from('users')
              .update({ stripe_customer_id: customerId })
              .eq('id', existingUser.id);
            console.log(`Updated existing user with Stripe customer ID: ${existingUser.id}`);
          }
        } else {
          // Create new user entry with the Stripe customer ID
          await supabaseAdmin
            .from('users')
            .insert({
              id: finalUserId,
              email: customerEmail,
              stripe_customer_id: customerId
            });
          console.log(`Created new user with Stripe customer ID: ${finalUserId}`);
        }
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
