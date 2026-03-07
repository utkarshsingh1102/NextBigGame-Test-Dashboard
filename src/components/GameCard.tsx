import { Calendar, Download } from "lucide-react";
import type { GameCard as GameCardType } from "@/data/gameDetail";

type MatchBadgeProps = {
  matchType: GameCardType["matchType"];
};

function MatchBadge({ matchType }: MatchBadgeProps) {
  const styles: Record<GameCardType["matchType"], string> = {
    "Exact Match": "bg-green-50 text-green-700 border border-green-200",
    Partial: "bg-gray-50 text-gray-600 border border-gray-200",
    Keyword: "bg-amber-50 text-amber-700 border border-amber-200",
  };
  const icons: Record<GameCardType["matchType"], string> = {
    "Exact Match": "✓",
    Partial: "→",
    Keyword: "⬡",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md ${styles[matchType]}`}>
      <span>{icons[matchType]}</span>
      {matchType}
    </span>
  );
}

export default function GameCard({
  title,
  points,
  matchType,
  developer,
  date,
  downloads,
  revenue,
  inspirations,
  description,
  iconGradient,
  iconInitials,
}: GameCardType) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col gap-3 border border-gray-100">
      {/* Top: icon + title + studio */}
      <div className="flex items-start gap-3">
        <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${iconGradient}`}>
          <span className="text-white text-sm font-bold">{iconInitials}</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#111827] leading-tight truncate">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{developer}</p>
        </div>
      </div>

      {/* Points + match badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-gray-700">{points} pts</span>
        <span className="text-gray-300">•</span>
        <MatchBadge matchType={matchType} />
      </div>

      {/* Meta: date, downloads, revenue */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        {date && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date}
          </span>
        )}
        {downloads && (
          <span className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {downloads}
          </span>
        )}
        {revenue && (
          <span className="font-medium text-green-600">{revenue}</span>
        )}
      </div>

      {/* Inspired by */}
      {inspirations.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-[#F5A524] uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <span>✦</span> Inspired by
          </p>
          <div className="flex items-center gap-2">
            {inspirations.map((ins, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ins.gradient}`}>
                  <span className="text-white text-[9px] font-bold">{ins.initials}</span>
                </div>
                <span className="text-[9px] text-gray-400 truncate max-w-[36px]">{ins.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{description}</p>
    </div>
  );
}
