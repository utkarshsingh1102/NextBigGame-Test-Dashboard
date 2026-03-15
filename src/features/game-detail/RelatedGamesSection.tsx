"use client";

import { useState } from "react";
import { CheckCircle2, Layers } from "lucide-react";
import GameGrid from "@/components/GameGrid";
import type { GameCard } from "@/data/gameDetail";

type Props = {
  games: GameCard[];
  totalCount: number;
};

const TABS = [
  {
    priority: 2 as const,
    label: "Exact Matches",
    count: 29,
    icon: CheckCircle2,
    iconClass: "text-green-500",
  },
  {
    priority: 3 as const,
    label: "Partial Matches",
    count: 152,
    icon: Layers,
    iconClass: "text-gray-400",
  },
];

export default function RelatedGamesSection({ games, totalCount }: Props) {
  const [activePriority, setActivePriority] = useState<2 | 3>(2);

  const filtered = games.filter((g) => g.priority === activePriority);

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Related Games
          <span className="ml-2 text-sm font-normal text-gray-400">
            ({totalCount})
          </span>
        </h2>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-0">
        {TABS.map(({ priority, label, count, icon: Icon, iconClass }) => {
          const isActive = activePriority === priority;
          return (
            <button
              key={priority}
              onClick={() => setActivePriority(priority)}
              className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? "text-[#F5A524]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#F5A524]" : iconClass}`} />
              {label}
              <span
                className={`ml-1 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-amber-50 text-amber-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
              {/* Active underline */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5A524] rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Game grid */}
      <GameGrid games={filtered} />
    </div>
  );
}
