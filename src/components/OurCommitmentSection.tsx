
import React from "react";

const GOLD = "#d7b87c";

export default function OurCommitmentSection() {
  return (
    <section
      className="w-full flex justify-center items-center my-16"
      style={{
        background: "transparent",
      }}
    >
      <div
        className="w-full max-w-5xl mx-auto p-8 md:p-14 border border-solid"
        style={{
          borderColor: GOLD,
          background: "rgba(10,10,10,0.92)",
        }}
      >
        <h2
          className="text-4xl md:text-5xl font-playfair font-semibold text-center mb-8"
          style={{
            color: GOLD,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "0.01em",
          }}
        >
          Our Commitment
        </h2>
        <blockquote className="text-lg md:text-xl text-center text-[#e9e7e0] font-normal leading-relaxed font-montserrat mx-auto max-w-3xl mb-8">
          "We are dedicated to creating sustainable luxury that doesn't compromise on quality or ethics.
          <br className="hidden md:block" />
          Each Intimisii product represents our promise to deliver excellence while honoring our responsibility
          <br className="hidden md:block" />
          to the planet and future generations."
        </blockquote>
        <div className="flex justify-center">
          <span
            className="block text-2xl font-bold font-playfair"
            style={{
              color: GOLD,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.01em",
            }}
          >
            — Saffiyyah Muhammad
          </span>
        </div>
      </div>
    </section>
  );
}
