import Link from "next/link";
import { Loader2, CheckCircle, Clock } from "lucide-react";
import type { RefinementItem } from "@/store/generationQueueStore";

const statusIcon = {
  queued: <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />,
  processing: (
    <Loader2 className="w-3 h-3 text-[#F5A524] animate-spin flex-shrink-0" />
  ),
  completed: (
    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
  ),
};

const statusLabel: Record<string, string | null> = {
  queued: "Queued",
  processing: "Generating...",
  completed: null,
};

export default function QueueSubItem({
  refinement,
}: {
  refinement: RefinementItem;
}) {
  const inner = (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-amber-50 transition-colors group">
      <div className="w-px h-3 bg-gray-300 flex-shrink-0 ml-1" />
      {statusIcon[refinement.status]}
      <span className="text-xs text-gray-600 truncate flex-1 group-hover:text-[#F5A524] transition-colors">
        {refinement.title}
      </span>
      {statusLabel[refinement.status] && (
        <span className="text-[10px] text-gray-400 flex-shrink-0 whitespace-nowrap leading-none">
          {statusLabel[refinement.status]}
        </span>
      )}
    </div>
  );

  if (refinement.status === "completed") {
    return (
      <Link href={`/ideas/${refinement.slug}`} className="block">
        {inner}
      </Link>
    );
  }

  return inner;
}
