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

function SourceCard({ title, gradient, label }: GameSource & { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className={`w-44 h-56 rounded-2xl flex items-end justify-center pb-4 ${gradient} shadow-md`}
      >
        <span className="text-white text-xs font-semibold bg-black/25 rounded-full px-3 py-1 backdrop-blur-sm">
          {title}
        </span>
      </div>
      <span className="text-xs font-medium text-gray-400">{label}</span>
    </div>
  );
}

function ResultCard({ title, gradient }: GameSource) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      {/* Glow layer behind the card */}
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-2xl blur-xl opacity-30 scale-95 ${gradient}`}
        />
        <div
          className={`relative w-52 h-64 rounded-2xl flex items-end justify-center pb-4 ${gradient} ring-2 ring-[#F5A524] ring-offset-4 shadow-xl`}
        >
          <span className="text-white text-sm font-semibold bg-black/25 rounded-full px-3.5 py-1 backdrop-blur-sm">
            {title}
          </span>
        </div>
      </div>
      <span className="text-xs font-bold text-[#F5A524] tracking-wide uppercase">Result</span>
    </div>
  );
}

function ConnectorIcon({ type }: { type: "combine" | "arrow" }) {
  if (type === "combine") {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
        <X className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 shadow-sm">
      <ArrowRight className="w-4 h-4 text-[#F5A524]" strokeWidth={2.5} />
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

      <div className="px-8 py-8 flex flex-col xl:flex-row gap-10 xl:items-center">
        {/* Left column — title, context, actions */}
        <div className="flex-shrink-0 xl:w-64">
          {/* Game Fusion pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-full w-fit mb-4">
            <Gamepad2 className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">Game Fusion</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
            {title}
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            AI-fused concept from{" "}
            <span className="font-medium text-gray-700">{sourceGameA.title}</span>
            {" "}×{" "}
            <span className="font-medium text-gray-700">{sourceGameB.title}</span>.
          </p>

          {/* Save action */}
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#F5A524] transition-colors border border-gray-200 rounded-lg px-4 py-2 hover:border-[#F5A524] cursor-pointer">
            <Star className="w-4 h-4" />
            Save to Favorites
          </button>
        </div>

        {/* Right column — fusion visual (hero) */}
        <div className="flex-1 flex items-center justify-center gap-4 xl:gap-6 overflow-x-auto pb-1 xl:pb-0">
          <SourceCard {...sourceGameA} label="Source A" />
          <ConnectorIcon type="combine" />
          <SourceCard {...sourceGameB} label="Source B" />
          <ConnectorIcon type="arrow" />
          <ResultCard {...resultGame} />
        </div>
      </div>
    </div>
  );
}
