"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type InfoSection = {
  id: string;
  title: string;
  body?: string;
  items?: string[];
};

type Props = {
  sections: InfoSection[];
};

function SectionContent({ body, items }: { body?: string; items?: string[] }) {
  if (body) {
    return <p className="text-sm text-gray-600 leading-relaxed">{body}</p>;
  }
  if (items && items.length > 0) {
    return (
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-[#F5A524] text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ol>
    );
  }
  return null;
}

export default function InfoAccordion({ sections }: Props) {
  // Default all sections open
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(sections.map((s) => s.id))
  );

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {sections.map((section) => {
        const isOpen = openIds.has(section.id);
        return (
          <div key={section.id}>
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/70 transition-colors cursor-pointer"
            >
              <span
                className={`text-sm font-semibold transition-colors ${
                  isOpen ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {section.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-[#F5A524]" : "text-gray-400"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5 pt-1">
                <SectionContent body={section.body} items={section.items} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
