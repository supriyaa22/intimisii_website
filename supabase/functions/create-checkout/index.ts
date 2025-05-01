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
    // Initialize Stripe with the secret key
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Parse request body for order details
    const { items, total, email } = await req.json();

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
              unit_amount: item.product.price * 100, // convert to cents
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
              unit_amount: item.product.price * 100, // convert to cents
            },
            quantity: item.quantity,
          };
        }
      }),
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
      customer_email: email || undefined,
      metadata: {
        order_total: total,
      },
    });

    // Return the session ID and URL to the client
    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
