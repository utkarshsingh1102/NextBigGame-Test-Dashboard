"use client";

import { useEffect, useState } from "react";
import { X, Zap, ShoppingCart, Check } from "lucide-react";
import { useCreditsStore, CREDIT_PACKS } from "@/store/creditsStore";

export default function OutOfCreditsModal() {
  const showOutOfCredits = useCreditsStore((s) => s.showOutOfCredits);
  const setShowOutOfCredits = useCreditsStore((s) => s.setShowOutOfCredits);
  const addCredits = useCreditsStore((s) => s.addCredits);

  const [visible, setVisible] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[0].id);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (showOutOfCredits) {
      // reset state each time modal opens
      setSelectedPackId(CREDIT_PACKS[0].id);
      setPurchased(false);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [showOutOfCredits]);

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId)!;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setShowOutOfCredits(false), 220);
  };

  const handleBuy = () => {
    addCredits(selectedPack.credits);
    setPurchased(true);
    setTimeout(() => {
      handleClose();
    }, 1800);
  };

  if (!showOutOfCredits) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-220 ${
        visible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-220 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />

        {/* Header row */}
        <div className="flex items-center justify-between px-6 pt-5 pb-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Out of Credits</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Description */}
        <p className="px-6 pt-2 pb-5 text-sm text-gray-500 leading-relaxed">
          You currently don&apos;t have any credits available.
          Purchase additional credits to continue refining ideas.
        </p>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Pack selection */}
        <div className="px-6 pt-5 pb-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Select a Credit Pack
          </p>

          <div className="grid grid-cols-2 gap-2">
            {CREDIT_PACKS.map((pack) => {
              const isSelected = selectedPackId === pack.id;
              return (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPackId(pack.id)}
                  className={`relative rounded-xl border-2 p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-[#111827] bg-gray-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {/* Checkmark */}
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-[#111827] rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                  )}

                  {/* Credits count */}
                  <div className="flex items-center gap-1 mb-0.5">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span className="text-base font-bold text-gray-900">{pack.credits}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Credits</p>
                  <p className="text-sm font-semibold text-gray-800">${pack.price}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA area */}
        <div className="px-6 pb-6 flex flex-col gap-2">
          <button
            onClick={handleBuy}
            disabled={purchased}
            className="w-full bg-[#111827] text-white font-semibold rounded-xl py-3 text-sm hover:bg-[#1f2937] active:scale-[0.98] transition-all disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {purchased ? (
              <>
                <Check className="w-4 h-4 text-green-400" strokeWidth={2.5} />
                {selectedPack.credits} Credits Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Buy {selectedPack.credits} Credits — ${selectedPack.price}
              </>
            )}
          </button>
          <button
            onClick={handleClose}
            className="w-full bg-gray-100 text-gray-600 font-medium rounded-xl py-2.5 text-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
