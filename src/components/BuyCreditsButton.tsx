"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

type Props = {
  onBuy: () => void;
  credits: number;
  price: number;
  purchased: boolean;
};

export default function BuyCreditsButton({ onBuy, credits, price, purchased }: Props) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onBuy}
      disabled={purchased}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:cursor-not-allowed"
      style={{
        background: purchased
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
        transform: pressed
          ? "scale(0.97)"
          : hovered && !purchased
          ? "scale(1.03)"
          : "scale(1)",
        boxShadow:
          hovered && !purchased
            ? "0 8px 28px rgba(17, 24, 39, 0.38)"
            : "0 2px 8px rgba(17, 24, 39, 0.2)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.25s ease",
      }}
    >
      {/* Shine overlay on hover */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            hovered && !purchased
              ? "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)"
              : "transparent",
          transition: "background 0.2s ease",
        }}
      />

      {purchased ? (
        <>
          <Check className="w-4 h-4" strokeWidth={2.5} />
          {credits} Credits Added!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          Buy {credits} Credits — ${price}
        </>
      )}
    </button>
  );
}
