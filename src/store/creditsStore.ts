import { create } from "zustand";

export type CreditPack = {
  id: string;
  credits: number;
  price: number;
};

export const CREDIT_PACKS: CreditPack[] = [
  { id: "pack-50", credits: 50, price: 20 },
  { id: "pack-120", credits: 120, price: 40 },
  { id: "pack-200", credits: 200, price: 60 },
  { id: "pack-500", credits: 500, price: 120 },
];

type CreditsStore = {
  credits: number;
  showOutOfCredits: boolean;
  showBuyCredits: boolean;
  deductCredit: () => boolean;
  addCredits: (amount: number) => void;
  setShowOutOfCredits: (val: boolean) => void;
  setShowBuyCredits: (val: boolean) => void;
};

export const useCreditsStore = create<CreditsStore>((set, get) => ({
  credits: 25,
  showOutOfCredits: false,
  showBuyCredits: false,

  deductCredit: () => {
    const { credits } = get();
    if (credits <= 0) return false;
    set({ credits: credits - 1 });
    return true;
  },

  addCredits: (amount: number) => {
    set((state) => ({ credits: state.credits + amount }));
  },

  setShowOutOfCredits: (val: boolean) => set({ showOutOfCredits: val }),
  setShowBuyCredits: (val: boolean) => set({ showBuyCredits: val }),
}));
