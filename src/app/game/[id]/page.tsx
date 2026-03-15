import { gameDetail, relatedGames } from "@/data/gameDetail";
import GameDetailHeader from "@/components/GameDetailHeader";
import InfoAccordion from "@/components/InfoAccordion";
import RelatedGamesSection from "@/features/game-detail/RelatedGamesSection";
import RefineFeature from "@/components/RefineFeature";
import { Target } from "lucide-react";

export default function GameDetailPage() {
  const { id, title, sourceGameA, sourceGameB, resultGame, infoCards, objective } =
    gameDetail;

  // Merge objective as a top-level info card so all game details live together
  const allSections = [
    ...infoCards,
    { id: "objective", title: "Objective", body: objective },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Section 1: Game header — title + fusion visual */}
      <GameDetailHeader
        title={title}
        sourceGameA={sourceGameA}
        sourceGameB={sourceGameB}
        resultGame={resultGame}
      />

      {/* Section 2: Refine CTA — contextual call to action */}
      <RefineFeature
        ideaId={id}
        rootIdeaId={id}
        ideaTitle={title}
        parentGradient={resultGame.gradient}
      />

      {/* Section 3: Game detail accordion — all sections */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          Game Design Details
        </h2>
        <InfoAccordion sections={allSections} />
      </div>

      {/* Section 4: Related Games */}
      <RelatedGamesSection games={relatedGames} totalCount={181} />
    </div>
  );
}
