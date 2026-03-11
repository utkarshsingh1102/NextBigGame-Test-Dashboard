"use client";

import { useState, useRef, useEffect } from "react";
import { Trophy } from "lucide-react";
import { useCreditsStore } from "@/store/creditsStore";
import CreditsDropdown from "./CreditsDropdown";

export default function CreditsBadge() {
  const credits = useCreditsStore((s) => s.credits);
  const setShowOutOfCredits = useCreditsStore((s) => s.setShowOutOfCredits);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOutOfCredits = credits <= 0;
  const isLow = credits > 0 && credits <= 5;

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [dropdownOpen]);

  const handleClick = () => {
    if (isOutOfCredits) {
      // credits === 0 → show full modal
      setShowOutOfCredits(true);
    } else {
      // credits > 0 → toggle inline dropdown
      setDropdownOpen((v) => !v);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={handleClick}
        aria-label={isOutOfCredits ? "Out of credits — buy more" : "View credits"}
        aria-expanded={!isOutOfCredits ? dropdownOpen : undefined}
        className={`flex items-center gap-1.5 border rounded-full px-3 py-1 text-sm font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] ${
          isOutOfCredits
            ? "bg-red-50 border-red-200 hover:bg-red-100 text-red-700"
            : isLow
            ? "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700"
            : "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700"
        }`}
      >
        <Trophy
          className={`w-3.5 h-3.5 flex-shrink-0 ${
            isOutOfCredits ? "text-red-500" : isLow ? "text-orange-500" : "text-amber-500"
          }`}
        />
        <span>{credits} Left</span>
      </button>

      {/* Dropdown — only rendered when credits > 0 */}
      {dropdownOpen && !isOutOfCredits && (
        <CreditsDropdown onClose={() => setDropdownOpen(false)} />
      )}
    </div>
  );
}
