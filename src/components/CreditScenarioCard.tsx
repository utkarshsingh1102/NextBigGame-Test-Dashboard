"use client";

import { useState } from "react";
import { Trophy, Wand2, Zap, X } from "lucide-react";
import { CREDIT_PACKS } from "@/store/creditsStore";
import CreditPackGrid from "./CreditPackGrid";
import BuyCreditsButton from "./BuyCreditsButton";

type Props = {
  initialCredits: number;
};

export default function CreditScenarioCard({ initialCredits }: Props) {
  const [credits, setCredits] = useState(initialCredits);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState(CREDIT_PACKS[1].id);
  const [purchased, setPurchased] = useState(false);

  const isOutOfCredits = credits <= 0;
  const isLow = credits <= 5;

  const openModal = () => {
    setSelectedPackId(CREDIT_PACKS[1].id);
    setPurchased(false);
    setIsOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => setIsOpen(false), 250);
  };

  const handleRefineClick = () => {
    // Always open the credits modal for demo purposes
    openModal();
  };

  const selectedPack = CREDIT_PACKS.find((p) => p.id === selectedPackId) ?? CREDIT_PACKS[1];

  const handleBuy = () => {
    setCredits((prev) => prev + selectedPack.credits);
    setPurchased(true);
    setTimeout(() => closeModal(), 1800);
  };

  return (
    <>
      {/* ── Scenario preview card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Coloured top strip */}
        <div
          className="h-1"
          style={{
            background: isOutOfCredits
              ? "linear-gradient(90deg,#ef4444,#f97316)"
              : "linear-gradient(90deg,#f97316,#a855f7)",
          }}
        />

        <div className="p-6">
          {/* Scenario label */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            {isOutOfCredits ? "Scenario A — 0 Credits" : "Scenario B — 25 Credits"}
          </p>

          {/* Simulated navbar strip */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#111827] rounded flex items-center justify-center">
                <span className="text-white font-bold text-[9px]">N</span>
              </div>
              <span className="text-xs font-semibold text-gray-700">Nextbigideas.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>1 credit = 1 idea</span>
              </div>
              {/* Credits badge */}
              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 border text-xs font-semibold ${
                  isLow
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-amber-50 border-amber-200 text-amber-700"
                }`}
              >
                <Trophy className={`w-3 h-3 ${isLow ? "text-red-500" : "text-amber-500"}`} />
                {credits} Left
              </div>
            </div>
          </div>

          {/* State description */}
          <div className="mb-5">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-2 ${
                isOutOfCredits
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOutOfCredits ? "bg-red-500" : "bg-green-500"
                }`}
              />
              {isOutOfCredits ? "0 credits — blocked" : `${credits} credits — active`}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {isOutOfCredits
                ? 'Clicking "Refine More" blocks the action and shows the out-of-credits purchase modal.'
                : 'Clicking "Refine More" opens the credits top-up modal so the user can buy more.'}
            </p>
          </div>

          {/* Simulated Refine More button */}
          <button
            onClick={handleRefineClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 active:scale-95 transition-all shadow-sm w-full justify-center"
          >
            <Wand2 className="w-4 h-4" />
            Refine More
          </button>

          <p className="text-center text-[11px] text-gray-400 mt-2">
            ↑ Click to trigger the modal
          </p>
        </div>
      </div>

      {/* ── Inline modal (isolated local state) ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{
            backgroundColor: visible ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)",
            backdropFilter: visible ? "blur(6px)" : "blur(0px)",
            transition: "background-color 0.25s ease, backdrop-filter 0.25s ease",
          }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[440px] bg-white rounded-2xl overflow-visible shadow-2xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top bar */}
            <div
              className="h-[3px] rounded-t-2xl"
              style={{
                background: isOutOfCredits
                  ? "linear-gradient(90deg,#ef4444,#f97316,#a855f7)"
                  : "linear-gradient(90deg,#f97316,#ec4899,#a855f7)",
              }}
            />

            {/* Header */}
            <div className="px-6 pt-6 pb-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#fff7ed,#fdf2ff)" }}
                  >
                    <Zap
                      className="w-5 h-5"
                      style={{ color: isOutOfCredits ? "#f97316" : "#a855f7" }}
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      {isOutOfCredits ? "Out of Credits" : "Buy More Credits"}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isOutOfCredits
                        ? "You're at 0 — recharge to continue"
                        : `${credits} credits remaining`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {isOutOfCredits
                  ? "You currently don't have any credits available. Purchase additional credits to continue refining ideas."
                  : "You still have credits, but you can top up your balance anytime by selecting a pack below."}
              </p>
            </div>

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

            {/* CTA */}
            <div className="px-6 pb-6 flex flex-col gap-2 pt-1">
              <BuyCreditsButton
                onBuy={handleBuy}
                credits={selectedPack.credits}
                price={selectedPack.price}
                purchased={purchased}
              />
              <button
                onClick={closeModal}
                className="w-full rounded-xl py-2.5 text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
