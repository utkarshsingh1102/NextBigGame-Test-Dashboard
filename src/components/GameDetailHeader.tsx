import { Star, X, ArrowRight, Gamepad2 } from "lucide-react";

type GameSource = {
  title: string;
  gradient: string;
};

type GameDetailHeaderProps = {
  title: string;
  sourceGameA: GameSource;
  sourceGameB: GameSource;
  resultGame: GameSource;
};

function FusionCard({
  title,
  gradient,
  isResult,
}: GameSource & { isResult?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-32 h-40 rounded-2xl flex items-end justify-center pb-3 ${gradient} ${
          isResult
            ? "ring-2 ring-[#F5A524] ring-offset-2 shadow-lg shadow-amber-100"
            : "shadow-sm"
        }`}
      >
        <span className="text-white text-[11px] font-semibold bg-black/25 rounded-full px-2.5 py-0.5 backdrop-blur-sm leading-relaxed">
          {title}
        </span>
      </div>
      {isResult && (
        <span className="text-xs font-semibold text-[#F5A524]">Result</span>
      )}
    </div>
  );
}

function ConnectorIcon({ type }: { type: "combine" | "arrow" }) {
  if (type === "combine") {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
        <X className="w-3.5 h-3.5 text-gray-400" strokeWidth={2.5} />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
      <ArrowRight className="w-3.5 h-3.5 text-[#F5A524]" strokeWidth={2.5} />
    </div>
  );
}

export default function GameDetailHeader({
  title,
  sourceGameA,
  sourceGameB,
  resultGame,
}: GameDetailHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Top accent stripe */}
      <div className="h-[3px] bg-gradient-to-r from-violet-400 via-purple-500 to-[#F5A524]" />

      <div className="px-8 py-8 flex flex-col xl:flex-row gap-8 xl:items-center">
        {/* Left column — title, context, actions */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb-style source label */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-full">
              <Gamepad2 className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Game Fusion</span>
            </div>
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-xs text-gray-400">{sourceGameA.title}</span>
            <span className="text-gray-300 text-xs">×</span>
            <span className="text-xs text-gray-400">{sourceGameB.title}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            An AI-fused game concept combining mechanics from{" "}
            <span className="font-medium text-gray-700">{sourceGameA.title}</span> and{" "}
            <span className="font-medium text-gray-700">{sourceGameB.title}</span>.
          </p>

          {/* Actions */}
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#F5A524] transition-colors border border-gray-200 rounded-lg px-4 py-2 hover:border-[#F5A524] cursor-pointer">
            <Star className="w-4 h-4" />
            Save to Favorites
          </button>
        </div>

        {/* Right column — fusion visual */}
        <div className="flex items-center gap-3 xl:gap-4 flex-shrink-0 overflow-x-auto pb-1 xl:pb-0">
          <FusionCard {...sourceGameA} />
          <ConnectorIcon type="combine" />
          <FusionCard {...sourceGameB} />
          <ConnectorIcon type="arrow" />
          <FusionCard {...resultGame} isResult />
        </div>
      </div>
    </div>
  );
}
