"use client";

import { CreditPack } from "@/store/creditsStore";
import CreditPackCard from "./CreditPackCard";

type Props = {
  packs: CreditPack[];
  selectedPackId: string;
  onSelect: (packId: string) => void;
  bestValuePackId?: string;
};

export default function CreditPackGrid({
  packs,
  selectedPackId,
  onSelect,
  bestValuePackId = "pack-120",
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {packs.map((pack) => (
        <CreditPackCard
          key={pack.id}
          pack={pack}
          isSelected={selectedPackId === pack.id}
          onSelect={() => onSelect(pack.id)}
          isBestValue={pack.id === bestValuePackId}
        />
      ))}
    </div>
  );
}
