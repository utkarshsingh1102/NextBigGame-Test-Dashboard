"use client";

import { useEffect, useState } from "react";
import { X, Zap } from "lucide-react";
import { useCreditsStore, CREDIT_PACKS } from "@/store/creditsStore";
import CreditPackGrid from "./CreditPackGrid";
import BuyCreditsButton from "./BuyCreditsButton";

export default function CreditPurchaseModal() {
  const showOutOfCredits = useCreditsStore((s) => s.showOutOfCredits);
  const setShowOutOfCredits = useCreditsStore((s) => s.setShowOutOfCredits);
  const credits = useCreditsStore((s) => s.credits);
  const addCredits = useCreditsStore((s) => s.addCredits);

  const [visible, setVisible] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[1].id); // default: 120 (best value)
  const [purchased, setPurchased] = useState(false);

  const isOutOfCredits = credits <= 0;

  useEffect(() => {
    if (showOutOfCredits) {
      setSelectedPackId(CREDIT_PACKS[1].id);
      setPurchased(false);
      // allow DOM to paint before animating in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [showOutOfCredits]);

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId) ?? CREDIT_PACKS[1];

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setShowOutOfCredits(false), 250);
  };

  const handleBuy = () => {
    addCredits(selectedPack.credits);
    setPurchased(true);
    setTimeout(() => handleClose(), 1800);
  };

  if (!showOutOfCredits) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backgroundColor: visible ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
        backdropFilter: visible ? "blur(6px)" : "blur(0px)",
        transition: "background-color 0.25s ease, backdrop-filter 0.25s ease",
      }}
      onClick={handleClose}
    >
      {/* Modal card */}
      <div
        className="w-full max-w-[440px] bg-white rounded-2xl overflow-visible shadow-2xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top accent bar */}
        <div
          className="h-[3px] rounded-t-2xl"
          style={{
            background: "linear-gradient(90deg, #f97316 0%, #ec4899 50%, #a855f7 100%)",
          }}
        />

        {/* Header */}
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-start justify-between">
            {/* Icon + title */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #fff7ed, #fdf2ff)" }}
              >
                <Zap
                  className="w-5 h-5"
                  style={{ color: isOutOfCredits ? "#f97316" : "#a855f7" }}
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  {isOutOfCredits ? "Out of Credits" : "Buy Credits"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isOutOfCredits
                    ? "You're at 0 — recharge to continue"
                    : `${credits} credits remaining`}
                </p>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            {isOutOfCredits
              ? "You currently don't have any credits available. Purchase additional credits to continue refining ideas."
              : "Select a pack below to top up your credit balance."}
          </p>
        </div>

        {/* Thin separator */}
        <div className="mx-6 border-t border-gray-100" />

        {/* Pack grid */}
        <div className="px-6 pt-5 pb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Select a Credit Pack
          </p>
          <CreditPackGrid
            packs={CREDIT_PACKS}
            selectedPackId={selectedPackId}
            onSelect={setSelectedPackId}
          />
        </div>

        {/* CTA buttons */}
        <div className="px-6 pb-6 flex flex-col gap-2 pt-1">
          <BuyCreditsButton
            onBuy={handleBuy}
            credits={selectedPack.credits}
            price={selectedPack.price}
            purchased={purchased}
          />
          <button
            onClick={handleClose}
            className="w-full rounded-xl py-2.5 text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
