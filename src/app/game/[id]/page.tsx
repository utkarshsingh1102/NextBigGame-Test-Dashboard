import { gameDetail, relatedGames } from "@/data/gameDetail";
import GameDetailHeader from "@/components/GameDetailHeader";
import InfoAccordion from "@/components/InfoAccordion";
import RelatedGamesSection from "@/features/game-detail/RelatedGamesSection";
import RefineFeature from "@/components/RefineFeature";

export default function GameDetailPage() {
  const { id, title, sourceGameA, sourceGameB, resultGame, infoCards, objective } =
    gameDetail;

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-10">
      {/* Section 1: Page title + game screenshots */}
      <GameDetailHeader
        title={title}
        sourceGameA={sourceGameA}
        sourceGameB={sourceGameB}
        resultGame={resultGame}
      />

      {/* Section 2: Refine More — above accordion */}
      <RefineFeature
        ideaId={id}
        rootIdeaId={id}
        ideaTitle={title}
        parentGradient={resultGame.gradient}
      />

      {/* Section 3: Accordion info sections */}
      <InfoAccordion sections={infoCards} />

      {/* Section 4: Objective */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xs font-semibold text-[#F5A524] uppercase tracking-widest mb-3">
          Objective
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">{objective}</p>
      </div>

      {/* Section 5: Related Games with working filter */}
      <RelatedGamesSection games={relatedGames} totalCount={181} />
    </div>
  );
}
