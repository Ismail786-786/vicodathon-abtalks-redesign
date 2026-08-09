'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Gauge,
  CheckCircle2,
  Github,
  Linkedin,
  Copy,
  Check,
  Lock,
  Target,
  BookOpen,
  Code2,
  Sparkles,
  Flame,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { day12, user, recruiterNotifications } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Confetti } from '@/components/confetti';
import { AIMentorModal } from '@/components/ai-mentor-modal';
import { useToast } from '@/hooks/use-toast';

const difficultyStyles: Record<string, string> = {
  Easy: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  Medium: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  Hard: 'border-red-500/30 bg-red-500/10 text-red-400',
};

export default function DayWorkspace() {
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showRecruiterNotif, setShowRecruiterNotif] = useState(false);
  const [errors, setErrors] = useState<{ github?: string; linkedin?: string }>(
    {}
  );
  const { toast } = useToast();

  useEffect(() => {
    if (submitted) {
      const badgeTimer = setTimeout(() => setShowBadge(true), 600);
      const notifTimer = setTimeout(() => setShowRecruiterNotif(true), 1800);
      return () => {
        clearTimeout(badgeTimer);
        clearTimeout(notifTimer);
      };
    }
  }, [submitted]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(day12.linkedinTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const validate = () => {
    const next: { github?: string; linkedin?: string } = {};
    if (!githubUrl.trim()) next.github = 'GitHub repo URL is required';
    else if (!githubUrl.includes('github.com'))
      next.github = 'Enter a valid GitHub URL';
    if (!linkedinUrl.trim()) next.linkedin = 'LinkedIn post URL is required';
    else if (!linkedinUrl.includes('linkedin.com'))
      next.linkedin = 'Enter a valid LinkedIn URL';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || !validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: '+1 Commit verified via GitHub API simulation!',
        description: 'Your proof of work has been locked in.',
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="sticky top-0 z-20 border-b border-slate-800 glass-strong px-5 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-400">
              <Flame className="h-3 w-3 animate-flame" />
              {user.streak}
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-black text-white">
              {day12.day}
            </span>
          </div>
        </div>
      </section>

      {/* Task Title */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up">
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
            Day {day12.day} Challenge
          </span>
          <h1 className="mt-1.5 text-2xl font-extrabold leading-tight text-white">
            {day12.title}
          </h1>
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
          <div className="mt-3 flex flex-wrap gap-1.5">
            {day12.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-700 bg-slate-800/30 text-slate-400"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Objective */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-100 rounded-2xl border border-slate-700/50 glass p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Objective</h2>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
            {day12.objective}
          </p>
        </div>
      </section>

      {/* Instructions */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-200 rounded-2xl border border-slate-700/50 glass p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Instructions</h2>
          </div>
          <ol className="mt-3 space-y-2.5">
            {day12.instructions.map((instruction, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400">
                  {i + 1}
                </span>
                <span className="text-[13px] leading-relaxed text-slate-300">
                  {instruction}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Resources */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up rounded-2xl border border-slate-700/50 glass p-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Resources</h2>
          </div>
          <div className="mt-3 space-y-2">
            {day12.resources.map((res) => (
              <a
                key={res.label}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/30 px-3 py-2.5 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/5"
              >
                <span className="text-[13px] font-medium text-slate-300">
                  {res.label}
                </span>
                <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LinkedIn Post Generator */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-300 overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-900 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/15">
              <Linkedin className="h-4 w-4 text-sky-400" />
            </div>
            <h2 className="text-sm font-semibold text-white">
              Auto-Draft LinkedIn Post
            </h2>
            <span className="ml-auto flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-400">
              <Sparkles className="h-2.5 w-2.5" />
              AUTO
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Copy this pre-formatted post, paste it on LinkedIn, then add your
            links.
          </p>

          <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 p-3">
            <pre className="no-scrollbar whitespace-pre-wrap text-[12px] leading-relaxed text-slate-300">
              {day12.linkedinTemplate}
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className="pressable mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-sky-600 text-sm font-semibold text-white transition-all hover:bg-sky-500"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Post Caption
              </>
            )}
          </button>
        </div>
      </section>

      {/* AI Mentor */}
      <section className="px-5 pt-5">
        <div className="animate-fade-in-up delay-300">
          <AIMentorModal />
        </div>
      </section>

      {/* Proof of Work Submission */}
      <section className="px-5 pt-5 pb-8">
        {submitted ? (
          /* Celebratory Success State with Confetti */
          <div className="relative animate-scale-in overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-900 p-6 text-center glow-emerald">
            <Confetti active={submitted} />

            <div className="relative z-10">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse-ring" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">
                Day {day12.day} Locked In!
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Your proof of work has been verified. You&apos;re on fire!
              </p>

              {/* Streak Upgrade Badge Pop-up */}
              {showBadge && (
                <div className="animate-badge-in mt-4 inline-flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-5 py-3 glow-amber">
                  <Flame className="h-6 w-6 text-amber-400 animate-flame" />
                  <div className="text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-500">
                      Streak Upgraded
                    </p>
                    <p className="text-lg font-extrabold text-white">
                      {user.streak} → {user.streak + 1} Days
                    </p>
                  </div>
                </div>
              )}

              {/* Recruiter Notification Preview */}
              {showRecruiterNotif && (
                <div className="animate-slide-up-fade mt-4 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/15 to-slate-900 p-4 text-left">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20">
                      <Eye className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        3 Recruiters viewed your verified proof today!
                      </p>
                      <p className="text-xs text-slate-400">
                        Your work is getting noticed by top companies
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {recruiterNotifications.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-2"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      >
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-[9px] font-bold text-white">
                          {rec.profilePicture}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-[11px] font-semibold text-white">
                            {rec.recruiterName}
                          </p>
                          <p className="truncate text-[10px] text-slate-400">
                            {rec.recruiterRole} · {rec.recruiterCompany}
                          </p>
                        </div>
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-400">
                          <TrendingUp className="h-2.5 w-2.5" />
                          Viewed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/dashboard"
                className="pressable mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-all hover:bg-indigo-500"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up rounded-2xl border border-slate-700/50 glass p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">
                Proof of Work
              </h2>
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              Submit your links to lock in today&apos;s challenge.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* GitHub URL */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <Github className="h-3.5 w-3.5" />
                  GitHub Repository URL
                </label>
                <Input
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={githubUrl}
                  onChange={(e) => {
                    setGithubUrl(e.target.value);
                    if (errors.github)
                      setErrors({ ...errors, github: undefined });
                  }}
                  disabled={submitting}
                  className={`min-h-[44px] border-slate-700 bg-slate-950/60 text-sm text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 ${
                    errors.github ? 'border-red-500/50' : ''
                  }`}
                />
                {errors.github && (
                  <p className="mt-1 text-xs text-red-400">{errors.github}</p>
                )}
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn Post URL
                </label>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/posts/username_..."
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value);
                    if (errors.linkedin)
                      setErrors({ ...errors, linkedin: undefined });
                  }}
                  disabled={submitting}
                  className={`min-h-[44px] border-slate-700 bg-slate-950/60 text-sm text-white placeholder:text-slate-600 focus-visible:ring-indigo-500 ${
                    errors.linkedin ? 'border-red-500/50' : ''
                  }`}
                />
                {errors.linkedin && (
                  <p className="mt-1 text-xs text-red-400">{errors.linkedin}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="pressable flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Locking in...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Submit & Lock In Day {day12.day}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
