
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    console.log("Creating checkout session");
    
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Parse request body for order details
    const { items, total, email } = await req.json();
    console.log(`Checkout requested for ${items.length} items, total: ${total}, email: ${email || 'guest'}`);

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

    // Check if we have user authentication
    let userId = null;
    if (req.headers.has("Authorization")) {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseAdmin.auth.getUser(token);
        if (userData?.user) {
          userId = userData.user.id;
          console.log(`Authenticated user: ${userId}`);
        }
      }
    }

    // Check if a Stripe customer already exists for this user or email
    let customerId = null;
    
    // First try to find by email
    if (email) {
      const customers = await stripe.customers.list({ 
        email: email,
        limit: 1 
      });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        console.log(`Found existing Stripe customer by email: ${customerId}`);
      }
    }
    
    // If no customer found by email and we have a userId, check if we have a mapping in our database
    if (!customerId && userId) {
      const { data: userRecord } = await supabaseAdmin
        .from('users')
        .select('stripe_customer_id')
        .eq('id', userId)
        .maybeSingle();
      
      if (userRecord?.stripe_customer_id) {
        customerId = userRecord.stripe_customer_id;
        console.log(`Found existing Stripe customer from user record: ${customerId}`);
      }
    }
    
    // If still no customer, create a new one
    if (!customerId && email) {
      const customerData = {
        email: email,
        metadata: { 
          supabase_user_id: userId 
        }
      };
      
      const newCustomer = await stripe.customers.create(customerData);
      customerId = newCustomer.id;
      console.log(`Created new Stripe customer: ${customerId}`);
      
      // If we have a userId, update our database with the mapping
      if (userId) {
        // Check if the user exists in our users table
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('id', userId)
          .maybeSingle();
        
        if (existingUser) {
          // Update the existing user with the Stripe customer ID
          await supabaseAdmin
            .from('users')
            .update({ stripe_customer_id: customerId })
            .eq('id', userId);
        } else {
          // Insert a new user record with the Stripe customer ID
          await supabaseAdmin
            .from('users')
            .insert({
              id: userId,
              email: email,
              stripe_customer_id: customerId
            });
        }
        console.log(`Updated user record with Stripe customer ID`);
      }
    }

    // Get the origin for success/cancel URLs
    const origin = req.headers.get("origin") || "http://localhost:5173";
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: !customerId && email ? email : undefined,
      payment_method_types: ["card"],
      line_items: items.map((item: any) => {
        // If the product has a Stripe product ID, use it
        if (item.product.stripeProductId) {
          return {
            price_data: {
              currency: "usd",
              product: item.product.stripeProductId,
              unit_amount: Math.round(item.product.price * 100), // convert to cents
            },
            quantity: item.quantity,
          };
        } else {
          // Otherwise fallback to creating the product dynamically
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.product.name,
                images: [item.product.image],
              },
              unit_amount: Math.round(item.product.price * 100), // convert to cents
            },
            quantity: item.quantity,
          };
        }
      }),
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&total=${total}`,
      cancel_url: `${origin}/payment-cancelled`,
      metadata: {
        order_total: total.toString(),
        customer_email: email || '',
        user_id: userId || '',
        items_count: items.length.toString(),
        items_json: JSON.stringify(items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        }))).slice(0, 500) // Stripe has a metadata value limit
      },
    });

    console.log(`Checkout session created: ${session.id}`);
    
    // Return the session ID and URL to the client
    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
