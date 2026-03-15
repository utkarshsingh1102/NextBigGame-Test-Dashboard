"use client";

import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";
import RefineChatPanel from "./RefineChatPanel";
import Toast from "./Toast";
import { useCreditsStore } from "@/store/creditsStore";

type Props = {
  ideaId: string;
  rootIdeaId: string;
  ideaTitle: string;
  parentGradient: string;
};

export default function RefineFeature({ ideaId, rootIdeaId, ideaTitle, parentGradient }: Props) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const credits = useCreditsStore((s) => s.credits);
  const setShowOutOfCredits = useCreditsStore((s) => s.setShowOutOfCredits);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRefineClick = () => {
    if (credits <= 0) {
      setShowOutOfCredits(true);
      return;
    }
    setPanelOpen(true);
  };

  return (
    <>
      {/* Contextual refine section */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-100 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5 text-[#F5A524]" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 mb-0.5">Refine This Idea</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Describe changes you want — theme, mechanics, audience, or platform. Uses 1 credit.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleRefineClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#111827] text-white text-sm font-semibold rounded-xl hover:bg-[#1f2937] active:scale-[0.97] transition-all shadow-sm cursor-pointer flex-shrink-0"
        >
          <Wand2 className="w-4 h-4" />
          Refine More
        </button>
      </div>

      <RefineChatPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        ideaId={ideaId}
        rootIdeaId={rootIdeaId}
        ideaTitle={ideaTitle}
        parentGradient={parentGradient}
        onRefinementQueued={showToast}
      />

      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}
