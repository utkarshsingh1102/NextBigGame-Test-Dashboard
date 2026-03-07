"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (value: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 px-4 py-3 bg-white">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="e.g. Make it purple gradient themed with multiplayer..."
          rows={3}
          className="flex-1 resize-none text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#F5A524]/30 focus:border-[#F5A524] placeholder-gray-400 disabled:opacity-50 disabled:bg-gray-50 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          aria-label="Send message"
          className="flex-shrink-0 w-10 h-10 bg-[#F5A524] text-white rounded-xl flex items-center justify-center hover:bg-amber-500 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
