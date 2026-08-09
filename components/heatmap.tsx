'use client';

import { useState, useRef } from 'react';
import { getDayStatus, type DayStatus } from '@/lib/mock-data';

const statusConfig: Record<
  DayStatus,
  { bg: string; text: string; label: string; ring?: string }
> = {
  completed: {
    bg: 'bg-emerald-500/80',
    text: 'text-emerald-300',
    label: 'Completed',
  },
  missed: {
    bg: 'bg-red-900/60',
    text: 'text-red-400',
    label: 'Missed',
  },
  today: {
    bg: 'bg-indigo-600',
    text: 'text-indigo-300',
    label: 'Today',
    ring: 'ring-2 ring-indigo-400',
  },
  future: {
    bg: 'bg-slate-800/60',
    text: 'text-slate-500',
    label: 'Upcoming',
  },
};

export function Heatmap() {
  const [tooltip, setTooltip] = useState<{
    day: number;
    status: DayStatus;
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const days = Array.from({ length: 60 }, (_, i) => i + 1);

  const handleTouch = (day: number, e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltip({
        day,
        status: getDayStatus(day),
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setTimeout(() => setTooltip(null), 2500);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="no-scrollbar overflow-x-auto pb-1">
        <div className="grid grid-cols-10 gap-1.5 min-w-[300px]">
          {days.map((day) => {
            const status = getDayStatus(day);
            const config = statusConfig[status];
            return (
              <div
                key={day}
                className={`relative aspect-square rounded-[4px] flex items-center justify-center text-[7px] font-bold transition-all duration-200 ${config.bg} ${config.text} ${
                  status === 'today' ? `${config.ring} animate-glow-pulse` : ''
                } hover:scale-125 hover:z-10 cursor-pointer`}
                onTouchStart={(e) => handleTouch(day, e)}
                onMouseEnter={(e) => {
                  const rect = containerRef.current?.getBoundingClientRect();
                  if (rect) {
                    setTooltip({
                      day,
                      status,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[10px] shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          <p className="font-bold text-white">Day {tooltip.day}</p>
          <p className={statusConfig[tooltip.status].text}>
            {statusConfig[tooltip.status].label}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/80" /> Completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-red-900/60" /> Missed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-indigo-600 ring-1 ring-indigo-400" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-800/60" /> Upcoming
        </span>
      </div>
    </div>
  );
}
