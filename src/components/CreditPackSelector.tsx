"use client";

import { ChevronDown } from "lucide-react";
import { CREDIT_PACKS } from "@/store/creditsStore";

type Props = {
  selectedPackId: string;
  onChange: (packId: string) => void;
};

export default function CreditPackSelector({ selectedPackId, onChange }: Props) {
  return (
    <div className="relative">
      <select
        value={selectedPackId}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 pr-8 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-colors hover:border-gray-300"
      >
        {CREDIT_PACKS.map((pack) => (
          <option key={pack.id} value={pack.id}>
            {pack.credits} Credits — ${pack.price}
            {pack.id === "pack-120" ? "  ★ Best Value" : ""}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
