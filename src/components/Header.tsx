"use client";

import { Bell, Settings, User, Zap } from "lucide-react";
import CreditsBadge from "./CreditsBadge";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="font-semibold text-[#111827] text-base">Nextbigideas.ai</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Credits label */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Zap className="w-4 h-4 text-[#F5A524]" />
          <span className="text-gray-500">1 credit = 1 idea</span>
        </div>

        {/* Credits badge + dropdown */}
        <CreditsBadge />

        {/* User */}
        <span className="text-sm text-gray-600 hidden md:block">utkarshsingh1908@...</span>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#F5A524] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* Profile */}
        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Profile">
          <User className="w-5 h-5 text-gray-600" />
        </button>

        {/* Settings */}
        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Settings">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
