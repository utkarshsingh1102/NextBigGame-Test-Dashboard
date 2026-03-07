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
      <ol className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-[#F5A524] text-[10px] font-bold flex items-center justify-center mt-0.5">
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
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="flex flex-col divide-y divide-gray-100 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id}>
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className={`text-xs font-semibold uppercase tracking-widest transition-colors ${isOpen ? "text-[#F5A524]" : "text-gray-500"}`}>
                {section.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${isOpen ? "rotate-180 text-[#F5A524]" : "text-gray-400"}`}
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1">
                <SectionContent body={section.body} items={section.items} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
