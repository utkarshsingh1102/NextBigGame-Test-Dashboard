"use client";

import { Trophy } from "lucide-react";
import { useCreditsStore } from "@/store/creditsStore";

export default function CreditsBadge() {
  const credits = useCreditsStore((s) => s.credits);
  const setShowOutOfCredits = useCreditsStore((s) => s.setShowOutOfCredits);

  const isLow = credits <= 5;

  return (
    <button
      onClick={() => setShowOutOfCredits(true)}
      className={`flex items-center gap-1.5 border rounded-full px-3 py-1 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
        isLow
          ? "bg-red-50 border-red-200 hover:bg-red-100"
          : "bg-amber-50 border-amber-200 hover:bg-amber-100"
      }`}
      aria-label="View or buy credits"
    >
      <Trophy className={`w-3.5 h-3.5 ${isLow ? "text-red-500" : "text-amber-500"}`} />
      <span className={`font-semibold ${isLow ? "text-red-700" : "text-amber-700"}`}>
        {credits} Left
      </span>
    </button>
  );
}
