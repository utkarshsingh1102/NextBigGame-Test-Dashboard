"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type InfoCardProps = {
  title: string;
  body?: string;
  items?: string[];
  collapsedCount?: number;
};

export default function InfoCard({ title, body, items, collapsedCount = 4 }: InfoCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMore = items && items.length > collapsedCount;
  const visibleItems = items
    ? expanded
      ? items
      : items.slice(0, collapsedCount)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-[#F5A524] uppercase tracking-widest">
        {title}
      </h3>

      {body && (
        <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
      )}

      {items && items.length > 0 && (
        <>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {visibleItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-[#F5A524] text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>

          {hasMore && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="self-start mt-1 text-xs font-medium text-[#F5A524] hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  Show {items.length - collapsedCount} more
                </>
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
}
