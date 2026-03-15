"use client";

import { Bell, Zap, Settings, User } from "lucide-react";
import CreditsBadge from "./CreditsBadge";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="font-semibold text-[#111827] text-base tracking-tight">Nextbigideas.ai</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Credits hint — subtle context chip */}
        <div className="hidden md:flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-full px-3 py-1">
          <Zap className="w-3 h-3 text-[#F5A524] flex-shrink-0" />
          <span className="text-xs font-medium text-amber-700">1 credit = 1 idea</span>
        </div>

        {/* Credits badge + dropdown */}
        <CreditsBadge />

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Notifications (2 unread)"
        >
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#F5A524] rounded-full ring-2 ring-white" />
        </button>

        {/* User menu — profile + settings consolidated */}
        <button
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="User menu"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <Settings className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
