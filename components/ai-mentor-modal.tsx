'use client';

import { useState } from 'react';
import {
  Brain,
  X,
  Lightbulb,
  Code2,
  Bug,
  ChevronRight,
  Sparkles,
  Moon,
  Coffee,
} from 'lucide-react';
import { aiMentorHints } from '@/lib/mock-data';

const typeIcons: Record<string, React.ReactNode> = {
  nudge: <Lightbulb className="h-4 w-4 text-amber-400" />,
  architectural: <Code2 className="h-4 w-4 text-indigo-400" />,
  debug: <Bug className="h-4 w-4 text-rose-400" />,
};

const typeLabels: Record<string, string> = {
  nudge: 'Gentle Nudge',
  architectural: 'Architecture',
  debug: 'Debug Tip',
};

export function AIMentorModal() {
  const [open, setOpen] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const currentHint = aiMentorHints[hintLevel];
  const isLastHint = hintLevel >= aiMentorHints.length - 1;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="pressable group flex w-full items-center gap-3 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/10 via-violet-600/5 to-slate-900 p-4 text-left transition-all hover:border-indigo-500/40"
      >
        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/20">
          <Brain className="h-5 w-5 text-indigo-400" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">
            Stuck? Ask AI Mentor
          </h3>
          <p className="text-xs text-slate-400">
            Get non-spoiler hints tailored for late-night coders
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="animate-slide-up-fade w-full max-w-[390px] rounded-t-3xl border border-slate-700 bg-slate-900 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-700" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
              <Brain className="h-5 w-5 text-white" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">AI Mentor</h2>
              <p className="text-[11px] text-slate-500">
                Non-spoiler hints · Powered by ABTalks
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="pressable rounded-lg p-1 text-slate-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hint Progress Dots */}
        <div className="mt-4 flex items-center gap-1.5">
          {aiMentorHints.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                i <= hintLevel ? 'bg-indigo-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-slate-500">
          Hint {hintLevel + 1} of {aiMentorHints.length} ·{' '}
          {isLastHint ? 'Final hint' : 'More hints available'}
        </p>

        {/* Current Hint Card */}
        <div
          key={hintLevel}
          className="animate-flip-in mt-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800">
              {typeIcons[currentHint.type]}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {typeLabels[currentHint.type]}
              </p>
              <h3 className="text-sm font-bold text-white">
                {currentHint.title}
              </h3>
            </div>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
            {currentHint.content}
          </p>

          {currentHint.codeSnippet && (
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 p-3">
              <pre className="no-scrollbar text-[11px] leading-relaxed text-emerald-300">
                {currentHint.codeSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Late-night encouragement */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5">
          <Moon className="h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
          <p className="text-[11px] text-amber-300">
            It&apos;s late. You&apos;ve got this.{' '}
            <Coffee className="inline h-3 w-3" /> Take a sip, re-read the hint,
            and trust the process.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {hintLevel > 0 && (
            <button
              onClick={() => setHintLevel((l) => l - 1)}
              className="pressable flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/40 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800/70"
            >
              Previous
            </button>
          )}
          {!isLastHint ? (
            <button
              onClick={() => setHintLevel((l) => l + 1)}
              className="pressable flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-all hover:bg-indigo-500"
            >
              <Sparkles className="h-4 w-4" />
              Next Hint
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="pressable flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-sm font-semibold text-white transition-all hover:bg-emerald-500"
            >
              <Bug className="h-4 w-4" />
              Got It — Back to Coding
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
