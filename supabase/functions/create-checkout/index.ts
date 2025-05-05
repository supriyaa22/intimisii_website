
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

    // Get the origin for success/cancel URLs
    const origin = req.headers.get("origin") || "http://localhost:5173";
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
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
      customer_email: email || undefined,
      metadata: {
        order_total: total.toString(),
        customer_email: email || '',
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
