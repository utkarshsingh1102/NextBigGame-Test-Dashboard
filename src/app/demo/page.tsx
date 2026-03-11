"use client";

import CreditScenarioCard from "@/components/CreditScenarioCard";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          Interactive Preview
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Credits System — Demo</h1>
        <p className="text-sm text-gray-500 mt-1.5">
          Two isolated scenarios. Click{" "}
          <span className="font-medium text-orange-500">Refine More</span> in each card to see
          the modal for that state.
        </p>
      </div>

      {/* Side-by-side scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {/* Scenario A — 0 credits */}
        <CreditScenarioCard initialCredits={0} />

        {/* Scenario B — 25 credits */}
        <CreditScenarioCard initialCredits={25} />
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-gray-400 max-w-xl">
        Each card maintains its own isolated credit state. Purchasing credits inside a card
        updates only that card&apos;s balance — the two scenarios are fully independent.
      </p>
    </div>
  );
}
