"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGenerationQueueStore } from "@/store/generationQueueStore";
import { useCreditsStore } from "@/store/creditsStore";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const LOADING_STEPS = [
  "Understanding your request...",
  "Analyzing game mechanics...",
  "Generating improved concept...",
  "Finalizing refined idea...",
];

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  ideaId: string;
  rootIdeaId: string;
  ideaTitle: string;
  parentGradient: string;
  onRefinementQueued: (msg: string) => void;
};

export default function RefineChatPanel({
  open,
  onClose,
  ideaId,
  rootIdeaId,
  ideaTitle,
  parentGradient,
  onRefinementQueued,
}: Props) {
  const router = useRouter();
  const { addRefinement, updateStatus } = useGenerationQueueStore();
  const { deductCredit, credits, setShowOutOfCredits } = useCreditsStore();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: `I'll help you refine "${ideaTitle}". Describe what changes you want — theme, mechanics, audience, platform, or anything else.`,
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Reset welcome message when ideaTitle changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "ai",
        content: `I'll help you refine "${ideaTitle}". Describe what changes you want — theme, mechanics, audience, platform, or anything else.`,
      },
    ]);
    setIsGenerating(false);
  }, [ideaTitle]);

  const addMessage = (msg: Omit<Message, "id">) =>
    setMessages((prev) => [...prev, { ...msg, id: `msg-${Date.now()}-${Math.random()}` }]);

  const handleSend = (prompt: string) => {
    if (!prompt.trim() || isGenerating) return;

    // Check credits before allowing refinement
    if (credits <= 0) {
      setShowOutOfCredits(true);
      return;
    }
    deductCredit();

    addMessage({ role: "user", content: prompt });
    setIsGenerating(true);

    const refinement = addRefinement(ideaId, rootIdeaId, ideaTitle, parentGradient, prompt);
    onRefinementQueued("Refinement request added to queue");
    updateStatus(refinement.id, "processing");

    // Cycle through loading step messages
    LOADING_STEPS.forEach((step, i) => {
      setTimeout(() => {
        addMessage({ role: "ai", content: step });
      }, (i + 1) * 1000);
    });

    // Finish generation
    setTimeout(() => {
      updateStatus(refinement.id, "completed");
      setIsGenerating(false);
      addMessage({
        role: "ai",
        content: `Done! "${refinement.title}" is ready. Opening it now...`,
      });
      setTimeout(() => {
        router.push(`/ideas/${refinement.slug}`);
        onClose();
      }, 1200);
    }, 5200);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/25 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Refine Idea</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Tell the AI what changes you want in this idea.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors mt-0.5"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Idea context pill */}
        <div className="px-5 py-3 border-b border-gray-50 flex-shrink-0">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-[#F5A524] flex-shrink-0" />
            <span className="text-xs text-amber-700 font-medium truncate">{ideaTitle}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
          ))}
          {isGenerating && <ChatMessage role="ai" content="" isLoading />}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt suggestions */}
        {!isGenerating && messages.length === 1 && (
          <div className="px-4 pb-3 flex-shrink-0">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-semibold">
              Try asking
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                "Make it purple gradient themed with multiplayer",
                "Add a time-limit mechanic and leaderboards",
                "Simplify for casual mobile players",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  className="text-left text-xs text-gray-600 bg-gray-50 hover:bg-amber-50 hover:text-[#F5A524] border border-gray-100 hover:border-amber-200 rounded-lg px-3 py-2 transition-colors"
                >
                  &ldquo;{suggestion}&rdquo;
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isGenerating} />
      </div>
    </>
  );
}
