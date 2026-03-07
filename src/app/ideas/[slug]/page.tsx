"use client";

import { use } from "react";
import { useGenerationQueueStore } from "@/store/generationQueueStore";
import GameDetailHeader from "@/components/GameDetailHeader";
import InfoAccordion from "@/components/InfoAccordion";
import RelatedGamesSection from "@/features/game-detail/RelatedGamesSection";
import RefineFeature from "@/components/RefineFeature";
import { relatedGames } from "@/data/gameDetail";
import { Wand2 } from "lucide-react";

function generateInfoCards(prompt: string) {
  return [
    {
      id: "core-setup",
      title: "Core Setup",
      body: `A refined isometric grid based on your input: "${prompt}". Characters now have enhanced visual states and an updated theme that matches the refined concept.`,
    },
    {
      id: "rules",
      title: "Rules",
      items: [
        "Tap an 'awake' (unblocked) character from the refined grid to move it.",
        "Characters animate to bottom podiums with the updated visual theme.",
        "Smart Sorting: auto-matches to same-color or empty podiums.",
        "Refined failure state previews which podiums would clear next.",
        "Full stack of 3 triggers an enhanced clear animation with new effects.",
        "Newly unlocked: special power-up characters based on the refined theme.",
      ],
    },
    {
      id: "challenge",
      title: "Challenge",
      body: `Enhanced mismatch challenge with the refined theme applied. Additional mechanics layered from your prompt add strategic depth beyond the original design.`,
    },
    {
      id: "innovation",
      title: "Innovation",
      body: `Builds on the original Bolt Sort vertical stack system with AI-refined enhancements. Incorporates your specific prompt requirements for a more targeted puzzle experience.`,
    },
  ];
}

export default function RefinedIdeaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { refinements } = useGenerationQueueStore();
  const refinement = refinements.find((r) => r.slug === slug);

  if (!refinement) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col items-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Wand2 className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-base font-medium text-gray-700">Refined idea not found</p>
        <p className="text-sm text-gray-400">
          This idea may have been lost on page refresh. Generate a new refinement from the detail page.
        </p>
      </div>
    );
  }

  const infoCards = generateInfoCards(refinement.prompt);

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-10">
      {/* AI Refined badge */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-full px-3 py-1">
          <Wand2 className="w-3 h-3" />
          AI Refined · Original: Jam Stack Towers
        </span>
      </div>

      {/* Header — sourceGameA is the parent, sourceGameB represents the prompt */}
      <GameDetailHeader
        title={refinement.title}
        sourceGameA={{
          title: refinement.parentTitle,
          gradient: refinement.parentGradient,
        }}
        sourceGameB={{
          title: refinement.prompt.split(" ").slice(0, 5).join(" ") + "…",
          gradient: "bg-gradient-to-br from-slate-400 to-gray-600",
        }}
        resultGame={{
          title: refinement.title,
          gradient: refinement.gradient,
        }}
      />

      {/* Refine further — above accordion */}
      <RefineFeature
        ideaId={refinement.slug}
        rootIdeaId={refinement.rootIdeaId}
        ideaTitle={refinement.title}
        parentGradient={refinement.gradient}
      />

      {/* User prompt context card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-[#F5A524] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Wand2 className="w-3 h-3 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-1">
            Refinement Prompt
          </p>
          <p className="text-sm text-amber-800 italic">&ldquo;{refinement.prompt}&rdquo;</p>
        </div>
      </div>

      {/* Info accordion */}
      <InfoAccordion sections={infoCards} />

      {/* Objective */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xs font-semibold text-[#F5A524] uppercase tracking-widest mb-3">
          Objective
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Clear the entire refined crowd of characters by sorting them into valid
          color stacks, using the enhanced mechanics introduced through this AI
          refinement.
        </p>
      </div>

      {/* Related Games */}
      <RelatedGamesSection games={relatedGames} totalCount={181} />
    </div>
  );
}
