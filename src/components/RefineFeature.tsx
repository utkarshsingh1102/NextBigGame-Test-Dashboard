"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
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
      <div className="flex justify-center py-2">
        <button
          onClick={handleRefineClick}
          className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 active:scale-95 transition-all shadow-sm"
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
