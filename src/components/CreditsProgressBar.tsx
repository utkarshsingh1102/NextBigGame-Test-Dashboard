"use client";

type Props = {
  current: number;
  total: number;
};

export default function CreditsProgressBar({ current, total }: Props) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  // Colour shifts: green → amber → red as credits deplete
  const barColor =
    pct > 50
      ? "linear-gradient(90deg, #22c55e, #4ade80)"
      : pct > 20
      ? "linear-gradient(90deg, #f97316, #fbbf24)"
      : "linear-gradient(90deg, #ef4444, #f97316)";

  return (
    <div>
      {/* Track */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      {/* Label */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-xs text-gray-400">
          <span className="font-semibold text-gray-700">{current}</span> / {total} credits remaining
        </span>
        <span className="text-[10px] font-semibold text-gray-400">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}
