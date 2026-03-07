import { create } from "zustand";

export type RefinementStatus = "queued" | "processing" | "completed";

export type RefinementItem = {
  id: string;
  parentIdeaId: string;
  rootIdeaId: string;
  parentTitle: string;
  parentGradient: string;
  title: string;
  prompt: string;
  status: RefinementStatus;
  slug: string;
  gradient: string;
  createdAt: string;
};

type Store = {
  refinements: RefinementItem[];
  addRefinement: (
    parentIdeaId: string,
    rootIdeaId: string,
    parentTitle: string,
    parentGradient: string,
    prompt: string
  ) => RefinementItem;
  updateStatus: (id: string, status: RefinementStatus) => void;
};

const RESULT_GRADIENTS = [
  "bg-gradient-to-br from-teal-400 to-cyan-600",
  "bg-gradient-to-br from-emerald-400 to-green-600",
  "bg-gradient-to-br from-rose-500 to-red-700",
  "bg-gradient-to-br from-blue-400 to-indigo-600",
  "bg-gradient-to-br from-fuchsia-400 to-pink-600",
  "bg-gradient-to-br from-amber-400 to-yellow-600",
  "bg-gradient-to-br from-sky-400 to-blue-600",
  "bg-gradient-to-br from-violet-500 to-purple-700",
  "bg-gradient-to-br from-lime-400 to-green-600",
  "bg-gradient-to-br from-orange-400 to-red-500",
];

function pickGradient(exclude: string): string {
  const options = RESULT_GRADIENTS.filter((g) => g !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .substring(0, 60);
}

export const useGenerationQueueStore = create<Store>((set) => ({
  refinements: [],

  addRefinement: (parentIdeaId, rootIdeaId, parentTitle, parentGradient, prompt) => {
    const shortPrompt = prompt.split(" ").slice(0, 4).join(" ");
    const title = `${parentTitle} – ${shortPrompt}`;
    const slug = slugify(title);
    const gradient = pickGradient(parentGradient);
    const item: RefinementItem = {
      id: `ref-${Date.now()}`,
      parentIdeaId,
      rootIdeaId,
      parentTitle,
      parentGradient,
      title,
      prompt,
      status: "queued",
      slug,
      gradient,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ refinements: [...state.refinements, item] }));
    return item;
  },

  updateStatus: (id, status) => {
    set((state) => ({
      refinements: state.refinements.map((r) =>
        r.id === id ? { ...r, status } : r
      ),
    }));
  },
}));
