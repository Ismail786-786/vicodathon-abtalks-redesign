'use client';

import { useState } from 'react';
import { Shield, X, Brain, PenLine, Check, RefreshCw, Sparkles } from 'lucide-react';
import { streakQuiz } from '@/lib/mock-data';

type RecoveryMode = 'idle' | 'quiz' | 'reflection' | 'recovered';

export function StreakShield() {
  const [mode, setMode] = useState<RecoveryMode>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [reflection, setReflection] = useState('');

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === streakQuiz.correctIndex) {
      setTimeout(() => setMode('recovered'), 1500);
    }
  };

  const handleQuizRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleReflectionSubmit = () => {
    if (reflection.trim().length < 20) return;
    setMode('recovered');
  };

  if (mode === 'recovered') {
    return (
      <div className="animate-bounce-in rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-slate-900 to-slate-900 p-5 text-center">
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse-ring" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-7 w-7 text-white" />
          </div>
        </div>
        <h3 className="mt-3 text-base font-bold text-white">Day 4 Recovered!</h3>
        <p className="mt-1.5 text-xs text-slate-400">
          Your streak is safe. The missed day has been restored with a Streak
          Freeze. Keep going!
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-300">
            1 Streak Freeze used · 1 remaining
          </span>
        </div>
      </div>
    );
  }

  if (mode === 'quiz') {
    return (
      <div className="animate-flip-in rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20">
              <Brain className="h-4 w-4 text-indigo-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Recovery Quiz</h3>
          </div>
          <button
            onClick={() => setMode('idle')}
            className="pressable rounded-lg p-1 text-slate-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
          {streakQuiz.question}
        </p>

        <div className="mt-3 space-y-2">
          {streakQuiz.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = i === streakQuiz.correctIndex;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={i}
                onClick={() => !showResult && setSelectedAnswer(i)}
                disabled={showResult}
                className={`pressable flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13px] transition-all ${
                  showCorrect
                    ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                    : showWrong
                    ? 'border-red-500/50 bg-red-500/15 text-red-300'
                    : isSelected
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                    : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    showCorrect
                      ? 'bg-emerald-500 text-white'
                      : showWrong
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {showCorrect ? (
                    <Check className="h-3 w-3" />
                  ) : showWrong ? (
                    <X className="h-3 w-3" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {showResult && selectedAnswer !== streakQuiz.correctIndex && (
          <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-xs text-red-300">
              Not quite. {streakQuiz.explanation}
            </p>
            <button
              onClick={handleQuizRetry}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <RefreshCw className="h-3 w-3" />
              Try again
            </button>
          </div>
        )}

        {!showResult && (
          <button
            onClick={handleQuizSubmit}
            disabled={selectedAnswer === null}
            className="pressable mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
          >
            Submit Answer
          </button>
        )}
      </div>
    );
  }

  if (mode === 'reflection') {
    return (
      <div className="animate-flip-in rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/20">
              <PenLine className="h-4 w-4 text-indigo-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Reflection Note</h3>
          </div>
          <button
            onClick={() => setMode('idle')}
            className="pressable rounded-lg p-1 text-slate-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Write a short reflection on what you learned (or what blocked you) on
          Day 4. Minimum 20 characters.
        </p>

        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={4}
          placeholder="I missed Day 4 because... but I learned that..."
          className="mt-3 w-full resize-none rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-[13px] text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-slate-600">
            {reflection.length}/20 min
          </span>
          <button
            onClick={handleReflectionSubmit}
            disabled={reflection.trim().length < 20}
            className="pressable flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 disabled:opacity-50"
          >
            Submit & Recover
          </button>
        </div>
      </div>
    );
  }

  // Idle state — the compassionate banner
  return (
    <div className="animate-fade-in-up rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-900 p-4">
      <div className="flex items-start gap-3">
        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/20">
          <Shield className="h-5 w-5 text-indigo-400" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-slate-950">
            2
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white">
            Streak Shield Active
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
            You missed <span className="font-semibold text-red-400">Day 4</span>.
            No worries — life happens. Recover it with a quick quiz or
            reflection to keep your streak intact.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setMode('quiz')}
          className="pressable flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl border border-indigo-500/30 bg-indigo-600/10 text-white transition-all hover:bg-indigo-600/20"
        >
          <Brain className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold">Quick Quiz</span>
        </button>
        <button
          onClick={() => setMode('reflection')}
          className="pressable flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl border border-slate-700 bg-slate-800/40 text-white transition-all hover:bg-slate-800/70"
        >
          <PenLine className="h-4 w-4 text-slate-300" />
          <span className="text-xs font-semibold">Reflection</span>
        </button>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-500">
        <Sparkles className="h-3 w-3 text-indigo-500" />
        2 Streak Freezes available · No penalty, ever.
      </p>
    </div>
  );
}
