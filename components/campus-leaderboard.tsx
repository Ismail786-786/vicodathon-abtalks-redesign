'use client';

import { useState } from 'react';
import { Flame, Trophy, Users, TrendingUp } from 'lucide-react';
import {
  leaderboardAllTime,
  leaderboardThisWeek,
  collegeLeaderboard,
  type LeaderboardTab,
} from '@/lib/mock-data';

const badgeStyles: Record<string, string> = {
  'Consistency King': 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  'Night Owl Coder': 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
  'Streak Guardian': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  'GitHub Warrior': 'border-slate-500/30 bg-slate-700/30 text-slate-300',
  'LinkedIn Star': 'border-sky-500/30 bg-sky-500/10 text-sky-400',
  'Rising Streak': 'border-rose-500/30 bg-rose-500/10 text-rose-400',
  "This Week's MVP": 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  'Consistency Capital': 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  'Night Owl Hub': 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
  'GitHub Fortress': 'border-slate-500/30 bg-slate-700/30 text-slate-300',
  'Rising Powerhouse': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  'Late Night Legends': 'border-violet-500/30 bg-violet-500/10 text-violet-400',
  'Consistency Climbers': 'border-rose-500/30 bg-rose-500/10 text-rose-400',
};

const subTabs: { id: LeaderboardTab; label: string }[] = [
  { id: 'all-time', label: 'All-Time' },
  { id: 'this-week', label: 'This Week' },
  { id: 'college-vs-college', label: 'Colleges' },
];

export function CampusLeaderboard() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('all-time');

  const students =
    activeTab === 'this-week' ? leaderboardThisWeek : leaderboardAllTime;

  return (
    <div className="animate-fade-in space-y-4">
      {/* Sub-tab filters */}
      <div className="flex gap-1.5 rounded-2xl border border-slate-800 bg-slate-900/60 p-1.5">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pressable flex-1 rounded-xl px-2 py-2 text-center text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'college-vs-college' ? (
        <CollegeRanking />
      ) : (
        <StudentRanking students={students} />
      )}
    </div>
  );
}

function StudentRanking({
  students,
}: {
  students: typeof leaderboardAllTime;
}) {
  return (
    <div>
      {/* Podium - Top 3 */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {students.slice(0, 3).map((student, i) => {
          const podiumStyles = [
            'order-2 -translate-y-2',
            'order-1',
            'order-3',
          ];
          const medalColors = [
            'from-amber-400 to-orange-600',
            'from-slate-300 to-slate-500',
            'from-orange-400 to-amber-700',
          ];
          return (
            <div
              key={student.rank}
              className={`animate-bounce-in flex flex-col items-center ${podiumStyles[i]}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${student.avatarColor} text-sm font-bold text-white shadow-lg`}
                >
                  {student.initials}
                </div>
                <div
                  className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${medalColors[i]} text-[9px] font-black text-white shadow-md`}
                >
                  {student.rank}
                </div>
              </div>
              <p className="mt-1.5 max-w-[80px] truncate text-[11px] font-semibold text-white">
                {student.name.split(' ')[0]}
              </p>
              <div className="flex items-center gap-0.5 text-[10px] text-amber-400">
                <Flame className="h-2.5 w-2.5" />
                {student.streak}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full ranking list */}
      <div className="space-y-2">
        {students.map((student, i) => (
          <div
            key={student.rank}
            className={`animate-fade-in flex items-center gap-3 rounded-2xl border p-3 transition-all ${
              student.isCurrentUser
                ? 'border-indigo-500/40 bg-indigo-500/10'
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex w-7 flex-shrink-0 items-center justify-center">
              {student.rank <= 3 ? (
                <span className="text-sm font-black text-amber-400">
                  {student.rank}
                </span>
              ) : (
                <span className="text-sm font-bold text-slate-500">
                  {student.rank}
                </span>
              )}
            </div>

            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${student.avatarColor} text-xs font-bold text-white`}
            >
              {student.initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-[13px] font-semibold text-white">
                  {student.name}
                </p>
                {student.isCurrentUser && (
                  <span className="flex-shrink-0 rounded-full border border-indigo-500/30 bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300">
                    YOU
                  </span>
                )}
              </div>
              <p className="truncate text-[11px] text-slate-500">
                {student.college}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {student.badges.slice(0, 2).map((badge) => (
                  <span
                    key={badge}
                    className={`rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${
                      badgeStyles[badge] ||
                      'border-slate-700 bg-slate-800/30 text-slate-400'
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-col items-end">
              <div className="flex items-center gap-1 text-amber-400">
                <Flame className="h-3.5 w-3.5 animate-flame" />
                <span className="text-sm font-bold">{student.streak}</span>
              </div>
              <div className="mt-0.5 text-[10px] text-slate-500">
                {student.weeklyCommits} commits/wk
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollegeRanking() {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Users className="h-4 w-4 text-indigo-400" />
        <h2 className="text-sm font-semibold text-slate-300">
          College vs College
        </h2>
      </div>
      <div className="space-y-2">
        {collegeLeaderboard.map((college, i) => (
          <div
            key={college.rank}
            className={`animate-fade-in flex items-center gap-3 rounded-2xl border p-3.5 transition-all ${
              college.collegeShort === 'IIT-B'
                ? 'border-indigo-500/40 bg-indigo-500/10'
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="flex w-7 flex-shrink-0 items-center justify-center">
              {college.rank <= 3 ? (
                <Trophy className="h-4 w-4 text-amber-400" />
              ) : (
                <span className="text-sm font-bold text-slate-500">
                  {college.rank}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-[13px] font-semibold text-white">
                {college.college}
              </p>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-0.5">
                  <Users className="h-2.5 w-2.5" />
                  {college.activeStudents} coders
                </span>
                <span className="flex items-center gap-0.5">
                  <TrendingUp className="h-2.5 w-2.5" />
                  {college.avgConsistency}
                </span>
              </div>
              <span
                className={`mt-1 inline-block rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${
                  badgeStyles[college.badge] ||
                  'border-slate-700 bg-slate-800/30 text-slate-400'
                }`}
              >
                {college.badge}
              </span>
            </div>

            <div className="flex flex-shrink-0 flex-col items-end">
              <div className="flex items-center gap-1 text-amber-400">
                <Flame className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">
                  {college.totalStreakDays.toLocaleString()}
                </span>
              </div>
              <span className="text-[10px] text-slate-500">total days</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
