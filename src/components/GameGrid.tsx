import GameCard from "./GameCard";
import type { GameCard as GameCardType } from "@/data/gameDetail";

type GameGridProps = {
  games: GameCardType[];
};

export default function GameGrid({ games }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-gray-700">No games found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
