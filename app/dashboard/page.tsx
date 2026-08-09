'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  ArrowRight,
  Clock,
  Gauge,
  Moon,
  TrendingUp,
  CheckCircle2,
  Lock,
  Shield,
  LayoutGrid,
  Users,
  Eye,
} from 'lucide-react';
import {
  user,
  completedDaysLog,
  day12,
} from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Heatmap } from '@/components/heatmap';
import { StreakShield } from '@/components/streak-shield';
import { RecruiterView } from '@/components/recruiter-view';
import { CampusLeaderboard } from '@/components/campus-leaderboard';
import { CoderPulseTicker } from '@/components/coder-pulse-ticker';

const difficultyStyles: Record<string, string> = {
  Easy: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  Medium: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Hard: 'border-red-500/30 bg-red-500/10 text-red-400',
};

type DashboardTab = 'progress' | 'leaderboard' | 'recruiter';

const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: 'progress', label: 'My Progress', icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { id: 'leaderboard', label: 'Campus Rank', icon: <Users className="h-3.5 w-3.5" /> },
  { id: 'recruiter', label: 'Recruiter View', icon: <Eye className="h-3.5 w-3.5" /> },
];

function DashboardSkeleton() {
  return (
    <div className="flex flex-col">
      <section className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="skeleton h-8 w-24 rounded-lg" />
          <div className="skeleton h-7 w-20 rounded-full" />
        </div>
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex items-center gap-3.5">
            <div className="skeleton h-14 w-14 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-3 w-24 rounded" />
              <div className="skeleton h-3 w-28 rounded" />
            </div>
          </div>
        </div>
      </section>
      <section className="px-5 pt-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between">
            <div className="skeleton h-4 w-28 rounded" />
            <div className="skeleton h-5 w-16 rounded-full" />
          </div>
          <div className="mt-4 skeleton h-8 w-20 rounded" />
          <div className="mt-3 skeleton h-2.5 w-full rounded-full" />
          <div className="mt-5 grid grid-cols-10 gap-1.5">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="skeleton aspect-square rounded-[4px]" />
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 pt-5 space-y-3">
        <div className="skeleton h-40 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>('progress');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <DashboardSkeleton />;

  const progressPercent = Math.round(
    (user.completedDays / user.totalDays) * 100
  );

  return (
    <div className="flex flex-col">
      {/* Late-Night Coder Pulse Ticker */}
      <CoderPulseTicker />

      {/* Profile Header */}
      <section className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">
              AB
            </span>
            <span className="font-semibold text-white">ABTalks</span>
          </Link>
          <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 glow-amber">
            <span className="flex items-center gap-1.5 text-sm font-bold text-amber-400">
              <Flame className="h-4 w-4 animate-flame" />
              {user.streak} Days
            </span>
          </div>
        </div>

        {/* User card */}
        <div className="mt-5 animate-fade-in-up rounded-2xl border border-slate-700/50 glass p-4 glow-border-indigo">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-lg font-bold text-white">
                {user.avatarInitials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-900 bg-emerald-500">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">{user.name}</h1>
              <p className="text-xs text-slate-400">{user.handle}</p>
              <p className="mt-0.5 text-xs text-slate-500">{user.college}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="px-5 pt-5">
        <div className="flex gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pressable flex flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'progress' && (
        <ProgressTab progressPercent={progressPercent} />
      )}
      {activeTab === 'leaderboard' && (
        <section className="px-5 pt-5 pb-8">
          <CampusLeaderboard />
        </section>
      )}
      {activeTab === 'recruiter' && (
        <section className="px-5 pt-5 pb-8">
          <RecruiterView defaultActive />
        </section>
      )}
    </div>
  );
}

function ProgressTab({ progressPercent }: { progressPercent: number }) {
  return (
    <>
      {/* 60-Day Progress with Interactive Heatmap */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up rounded-2xl border border-slate-700/50 glass p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-300">
              60-Day Consistency Grid
            </h2>
            <Badge className="border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              {user.consistencyRank}
            </Badge>
          </div>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-3xl font-extrabold text-white">
              {user.completedDays}
            </span>
            <span className="mb-1 text-sm text-slate-500">
              / {user.totalDays} days
            </span>
          </div>

          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">{progressPercent}% complete</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <TrendingUp className="h-3 w-3" />
              On track
            </span>
          </div>

          <div className="mt-5">
            <Heatmap />
          </div>
        </div>
      </section>

      {/* Streak Shield */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-100">
          <StreakShield />
        </div>
      </section>

      {/* Today's Mission */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-200 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-900 p-5 glow-indigo">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-[11px] font-black text-white">
              {day12.day}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
              Today&apos;s Mission
            </span>
          </div>

          <h2 className="mt-3 text-xl font-bold leading-tight text-white">
            {day12.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${
                difficultyStyles[day12.difficulty]
              }`}
            >
              <Gauge className="h-3 w-3" />
              {day12.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-1 text-xs font-medium text-slate-300">
              <Clock className="h-3 w-3" />
              {day12.duration}
            </span>
          </div>

          <Link
            href="/day/12"
            className="pressable group mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500"
          >
            Start Challenge
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Late-Night Reminder */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-300 flex gap-3 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-slate-900 p-4">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/15">
            <Moon className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-300">
              Late-night coder reminder
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
              It&apos;s past midnight. Consistency beats intensity — submit
              before <span className="font-semibold text-amber-300">4:00 AM</span> to
              keep your streak alive. One commit is all it takes.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-5 pt-5 pb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300">
            Recent Activity
          </h2>
          <span className="text-xs text-slate-500">
            {user.completedDays} completed
          </span>
        </div>

        <div className="space-y-2">
          {completedDaysLog
            .slice()
            .reverse()
            .slice(0, 5)
            .map((log, i) => (
              <div
                key={log.day}
                className={`animate-fade-in flex items-center gap-3 rounded-xl border p-3 ${
                  log.status === 'missed'
                    ? 'border-red-500/20 bg-red-500/5'
                    : 'border-slate-800 bg-slate-900/40'
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                    log.status === 'missed'
                      ? 'bg-red-500/15'
                      : 'bg-emerald-500/15'
                  }`}
                >
                  {log.status === 'missed' ? (
                    <Shield className="h-4 w-4 text-red-400" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[13px] font-medium text-white">
                    Day {log.day}: {log.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {log.date}
                    {log.status === 'missed' && ' · Recoverable'}
                  </p>
                </div>
                {log.status === 'missed' ? (
                  <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400">
                    MISSED
                  </span>
                ) : (
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                )}
              </div>
            ))}

          {/* Locked upcoming day */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-800/50 bg-slate-900/20 p-3 opacity-50">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800">
              <Lock className="h-3.5 w-3.5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-medium text-slate-400">
                Day {user.streak + 1}: Unlocks tomorrow
              </p>
              <p className="text-xs text-slate-600">Complete today first</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
