import { CheckCircle } from "lucide-react";

type Props = {
  message: string;
};

export default function Toast({ message }: Props) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl pointer-events-none">
      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
