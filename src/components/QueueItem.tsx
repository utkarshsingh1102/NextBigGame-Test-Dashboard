import Link from "next/link";

type QueueItemProps = {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  initials: string;
  isActive?: boolean;
};

export default function QueueItem({ id, title, subtitle, gradient, initials, isActive }: QueueItemProps) {
  return (
    <Link
      href={`/game/${id}`}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
        isActive ? "bg-amber-50 border-l-2 border-[#F5A524]" : "hover:bg-gray-50"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${gradient}`}>
        <span className="text-white text-xs font-bold">{initials}</span>
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? "text-[#F5A524]" : "text-[#111827]"}`}>
          {title}
        </p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
    </Link>
  );
}
