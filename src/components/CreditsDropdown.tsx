"use client";

import { useState } from "react";
import { Sparkles, ShoppingCart, ChevronDown, Zap } from "lucide-react";
import { useCreditsStore, CREDIT_PACKS } from "@/store/creditsStore";

type Props = {
  onClose: () => void;
};

export default function CreditsDropdown({ onClose }: Props) {
  const credits = useCreditsStore((s) => s.credits);
  const addCredits = useCreditsStore((s) => s.addCredits);
  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[0].id);
  const [purchased, setPurchased] = useState(false);

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId)!;

  const handlePurchase = () => {
    addCredits(selectedPack.credits);
    setPurchased(true);
    setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
      {/* Credits remaining header */}
      <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest">
            Credits Remaining
          </span>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-gray-900">{credits}</span>
          <span className="text-sm font-medium text-gray-500">Credits</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <Zap className="w-3 h-3 text-amber-500" />
          <span className="text-xs text-amber-600">1 credit = 1 idea refinement</span>
        </div>
      </div>

      {/* Buy More section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCart className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-800">Buy More Credits</span>
        </div>

        {/* Pack selector */}
        <div className="relative mb-3">
          <select
            value={selectedPackId}
            onChange={(e) => setSelectedPackId(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-colors"
          >
            {CREDIT_PACKS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.credits} Credits — ${p.price}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Purchase button */}
        <button
          onClick={handlePurchase}
          disabled={purchased}
          className="w-full bg-[#111827] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-[#1f2937] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {purchased ? (
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span>
              Added {selectedPack.credits} Credits!
            </span>
          ) : (
            <>Purchase — ${selectedPack.price}</>
          )}
        </button>
      </div>
    </div>
  );
}
