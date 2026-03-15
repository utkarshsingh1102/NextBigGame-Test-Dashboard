type Props = {
  role: "user" | "ai";
  content: string;
  isLoading?: boolean;
};

export default function ChatMessage({ role, content, isLoading }: Props) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-[#F5A524] text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 leading-relaxed shadow-sm">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-[10px] font-bold leading-none">AI</span>
      </div>
      <div className="max-w-[80%] bg-gray-50 border border-gray-100 text-gray-700 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 leading-relaxed">
        {isLoading ? (
          <div className="flex gap-1 items-center py-0.5">
            <span
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
