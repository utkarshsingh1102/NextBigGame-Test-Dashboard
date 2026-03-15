"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { CreditPack } from "@/store/creditsStore";

type Props = {
  pack: CreditPack;
  isSelected: boolean;
  onSelect: () => void;
  isBestValue?: boolean;
};

export default function CreditPackCard({ pack, isSelected, onSelect, isBestValue }: Props) {
  const [hovered, setHovered] = useState(false);

  const elevated = isSelected || hovered;

  const borderStyle = isSelected
    ? "linear-gradient(135deg, #f97316, #a855f7)"
    : hovered
    ? "linear-gradient(135deg, #fdba74, #d8b4fe)"
    : "linear-gradient(135deg, #e5e7eb, #d1d5db)";

  return (
    <div className="relative pt-4">
      {/* Best Value badge — sits above the card */}
      {isBestValue && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #f97316, #a855f7)" }}
        >
          ★ Best Value
        </div>
      )}

      <button
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full text-left rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        style={{
          padding: "1.5px",
          background: borderStyle,
          transform: elevated ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isSelected
            ? "0 12px 32px rgba(249, 115, 22, 0.22)"
            : hovered
            ? "0 8px 24px rgba(0,0,0,0.12)"
            : "0 1px 4px rgba(0,0,0,0.06)",
          transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
        }}
        aria-pressed={isSelected}
      >
        {/* Inner card surface */}
        <div
          className="relative rounded-[10px] p-3.5"
          style={{
            background: isSelected ? "#fff8f5" : "#ffffff",
            transition: "background 0.15s ease",
          }}
        >
          {/* Animated checkmark */}
          <div
            className="absolute top-2.5 right-2.5 w-[18px] h-[18px] rounded-full flex items-center justify-center"
            style={{
              background: isSelected
                ? "linear-gradient(135deg, #f97316, #a855f7)"
                : "transparent",
              border: isSelected ? "none" : "1.5px solid #e5e7eb",
              opacity: isSelected ? 1 : 0.5,
              transform: isSelected ? "scale(1)" : "scale(0.7)",
              transition: "all 0.18s ease",
            }}
          >
            {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
          </div>

          {/* Credits count */}
          <div className="flex items-baseline gap-1 mb-0.5">
            <span className="text-xl font-bold text-gray-900">{pack.credits}</span>
          </div>

          {/* Credits label */}
          <div className="flex items-center gap-1 mb-2.5">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-xs font-medium text-gray-400">Credits</span>
          </div>

          {/* Price */}
          <div
            className="text-sm font-bold"
            style={{
              color: isSelected ? "#ea580c" : "#374151",
              transition: "color 0.15s ease",
            }}
          >
            ${pack.price}
          </div>
        </div>
      </button>
    </div>
  );
}
