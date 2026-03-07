"use client";

import { useState } from "react";
import GameGrid from "@/components/GameGrid";
import type { GameCard } from "@/data/gameDetail";

type Props = {
  games: GameCard[];
  totalCount: number;
};

const TABS = [
  { priority: 2 as const, label: "Priority 2: Exact Single Matches", count: 29 },
  { priority: 3 as const, label: "Priority 3: Partial Matches", count: 152 },
];

export default function RelatedGamesSection({ games, totalCount }: Props) {
  const [activePriority, setActivePriority] = useState<2 | 3>(2);

  const filtered = games.filter((g) => g.priority === activePriority);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#F5A524]">
        Related Games ({totalCount})
      </h2>

      {/* Filter tabs */}
      <div className="flex items-center gap-3 flex-wrap">
        {TABS.map(({ priority, label, count }) => {
          const isActive = activePriority === priority;
          return (
            <button
              key={priority}
              onClick={() => setActivePriority(priority)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm border ${
                isActive
                  ? "bg-white border-[#F5A524] text-[#F5A524]"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {isActive && <span className="text-green-600 font-bold">✓</span>}
              {!isActive && <span className="text-gray-400">→</span>}
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Game grid */}
      <GameGrid games={filtered} />
    </div>
  );
}
