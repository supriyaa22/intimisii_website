
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Use the provided Stripe secret key
const STRIPE_SECRET_KEY = "sk_test_51RK5NcR0Phz7rb8GXX90gnzuuey70mU5ibLmFRAPggTJB8dcMYwSn1PY66NNZtXWojCX7tU391R4lZIfT12Ek1Yc00ox3ggBMY";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, total, email } = await req.json();
    
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    console.log(`Creating checkout session for ${email || 'guest'} with ${items.length} items`);
    console.log(`Total amount: ${total.toFixed(2)}`);

    // Get domain from request origin or referer header
    let origin = req.headers.get("origin") || req.headers.get("referer");
    if (origin) {
      // Extract just the origin part (protocol + hostname)
      const url = new URL(origin);
      origin = `${url.protocol}//${url.host}`;
    } else {
      origin = "https://intimisii.lovable.app"; // Fallback domain
    }
    console.log(`Using origin: ${origin}`);

    // Format line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_total=${total.toFixed(2)}`,
      cancel_url: `${origin}/payment-cancelled`,
    });

    console.log(`Checkout session created with ID: ${session.id}\n`);

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (err) {
    console.error(`Error creating checkout session: ${err.message}`);
    return new Response(
      JSON.stringify({ error: err.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
