"use client";

import { useState, useRef, useEffect } from "react";
import { Trophy } from "lucide-react";
import { useCreditsStore } from "@/store/creditsStore";
import CreditsDropdown from "./CreditsDropdown";

export default function CreditsBadge() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const credits = useCreditsStore((s) => s.credits);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLow = credits <= 5;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 border rounded-full px-3 py-1 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
          isLow
            ? "bg-red-50 border-red-200 hover:bg-red-100"
            : "bg-amber-50 border-amber-200 hover:bg-amber-100"
        }`}
        aria-label="View credits"
      >
        <Trophy className={`w-3.5 h-3.5 ${isLow ? "text-red-500" : "text-amber-500"}`} />
        <span className={`font-semibold ${isLow ? "text-red-700" : "text-amber-700"}`}>
          {credits} Left
        </span>
      </button>

      {open && <CreditsDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}
