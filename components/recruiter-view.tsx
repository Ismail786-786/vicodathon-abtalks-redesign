'use client';

import { useState } from 'react';
import {
  Eye,
  X,
  Github,
  Linkedin,
  CheckCircle2,
  GitCommit,
  TrendingUp,
  Award,
  FileText,
  Calendar,
  ChevronRight,
  Share2,
  Download,
  Shield,
  Sparkles,
  Fingerprint,
} from 'lucide-react';
import {
  user,
  completedDaysLog,
  recruiterNotifications,
  commitActivity,
} from '@/lib/mock-data';

export function RecruiterView({ defaultActive = false }: { defaultActive?: boolean }) {
  const [active, setActive] = useState(defaultActive);
  const [selectedDay, setSelectedDay] = useState<DayLogEntry | null>(null);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const verifiedProofs = completedDaysLog.filter((d) => d.status === 'completed');
  const totalCommits = commitActivity.reduce((sum, d) => sum + d.commits, 0);
  const consistencyScore = Math.round(
    (user.completedDays / user.totalDays) * 100
  );

  if (!active) {
    return (
      <button
        onClick={() => setActive(true)}
        className="pressable group flex w-full items-center gap-3 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/10 to-slate-900 p-4 text-left transition-all hover:border-indigo-500/40"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/20">
          <Eye className="h-5 w-5 text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">
            Recruiter View Preview
          </h3>
          <p className="text-xs text-slate-400">
            See how recruiters see your profile
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
      </button>
    );
  }

  if (showPortfolio) {
    return (
      <PortfolioCard
        user={user}
        totalCommits={totalCommits}
        verifiedProofs={verifiedProofs.length}
        consistencyScore={consistencyScore}
        onBack={() => setShowPortfolio(false)}
      />
    );
  }

  return (
    <div className="animate-flip-in space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20">
            <Eye className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Recruiter View</h3>
            <p className="text-[10px] text-slate-500">
              How hiring managers see you
            </p>
          </div>
        </div>
        <button
          onClick={() => setActive(false)}
          className="pressable rounded-lg p-1 text-slate-500 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Shareable Portfolio Card Button */}
      <button
        onClick={() => setShowPortfolio(true)}
        className="pressable group flex w-full items-center gap-3 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-slate-900 p-4 text-left transition-all hover:border-emerald-500/40"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
          <Fingerprint className="h-5 w-5 text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">
            Shareable Portfolio Card
          </h3>
          <p className="text-xs text-slate-400">
            Download your verified credential card
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Recruiter profile card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
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
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-white">{user.name}</h2>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">{user.college}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{user.bio}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <RecruiterStat
            icon={<GitCommit className="h-3.5 w-3.5" />}
            value={`${totalCommits}`}
            label="Commits"
          />
          <RecruiterStat
            icon={<FileText className="h-3.5 w-3.5" />}
            value={`${verifiedProofs.length}`}
            label="Proofs"
          />
          <RecruiterStat
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            value={user.consistencyRank}
            label="Rank"
          />
        </div>

        {/* Skills */}
        <div className="mt-4">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Verified Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter interest */}
      <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-slate-900 p-4">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">
            Recruiter Interest
          </h3>
        </div>
        <div className="mt-3 space-y-2">
          {recruiterNotifications.map((rec, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-2.5"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-[10px] font-bold text-white">
                {rec.profilePicture}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  {rec.recruiterName}
                </p>
                <p className="truncate text-[10px] text-slate-400">
                  {rec.recruiterRole} · {rec.recruiterCompany}
                </p>
              </div>
              <span className="text-[10px] text-slate-500">{rec.viewedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified learning trail */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="text-sm font-semibold text-white">
          Verified Learning Trail
        </h3>
        <p className="mt-0.5 text-[10px] text-slate-500">
          Every proof verified by ABTalks
        </p>

        <div className="mt-3 space-y-2">
          {verifiedProofs.slice(0, 5).map((log) => (
            <button
              key={log.day}
              onClick={() => setSelectedDay(log)}
              className="pressable flex w-full items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-800/30 p-2.5 text-left transition-all hover:border-indigo-500/30"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium text-white">
                  Day {log.day}: {log.title}
                </p>
                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="flex items-center gap-0.5">
                    <Github className="h-2.5 w-2.5" />
                    {log.commitHash}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Linkedin className="h-2.5 w-2.5" />
                    Posted
                  </span>
                </div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      {selectedDay && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className="animate-slide-up-fade w-full max-w-[390px] rounded-t-3xl border border-slate-700 bg-slate-900 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-700" />
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Day {selectedDay.day} Proof
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="pressable rounded-lg p-1 text-slate-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-300">{selectedDay.title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              {selectedDay.date} · {selectedDay.duration} · {selectedDay.difficulty}
            </div>

            <div className="mt-4 space-y-2">
              <a
                href={`https://${selectedDay.githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/40 p-3 transition-all hover:border-indigo-500/40"
              >
                <Github className="h-4 w-4 text-slate-300" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500">GitHub Repository</p>
                  <p className="truncate text-xs font-medium text-white">
                    {selectedDay.githubUrl}
                  </p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </a>
              <a
                href={`https://${selectedDay.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-800/40 p-3 transition-all hover:border-sky-500/40"
              >
                <Linkedin className="h-4 w-4 text-sky-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500">LinkedIn Post</p>
                  <p className="truncate text-xs font-medium text-white">
                    {selectedDay.linkedinUrl}
                  </p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              </a>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">
                Verified by ABTalks
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PortfolioCard({
  user,
  totalCommits,
  verifiedProofs,
  consistencyScore,
  onBack,
}: {
  user: typeof import('@/lib/mock-data').user;
  totalCommits: number;
  verifiedProofs: number;
  consistencyScore: number;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const trustId = `ABT-${user.githubUsername.toUpperCase()}-${consistencyScore}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `ABTalks Verified Consistency Score: ${consistencyScore}% — ${user.name}, ${user.college}. Trust ID: ${trustId}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="animate-flip-in space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
            <Fingerprint className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Portfolio Card</h3>
            <p className="text-[10px] text-slate-500">
              Shareable verified credential
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="pressable rounded-lg p-1 text-slate-500 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* The Credential Card */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-5 glow-emerald">
        {/* Decorative glow */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-[10px] font-black text-white">AB</span>
              </div>
              <span className="text-xs font-bold text-white">ABTalks</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
              <Shield className="h-3 w-3 text-emerald-400" />
              <span className="text-[9px] font-bold text-emerald-400">
                VERIFIED
              </span>
            </div>
          </div>

          {/* Student identity */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-lg font-bold text-white">
              {user.avatarInitials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{user.name}</h2>
              <p className="text-xs text-slate-400">{user.college}</p>
              <p className="text-[11px] text-slate-500">@{user.githubUsername}</p>
            </div>
          </div>

          {/* Consistency Score — the hero metric */}
          <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500">
              ABTalks Verified Consistency Score
            </p>
            <p className="mt-1 text-4xl font-extrabold text-white">
              {consistencyScore}
              <span className="text-2xl text-emerald-400">%</span>
            </p>
            <div className="mt-2 mx-auto h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                style={{ width: `${consistencyScore}%` }}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <CardStat value={`${totalCommits}`} label="GitHub Commits" />
            <CardStat value={`${verifiedProofs}`} label="Verified Proofs" />
            <CardStat value={user.consistencyRank} label="Top Rank" />
          </div>

          {/* Trust ID */}
          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-950/60 p-2.5">
            <Fingerprint className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] font-mono text-slate-400">
              Trust ID: {trustId}
            </span>
          </div>

          {/* Skills */}
          <div className="mt-4">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Verified Skill Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
            <Sparkles className="h-3 w-3 text-indigo-500" />
            Issued {user.joinedDate} · ABTalks Consistency Protocol v2.0
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="pressable flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white transition-all hover:bg-emerald-500"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Share Card
            </>
          )}
        </button>
        <button className="pressable flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/40 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800/70">
          <Download className="h-4 w-4" />
          Save
        </button>
      </div>
    </div>
  );
}

function RecruiterStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-2.5 text-center">
      <div className="mx-auto mb-1 flex justify-center text-indigo-400">
        {icon}
      </div>
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-[10px] text-slate-500">{label}</p>
    </div>
  );
}

function CardStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-2.5 text-center">
      <p className="text-base font-bold text-white">{value}</p>
      <p className="text-[9px] text-slate-500">{label}</p>
    </div>
  );
}

type DayLogEntry = (typeof completedDaysLog)[number];
