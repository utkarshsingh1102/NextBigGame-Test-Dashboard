"use client";

import { useEffect, useState } from "react";
import { X, Zap, ShoppingCart } from "lucide-react";
import { useCreditsStore } from "@/store/creditsStore";

export default function OutOfCreditsModal() {
  const showOutOfCredits = useCreditsStore((s) => s.showOutOfCredits);
  const setShowOutOfCredits = useCreditsStore((s) => s.setShowOutOfCredits);
  const setShowBuyCredits = useCreditsStore((s) => s.setShowBuyCredits);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showOutOfCredits) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [showOutOfCredits]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setShowOutOfCredits(false), 200);
  };

  const handleBuyCredits = () => {
    handleClose();
    setTimeout(() => setShowBuyCredits(true), 250);
  };

  if (!showOutOfCredits) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-200 ${
        visible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transition-all duration-200 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />

        {/* Content */}
        <div className="p-6">
          {/* Close */}
          <div className="flex justify-end mb-2">
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Icon */}
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-7 h-7 text-amber-500" />
          </div>

          {/* Text */}
          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            You&apos;re out of credits
          </h2>
          <p className="text-sm text-gray-500 text-center mb-5 leading-relaxed">
            You&apos;ve used all your available credits. Purchase more credits to continue
            generating ideas.
          </p>

          {/* Offer pill */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">50 Credits</p>
                <p className="text-xs text-gray-500">50 idea refinements</p>
              </div>
            </div>
            <span className="text-sm font-bold text-gray-900">$20</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleBuyCredits}
              className="w-full bg-[#111827] text-white font-semibold rounded-xl py-3 text-sm hover:bg-[#1f2937] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Credits
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-600 font-medium rounded-xl py-3 text-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
