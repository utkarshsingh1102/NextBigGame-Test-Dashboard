"use client";

import { useState } from "react";
import { Zap, ShoppingCart, Check } from "lucide-react";
import { useCreditsStore, CREDIT_PACKS } from "@/store/creditsStore";
import CreditsProgressBar from "./CreditsProgressBar";
import CreditPackSelector from "./CreditPackSelector";

type Props = {
  onClose: () => void;
};

export default function CreditsDropdown({ onClose }: Props) {
  const credits = useCreditsStore((s) => s.credits);
  const startingCredits = useCreditsStore((s) => s.startingCredits);
  const addCredits = useCreditsStore((s) => s.addCredits);

  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[1].id);
  const [purchased, setPurchased] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId) ?? CREDIT_PACKS[1];

  const handleBuy = () => {
    addCredits(selectedPack.credits);
    setPurchased(true);
    setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 1700);
  };

  return (
    <div className="absolute right-0 top-full mt-2.5 w-72 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">
      {/* Gradient top accent */}
      <div
        className="h-[2.5px]"
        style={{ background: "linear-gradient(90deg,#f97316,#a855f7)" }}
      />

      {/* Credits summary */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Credits Remaining
          </span>
        </div>

        {/* Big credit number */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-3xl font-bold text-gray-900">{credits}</span>
          <span className="text-base text-gray-400 font-medium">/ {startingCredits}</span>
        </div>

        {/* Progress bar */}
        <CreditsProgressBar current={credits} total={startingCredits} />
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* Top-up section */}
      <div className="px-4 pt-3 pb-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
          Top Up Credits
        </p>

        <CreditPackSelector selectedPackId={selectedPackId} onChange={setSelectedPackId} />

        {/* Buy button */}
        <button
          onClick={handleBuy}
          disabled={purchased}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          className="relative w-full mt-2.5 rounded-xl py-2.5 text-sm font-semibold text-white flex items-center justify-center gap-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:cursor-not-allowed"
          style={{
            background: purchased
              ? "linear-gradient(135deg,#22c55e,#16a34a)"
              : "linear-gradient(135deg,#111827,#1f2937)",
            transform: pressed
              ? "scale(0.97)"
              : hovered && !purchased
              ? "scale(1.02)"
              : "scale(1)",
            boxShadow:
              hovered && !purchased
                ? "0 6px 20px rgba(17,24,39,0.3)"
                : "0 2px 6px rgba(17,24,39,0.15)",
            transition:
              "transform 0.15s ease, box-shadow 0.15s ease, background 0.25s ease",
          }}
        >
          {/* Shine overlay on hover */}
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                hovered && !purchased
                  ? "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.07) 50%,transparent 65%)"
                  : "transparent",
            }}
          />
          {purchased ? (
            <>
              <Check className="w-4 h-4" strokeWidth={2.5} />
              {selectedPack.credits} Credits Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Buy Credits — ${selectedPack.price}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
