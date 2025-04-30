
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="min-h-screen bg-darkbg">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 md:pb-24">
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl md:text-4xl mb-4 font-serif">Help Centre</h1>
          <h2 className="text-gold text-4xl md:text-5xl font-serif mb-6">Frequently Asked Questions</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more.
            If you need additional assistance, please don't hesitate to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                How long do the candles burn?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Our luxury candles are designed to burn for approximately 40-60 hours, depending on the size. For optimal burning, we recommend limiting each burn session to 2-3 hours to extend the life of your candle and maintain its fragrance integrity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                Are the candles eco-friendly?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Yes, our candles are crafted with sustainability in mind. We use 100% natural soy wax, which is biodegradable and renewable. Our wicks are cotton and lead-free, and our packaging is made from recycled materials that can be repurposed or recycled.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                What makes the massage candles different?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Our massage candles are specially formulated with a lower melting point than traditional candles. They melt into a warm oil that's perfect for massage, infused with nourishing ingredients like shea butter and vitamin E that moisturize and soften the skin while releasing our signature fragrances.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                How do I use the massage candles?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Light your massage candle and allow it to burn until a pool of melted wax forms (usually 20-30 minutes). Blow out the flame and let it cool slightly for 1-2 minutes. Test the temperature on your wrist before applying to skin. Pour or spoon a small amount of the warm oil onto your skin and massage gently.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                Do you ship internationally?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Yes, we proudly ship our luxury candles worldwide. International shipping times vary by location, typically taking 7-14 business days. Please note that customs duties and taxes may apply depending on your country's import regulations and are the responsibility of the recipient.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                What is your Return Policy?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                We accept returns within 14 days of delivery for unused, unopened products in their original packaging. For damaged or defective items, please contact our customer service team within 48 hours of receipt with photos of the damage for a replacement or refund.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                What ingredients do you use in your candle?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Our candles are made with premium 100% natural soy wax, cotton wicks, and a proprietary blend of essential oils and fine fragrances. For our massage candles, we add nourishing ingredients like coconut oil, shea butter, and vitamin E. All our products are paraben-free, phthalate-free, and never tested on animals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                Do you offer corporate gifting options?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                Yes, we offer bespoke corporate gifting solutions. Our team can create custom-labeled candles for your brand, curate gift boxes for special occasions, or design bulk orders for events. Please contact our corporate sales team for a personalized quote and consultation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border-b border-white/20">
              <AccordionTrigger className="py-6 text-xl font-serif text-white hover:no-underline">
                How can I care for my candle to ensure optimal performance?
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-6">
                For the best experience, trim the wick to 1/4 inch before each use to prevent excessive smoke and uneven burning. The first time you light your candle, allow it to burn until the entire top layer of wax has melted to the edges (about 2-3 hours) to prevent tunneling. Keep away from drafts, and always place on a heat-resistant surface.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
