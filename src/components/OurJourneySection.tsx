import React from "react";

const GOLD = "#d7b87c";

export default function OurJourneySection() {
  return (
    <section
      className="relative max-w-6xl mx-auto mb-20 py-12 px-2 md:px-8"
      style={{ background: "transparent" }}
    >
      <div
        className="border-t border-b pt-12 pb-16 md:pt-16 md:pb-28 px-0 md:px-8"
        style={{ borderColor: GOLD }}
      >
        <h2
          className="text-center font-playfair text-4xl md:text-5xl font-semibold mb-12"
          style={{
            color: "#fff",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.01em",
            position: "relative",
          }}
        >
          Our{" "}
          <span
            style={{
              color: GOLD,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            Journey
          </span>
        </h2>
        {/* Timeline container */}
        <div className="relative flex flex-col md:flex-row items-start md:items-stretch">
          {/* Left: Timeline steps */}
          <div className="flex-1 mt-0 md:mt-8 relative z-10">
            {/* Step 1 */}
            <div className="mb-16 md:mb-20">
              <h3
                className="text-2xl md:text-3xl font-playfair font-semibold mb-3"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
              >
                The Beginning
              </h3>
              <p className="text-base md:text-lg text-[#f5f5ef] font-montserrat leading-relaxed max-w-lg">
                Intimisii was founded with a vision to redefine luxury home fragrances through a commitment to artisanal craftsmanship and sustainable practices.
              </p>
            </div>
            {/* Step 2 */}
            <div className="mb-16 md:mb-20">
              <h3
                className="text-2xl md:text-3xl font-playfair font-semibold mb-3"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
              >
                Global Expansion
              </h3>
              <p className="text-base md:text-lg text-[#f5f5ef] font-montserrat leading-relaxed max-w-lg">
                After gaining recognition for our exceptional quality, we expanded our presence to international markets, bringing our distinctive sensory experiences to a global audience.
              </p>
            </div>
            {/* Step 3 */}
            <div>
              <h3
                className="text-2xl md:text-3xl font-playfair font-semibold mb-3"
                style={{ color: GOLD, fontFamily: "'Playfair Display', serif" }}
              >
                Innovation & Legacy
              </h3>
              <p className="text-base md:text-lg text-[#f5f5ef] font-montserrat leading-relaxed max-w-lg">
                Today, we continue to innovate while honoring our founding principles, creating new collections that push the boundaries of luxury while maintaining our commitment to sustainability.
              </p>
            </div>
          </div>
          {/* Right: Updated Journey illustration image (replaces SVG+pins) */}
          <div className="absolute right-0 top-8 md:top-0 w-1/2 md:w-[400px] h-[380px] md:h-[500px] z-0 pointer-events-none select-none hidden md:flex items-center justify-center">
            <img
              src="/lovable-uploads/9f4dab59-fede-459c-9763-e7dd9ec934d1.png"
              alt="Intimisii Journey Path"
              className="object-contain w-full h-full"
              style={{
                display: "block",
                maxWidth: "400px",
                maxHeight: "100%",
              }}
            />
          </div>
        </div>
        {/* Mobile fallback: as before, keep pins in a row */}
        <div className="block md:hidden w-full mt-12 flex flex-row items-center justify-center gap-6">
          <img
            src="/lovable-uploads/f9152ba8-5b41-4471-9105-8e6b33cd5b94.png"
            alt="Journey Pin 1"
            className="w-[46px] h-[46px] rounded-full border-2"
            style={{ borderColor: GOLD }}
          />
          <img
            src="/lovable-uploads/ceff39fd-7fa6-43df-9414-34c58026203a.png"
            alt="Journey Pin 2"
            className="w-[44px] h-[44px] rounded-full border-2"
            style={{ borderColor: GOLD }}
          />
          <img
            src="/lovable-uploads/1de72dba-2442-49d2-b545-de17ac8094c6.png"
            alt="Journey Pin 3"
            className="w-[42px] h-[42px] rounded-full border-2"
            style={{ borderColor: GOLD }}
          />
        </div>
      </div>
    </section>
  );
}
