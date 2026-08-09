import Link from 'next/link';
import {
  Flame,
  Github,
  Linkedin,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Trophy,
  Zap,
  Moon,
} from 'lucide-react';
import { platformStats, howItWorks, testimonials } from '@/lib/mock-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ClipboardList,
  Github,
  Linkedin,
};

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-5 pb-8 pt-6">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
              <span className="text-sm font-black text-white">AB</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">ABTalks</span>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            100% Free
          </span>
        </div>

        <div className="animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
            <Moon className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-300">
              Built for late-night coders
            </span>
          </div>

          <h1 className="text-balance text-[2rem] font-extrabold leading-[1.15] tracking-tight text-white">
            Code for 60 Days.
            <br />
            Build Consistency.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
            The daily coding challenge for Indian college students. Build real
            projects, grow your GitHub streak, and get noticed by recruiters —
            one commit at a time.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 animate-fade-in-up delay-200">
          <Link
            href="/dashboard"
            className="group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-[15px] font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98]"
          >
            Start Day 1 Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-2.5 text-center text-xs text-slate-500">
            No credit card. No signup. Just start coding.
          </p>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="px-5 pb-8">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Users className="h-4 w-4 text-indigo-400" />}
            value={platformStats.activeStudents}
            label="Active Students"
          />
          <StatCard
            icon={<Trophy className="h-4 w-4 text-amber-400" />}
            value={platformStats.completionRate}
            label="Completion Rate"
          />
          <StatCard
            icon={<Zap className="h-4 w-4 text-emerald-400" />}
            value="60 Days"
            label="Daily Challenges"
          />
          <StatCard
            icon={<Star className="h-4 w-4 text-indigo-400" />}
            value={platformStats.companiesHired}
            label="Hiring Partners"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 pb-8">
        <h2 className="mb-1 text-xl font-bold text-white">How It Works</h2>
        <p className="mb-5 text-sm text-slate-400">
          Three simple steps, every single day.
        </p>

        <div className="space-y-3">
          {howItWorks.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <div
                key={step.step}
                className="animate-fade-in-up rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-3.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/15">
                    <Icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-indigo-400">
                        STEP {step.step}
                      </span>
                    </div>
                    <h3 className="mt-0.5 text-[15px] font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Flow visual */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
          <FlowPill icon={<ClipboardList className="h-3.5 w-3.5" />} label="Daily Task" />
          <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
          <FlowPill icon={<Github className="h-3.5 w-3.5" />} label="GitHub Commit" />
          <ArrowRight className="h-3.5 w-3.5 text-slate-600" />
          <FlowPill icon={<Linkedin className="h-3.5 w-3.5" />} label="LinkedIn Proof" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 pb-8">
        <h2 className="mb-1 text-xl font-bold text-white">Students Are Winning</h2>
        <p className="mb-5 text-sm text-slate-400">Real results from real coders.</p>

        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="animate-fade-in-up rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-xs font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-emerald-400">{t.role}</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-10 pt-2">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900 to-slate-900 p-6 text-center">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-600/20 blur-2xl" />
          <Flame className="mx-auto h-8 w-8 text-amber-400 animate-flame" />
          <h2 className="mt-3 text-xl font-bold text-white">
            Your streak starts tonight.
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Join 12,000+ students who chose consistency over motivation.
          </p>
          <Link
            href="/dashboard"
            className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-white text-[15px] font-semibold text-slate-950 transition-all hover:bg-slate-100 active:scale-[0.98]"
          >
            Start Day 1 Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Free forever
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> No signup
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5">
      <div className="mb-2">{icon}</div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function FlowPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-1.5">
      <span className="text-slate-300">{icon}</span>
      <span className="text-[11px] font-medium text-slate-300">{label}</span>
    </div>
  );
}
