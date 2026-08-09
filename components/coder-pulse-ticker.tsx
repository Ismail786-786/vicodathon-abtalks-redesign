'use client';

import { Moon } from 'lucide-react';
import { coderPulseFeed } from '@/lib/mock-data';

export function CoderPulseTicker() {
  const items = [...coderPulseFeed, ...coderPulseFeed];

  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-slate-900/80">
      {/* Live indicator */}
      <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-1.5 bg-slate-900/95 px-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-400">
          Live
        </span>
      </div>

      {/* Gradient fades */}
      <div className="pointer-events-none absolute left-12 top-0 z-10 h-full w-8 bg-gradient-to-r from-slate-900/95 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-900/95 to-transparent" />

      {/* Scrolling content */}
      <div className="flex animate-ticker whitespace-nowrap py-2 pl-14">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-3">
            <div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-[8px] font-bold text-white`}
            >
              {item.initials}
            </div>
            <span className="text-[11px] text-slate-400">
              <span className="font-semibold text-slate-200">{item.name}</span>{' '}
              {item.action}
            </span>
            <span className="text-[10px] text-slate-600">{item.college}</span>
            <span className="text-[10px] text-emerald-500/70">· {item.time}</span>
            <span className="ml-2 text-slate-700">•</span>
          </div>
        ))}
      </div>

      {/* 3 AM badge */}
      <div className="absolute right-0 top-0 z-10 flex h-full items-center gap-1 bg-slate-900/95 px-2.5">
        <Moon className="h-3 w-3 text-indigo-400" />
        <span className="text-[10px] font-medium text-slate-500">3 AM IST</span>
      </div>
    </div>
  );
}
