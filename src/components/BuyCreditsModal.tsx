"use client";

import { useState, useEffect } from "react";
import { X, ShoppingCart, Zap, ChevronDown } from "lucide-react";
import { useCreditsStore, CREDIT_PACKS } from "@/store/creditsStore";

export default function BuyCreditsModal() {
  const showBuyCredits = useCreditsStore((s) => s.showBuyCredits);
  const setShowBuyCredits = useCreditsStore((s) => s.setShowBuyCredits);
  const addCredits = useCreditsStore((s) => s.addCredits);
  const credits = useCreditsStore((s) => s.credits);

  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[0].id);
  const [purchased, setPurchased] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showBuyCredits) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [showBuyCredits]);

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId)!;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setShowBuyCredits(false), 200);
  };

  const handlePurchase = () => {
    addCredits(selectedPack.credits);
    setPurchased(true);
    setTimeout(() => {
      setPurchased(false);
      handleClose();
    }, 1800);
  };

  if (!showBuyCredits) return null;

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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Buy Credits</h2>
              <p className="text-xs text-gray-500">You currently have {credits} credits</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Pack options */}
        <div className="p-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Select Credit Pack
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {CREDIT_PACKS.map((pack) => (
              <button
                key={pack.id}
                onClick={() => setSelectedPackId(pack.id)}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  selectedPackId === pack.id
                    ? "border-[#111827] bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-sm font-bold text-gray-900">{pack.credits}</span>
                </div>
                <span className="text-xs text-gray-500">Credits</span>
                <div className="text-sm font-semibold text-gray-800 mt-1">${pack.price}</div>
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500">You&apos;ll receive</span>
              <p className="text-sm font-semibold text-gray-900">
                {selectedPack.credits} Credits
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Total</span>
              <p className="text-sm font-bold text-gray-900">${selectedPack.price}</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handlePurchase}
            disabled={purchased}
            className="w-full bg-[#111827] text-white font-semibold rounded-xl py-3 text-sm hover:bg-[#1f2937] active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {purchased ? (
              <span className="flex items-center justify-center gap-2">
                <span className="text-green-400">✓</span>
                {selectedPack.credits} Credits Added!
              </span>
            ) : (
              <>Purchase {selectedPack.credits} Credits — ${selectedPack.price}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
