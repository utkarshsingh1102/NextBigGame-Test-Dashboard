"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Palette, Layers, Star } from "lucide-react";
import QueueItem from "./QueueItem";
import QueueSubItem from "./QueueSubItem";
import { queueItems } from "@/data/gameDetail";
import { useGenerationQueueStore } from "@/store/generationQueueStore";

const navItems = [
  { label: "Game Fusion", href: "/game-fusion", icon: Gamepad2 },
  { label: "Theme Remix", href: "/theme-remix", icon: Palette },
  { label: "Your Generation", href: "/your-generation", icon: Layers, badge: 2 },
  { label: "Favorites", href: "/favorites", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { refinements } = useGenerationQueueStore();

  return (
    <aside className="fixed top-14 left-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Navigation */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-2">
          Navigation
        </p>
        <nav className="space-y-0.5">
          {navItems.map(({ label, href, icon: Icon, badge }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-amber-50 text-[#F5A524] border-l-2 border-[#F5A524] font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Generation Queue */}
      <div className="px-4 pt-4 pb-6">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-2">
          Generation Queue
        </p>
        <div className="space-y-0.5">
          {queueItems.map((item, index) => {
            const isActive = index === 0;
            const subItems = refinements.filter(
              (r) => r.rootIdeaId === item.id
            );

            return (
              <div key={item.id}>
                <QueueItem {...item} isActive={isActive} />

                {/* Refinement sub-items */}
                {subItems.length > 0 && (
                  <div className="ml-3 mt-0.5 space-y-0.5 border-l border-gray-100 pl-2">
                    {subItems.map((ref) => (
                      <QueueSubItem key={ref.id} refinement={ref} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
