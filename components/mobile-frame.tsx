'use client';

import { useState, useEffect, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

export function MobileFrame({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    setTheme(stored as Theme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      if (next === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 p-0 dark:bg-slate-950 sm:p-6">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      {/* Mobile frame */}
      <div className="relative z-10 flex h-screen w-full max-w-[390px] flex-col overflow-hidden bg-slate-950 shadow-2xl shadow-indigo-950/50 dark:bg-slate-950 sm:h-[844px] sm:rounded-[2.5rem] sm:border-8 sm:border-slate-800">
        {/* Status bar */}
        <div className="flex h-8 flex-shrink-0 items-center justify-between px-6 text-[11px] font-medium text-slate-400">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="flex items-end gap-[2px]">
              <span className="h-2 w-[3px] rounded-sm bg-slate-400" />
              <span className="h-2.5 w-[3px] rounded-sm bg-slate-400" />
              <span className="h-3 w-[3px] rounded-sm bg-slate-400" />
              <span className="h-3.5 w-[3px] rounded-sm bg-slate-400" />
            </span>
            <svg className="h-3 w-4 text-slate-400" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 2.5c1.5 0 2.9.5 4 1.4l1-1.1A7.5 7.5 0 008 1a7.5 7.5 0 00-5 1.8l1 1.1A6.2 6.2 0 018 2.5zM8 5c.9 0 1.7.3 2.4.8l1-1.1A5 5 0 008 3.5a5 5 0 00-3.4 1.2l1 1.1A3.7 3.7 0 018 5zm0 2.5c.3 0 .6.1.8.3l1-1.1A2.5 2.5 0 008 6a2.5 2.5 0 00-1.8.7l1 1.1c.2-.2.5-.3.8-.3zM6 9.5L8 12l2-2.5a3 3 0 00-4 0z" />
            </svg>
            <div className="relative ml-0.5 h-3 w-6 rounded-sm border border-slate-400 px-[1px] py-[1px]">
              <div className="h-full w-3/4 rounded-[1px] bg-slate-400" />
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="pressable absolute right-3 top-9 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-800/60 text-slate-400 transition-all hover:text-white"
          aria-label="Toggle theme"
        >
          {mounted && theme === 'dark' ? (
            <Moon className="h-3.5 w-3.5 text-indigo-400" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-amber-500" />
          )}
        </button>

        {/* Scrollable content area */}
        <div className="no-scrollbar flex-1 overflow-y-auto">{children}</div>

        {/* Home indicator */}
        <div className="flex h-6 flex-shrink-0 items-center justify-center">
          <div className="h-1 w-32 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
