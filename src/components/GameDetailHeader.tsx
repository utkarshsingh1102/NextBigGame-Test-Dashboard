import { Star, Plus } from "lucide-react";

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

function GamePreviewCard({ title, gradient, isResult }: GameSource & { isResult?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-64 h-80 rounded-2xl shadow-sm flex items-end justify-center pb-5 ${gradient} ${
          isResult ? "ring-2 ring-[#F5A524] ring-offset-2" : ""
        }`}
      >
        <span className="text-white text-xs font-semibold bg-black/20 rounded-full px-3 py-1 backdrop-blur-sm">
          {title}
        </span>
      </div>
      <span className={`text-sm ${isResult ? "font-medium text-[#F5A524]" : "text-gray-600"}`}>
        {title}
      </span>
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
    <div className="flex flex-col items-center gap-8">
      {/* Add to Favorites */}
      <div className="self-end">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#F5A524] transition-colors border border-gray-200 rounded-lg px-4 py-2 hover:border-[#F5A524]">
          <Star className="w-4 h-4" />
          Add to Favorites
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-[#F5A524]">{title}</h1>

      {/* Game Images Row */}
      <div className="flex items-center gap-10">
        <GamePreviewCard {...sourceGameA} />

        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100">
          <Plus className="w-5 h-5 text-gray-400" />
        </div>

        <GamePreviewCard {...sourceGameB} />

        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100">
          <span className="text-gray-400 text-lg font-light leading-none">—</span>
        </div>

        <GamePreviewCard {...resultGame} isResult />
      </div>
    </div>
  );
}
