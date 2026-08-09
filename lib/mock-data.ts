export type Difficulty = "Easy" | "Medium" | "Hard";

export type DayStatus = "completed" | "missed" | "today" | "future";

export interface ChallengeDay {
  day: number;
  title: string;
  duration: string;
  difficulty: Difficulty;
  objective: string;
  instructions: string[];
  tags: string[];
  resources: { label: string; url: string }[];
  starterCode: string;
  linkedinTemplate: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  college: string;
  avatarInitials: string;
  streak: number;
  completedDays: number;
  totalDays: number;
  consistencyRank: string;
  joinedDate: string;
  githubUsername: string;
  streakFreezesAvailable: number;
  missedDays: number[];
  bio: string;
  skills: string[];
  verifiedProofs: number;
  totalCommits: number;
  linkedinPosts: number;
}

export const user: UserProfile = {
  name: "Rahul Sharma",
  handle: "@rahul_codes",
  college: "IIT Bombay, 3rd Year",
  avatarInitials: "RS",
  streak: 12,
  completedDays: 11,
  totalDays: 60,
  consistencyRank: "Top 8%",
  joinedDate: "Jan 2026",
  githubUsername: "rahul-sharma",
  streakFreezesAvailable: 2,
  missedDays: [4],
  bio: "Aspiring full-stack developer building consistency one commit at a time. Late-night hostel coder.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Python", "MongoDB"],
  verifiedProofs: 11,
  totalCommits: 47,
  linkedinPosts: 11,
};

export const platformStats = {
  activeStudents: "12,000+",
  completionRate: "73%",
  daysFree: "100%",
  companiesHired: "40+",
};

export const howItWorks = [
  {
    step: 1,
    title: "Get Your Daily Task",
    description:
      "Every day at 6 AM, a fresh coding challenge lands in your dashboard. Frontend, backend, DSA — we cover it all.",
    icon: "ClipboardList",
  },
  {
    step: 2,
    title: "Commit to GitHub",
    description:
      "Build the project, push your code, and share your repo link. Real commits, real progress, real proof.",
    icon: "Github",
  },
  {
    step: 3,
    title: "Post on LinkedIn",
    description:
      "Share what you learned with a quick LinkedIn post. Build your public portfolio and get noticed by recruiters.",
    icon: "Linkedin",
  },
];

export const testimonials = [
  {
    name: "Priya Nair",
    role: "Placed at Razorpay",
    quote:
      "The 60-day streak changed my life. I went from zero commits to a GitHub green wall and 3 job offers.",
    initials: "PN",
  },
  {
    name: "Arjun Reddy",
    role: "SDE Intern @ Zomato",
    quote:
      "Coding at 2 AM with 12K other students kept me accountable. Best decision of my college life.",
    initials: "AR",
  },
  {
    name: "Sneha Patel",
    role: "Frontend Dev @ Swiggy",
    quote:
      "The daily LinkedIn posts got me noticed. Recruiters started reaching out by Day 30.",
    initials: "SP",
  },
];

export const day12: ChallengeDay = {
  day: 12,
  title: "Build a Responsive Pricing Table",
  duration: "45 mins",
  difficulty: "Medium",
  objective:
    "Create a fully responsive pricing table component with three tiers (Starter, Pro, Enterprise), a monthly/yearly toggle, and a highlighted recommended plan. The table must work flawlessly on mobile, tablet, and desktop.",
  instructions: [
    "Set up a new project or use an existing one with Tailwind CSS.",
    "Create a pricing card component with plan name, price, features list, and a CTA button.",
    "Add a monthly/yearly billing toggle that updates all prices with a smooth transition.",
    "Highlight the 'Pro' plan with a distinct border and a 'Most Popular' badge.",
    "Make it fully responsive: cards stack vertically on mobile, sit side-by-side on desktop.",
    "Add hover states on cards — subtle scale and shadow lift.",
    "Push your code to GitHub with a meaningful commit message.",
  ],
  tags: ["Tailwind CSS", "Responsive Design", "Components", "UI/UX"],
  resources: [
    { label: "Tailwind Responsive Docs", url: "https://tailwindcss.com/docs/responsive-design" },
    { label: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
  ],
  starterCode: `// PricingTable.tsx
export function PricingTable() {
  const plans = [
    { name: "Starter", price: 0, features: [...] },
    { name: "Pro", price: 29, features: [...], popular: true },
    { name: "Enterprise", price: 99, features: [...] },
  ];
  // Your code here...
  return <div>{/* Build it */}</div>;
}`,
  linkedinTemplate: `🚀 Day 12 of the #ABTalks60 Challenge — DONE!

Today I built a fully responsive pricing table with a monthly/yearly billing toggle, three tiers, and a highlighted "Most Popular" plan.

Key takeaways:
✅ Mastered responsive layouts with Tailwind CSS
✅ Implemented smooth billing toggle transitions
✅ Practiced component-driven design thinking

Consistency is the only hack. 12 days down, 48 to go. 💪

🔗 GitHub: [paste your repo link]
🔗 Live Demo: [paste your demo link]

#ABTalks #60DaysOfCode #WebDevelopment #Frontend #CodingJourney #Consistency`,
};

export interface DayLogEntry {
  day: number;
  title: string;
  date: string;
  status: DayStatus;
  githubUrl?: string;
  linkedinUrl?: string;
  commitHash?: string;
  difficulty: Difficulty;
  duration: string;
}

export const completedDaysLog: DayLogEntry[] = [
  { day: 1, title: "Build a Landing Page Hero", date: "Jan 15", status: "completed", githubUrl: "github.com/rahul-sharma/landing-hero", linkedinUrl: "linkedin.com/posts/rahul_day1", commitHash: "a3f9c2e", difficulty: "Easy", duration: "30 mins" },
  { day: 2, title: "Create a Navbar Component", date: "Jan 16", status: "completed", githubUrl: "github.com/rahul-sharma/navbar-comp", linkedinUrl: "linkedin.com/posts/rahul_day2", commitHash: "b7e1d4a", difficulty: "Easy", duration: "25 mins" },
  { day: 3, title: "Fetch & Display API Data", date: "Jan 17", status: "completed", githubUrl: "github.com/rahul-sharma/api-fetch", linkedinUrl: "linkedin.com/posts/rahul_day3", commitHash: "c2a8f1b", difficulty: "Medium", duration: "40 mins" },
  { day: 4, title: "Build a Todo App", date: "Jan 18", status: "missed", difficulty: "Medium", duration: "45 mins" },
  { day: 5, title: "Implement Dark Mode Toggle", date: "Jan 19", status: "completed", githubUrl: "github.com/rahul-sharma/dark-mode", linkedinUrl: "linkedin.com/posts/rahul_day5", commitHash: "d5c3e9f", difficulty: "Easy", duration: "20 mins" },
  { day: 6, title: "Create a Form with Validation", date: "Jan 20", status: "completed", githubUrl: "github.com/rahul-sharma/form-validation", linkedinUrl: "linkedin.com/posts/rahul_day6", commitHash: "e8b2a7c", difficulty: "Medium", duration: "35 mins" },
  { day: 7, title: "Build an Accordion FAQ", date: "Jan 21", status: "completed", githubUrl: "github.com/rahul-sharma/accordion-faq", linkedinUrl: "linkedin.com/posts/rahul_day7", commitHash: "f1d6c3a", difficulty: "Easy", duration: "30 mins" },
  { day: 8, title: "Code a Modal Dialog", date: "Jan 22", status: "completed", githubUrl: "github.com/rahul-sharma/modal-dialog", linkedinUrl: "linkedin.com/posts/rahul_day8", commitHash: "a9e5b2d", difficulty: "Medium", duration: "40 mins" },
  { day: 9, title: "Build a Tab Navigation", date: "Jan 23", status: "completed", githubUrl: "github.com/rahul-sharma/tab-nav", linkedinUrl: "linkedin.com/posts/rahul_day9", commitHash: "b4f8c1e", difficulty: "Easy", duration: "25 mins" },
  { day: 10, title: "Create a Responsive Card Grid", date: "Jan 24", status: "completed", githubUrl: "github.com/rahul-sharma/card-grid", linkedinUrl: "linkedin.com/posts/rahul_day10", commitHash: "c7a3d6b", difficulty: "Medium", duration: "35 mins" },
  { day: 11, title: "Build a Search Bar with Filters", date: "Jan 25", status: "completed", githubUrl: "github.com/rahul-sharma/search-filters", linkedinUrl: "linkedin.com/posts/rahul_day11", commitHash: "d2e9f4c", difficulty: "Medium", duration: "45 mins" },
];

export interface StreakQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const streakQuiz: StreakQuizQuestion = {
  id: "day4-recovery",
  question: "In a Todo app, which CSS property creates the stacking context needed for a fixed-position modal overlay?",
  options: [
    "display: block",
    "z-index: 1 (alone, without position)",
    "position: relative on the parent + z-index on the overlay",
    "overflow: hidden",
  ],
  correctIndex: 2,
  explanation:
    "z-index only works on positioned elements (relative, absolute, fixed, sticky). A fixed overlay needs a positioned parent or its own z-index to stack correctly above content.",
};

export interface RecruiterView {
  recruiterName: string;
  recruiterCompany: string;
  recruiterRole: string;
  viewedAt: string;
  profilePicture: string;
}

export const recruiterNotifications: RecruiterView[] = [
  { recruiterName: "Anita Desai", recruiterCompany: "Razorpay", recruiterRole: "Senior Talent Recruiter", viewedAt: "2 hours ago", profilePicture: "AD" },
  { recruiterName: "Vikram Singh", recruiterCompany: "Zomato", recruiterRole: "Engineering Manager", viewedAt: "5 hours ago", profilePicture: "VS" },
  { recruiterName: "Neha Gupta", recruiterCompany: "Swiggy", recruiterRole: "Frontend Lead", viewedAt: "1 day ago", profilePicture: "NG" },
];

export interface CommitActivity {
  day: number;
  commits: number;
}

export const commitActivity: CommitActivity[] = [
  { day: 1, commits: 3 },
  { day: 2, commits: 2 },
  { day: 3, commits: 5 },
  { day: 5, commits: 4 },
  { day: 6, commits: 3 },
  { day: 7, commits: 2 },
  { day: 8, commits: 6 },
  { day: 9, commits: 3 },
  { day: 10, commits: 5 },
  { day: 11, commits: 7 },
];

export function getDayStatus(day: number): DayStatus {
  if (day <= 0 || day > 60) return "future";
  if (day === user.streak) return "today";
  if (user.missedDays.includes(day)) return "missed";
  if (day < user.streak) return "completed";
  return "future";
}

export function getDayData(day: number): ChallengeDay | undefined {
  if (day === 12) return day12;
  return undefined;
}

// ─── Leaderboard Data ─────────────────────────────────────────────

export type LeaderboardTab = "all-time" | "this-week" | "college-vs-college";

export interface LeaderboardStudent {
  rank: number;
  name: string;
  initials: string;
  college: string;
  collegeShort: string;
  streak: number;
  weeklyCommits: number;
  badges: string[];
  isCurrentUser?: boolean;
  avatarColor: string;
}

export const leaderboardAllTime: LeaderboardStudent[] = [
  { rank: 1, name: "Karthik Iyer", initials: "KI", college: "IIT Madras", collegeShort: "IIT-M", streak: 58, weeklyCommits: 12, badges: ["Consistency King", "Night Owl Coder"], avatarColor: "from-amber-500 to-orange-600" },
  { rank: 2, name: "Aditi Verma", initials: "AV", college: "IIT Delhi", collegeShort: "IIT-D", streak: 55, weeklyCommits: 10, badges: ["Streak Guardian", "GitHub Warrior"], avatarColor: "from-indigo-500 to-indigo-700" },
  { rank: 3, name: "Rohan Pillai", initials: "RP", college: "NIT Trichy", collegeShort: "NIT-T", streak: 52, weeklyCommits: 8, badges: ["Night Owl Coder", "LinkedIn Star"], avatarColor: "from-emerald-500 to-teal-600" },
  { rank: 4, name: "Sneha Patel", initials: "SP", college: "BITS Pilani", collegeShort: "BITS-P", streak: 49, weeklyCommits: 9, badges: ["Consistency King"], avatarColor: "from-rose-500 to-pink-600" },
  { rank: 5, name: "Vikram Reddy", initials: "VR", college: "IIT Bombay", collegeShort: "IIT-B", streak: 47, weeklyCommits: 7, badges: ["GitHub Warrior", "Night Owl Coder"], avatarColor: "from-sky-500 to-blue-600" },
  { rank: 6, name: "Ananya Singh", initials: "AS", college: "IIIT Hyderabad", collegeShort: "IIIT-H", streak: 44, weeklyCommits: 11, badges: ["LinkedIn Star"], avatarColor: "from-violet-500 to-purple-600" },
  { rank: 7, name: "Rahul Sharma", initials: "RS", college: "IIT Bombay", collegeShort: "IIT-B", streak: 12, weeklyCommits: 7, badges: ["Rising Streak"], avatarColor: "from-indigo-500 to-indigo-700", isCurrentUser: true },
  { rank: 8, name: "Deepak Yadav", initials: "DY", college: "NIT Warangal", collegeShort: "NIT-W", streak: 40, weeklyCommits: 6, badges: ["Streak Guardian"], avatarColor: "from-cyan-500 to-teal-600" },
  { rank: 9, name: "Ishita Jain", initials: "IJ", college: "VIT Vellore", collegeShort: "VIT-V", streak: 38, weeklyCommits: 5, badges: ["Night Owl Coder"], avatarColor: "from-fuchsia-500 to-pink-600" },
  { rank: 10, name: "Arjun Nair", initials: "AN", college: "DTU Delhi", collegeShort: "DTU", streak: 35, weeklyCommits: 8, badges: ["GitHub Warrior"], avatarColor: "from-orange-500 to-red-600" },
];

export const leaderboardThisWeek: LeaderboardStudent[] = [
  { rank: 1, name: "Ananya Singh", initials: "AS", college: "IIIT Hyderabad", collegeShort: "IIIT-H", streak: 44, weeklyCommits: 11, badges: ["This Week's MVP"], avatarColor: "from-violet-500 to-purple-600" },
  { rank: 2, name: "Karthik Iyer", initials: "KI", college: "IIT Madras", collegeShort: "IIT-M", streak: 58, weeklyCommits: 12, badges: ["Consistency King"], avatarColor: "from-amber-500 to-orange-600" },
  { rank: 3, name: "Aditi Verma", initials: "AV", college: "IIT Delhi", collegeShort: "IIT-D", streak: 55, weeklyCommits: 10, badges: ["Streak Guardian"], avatarColor: "from-indigo-500 to-indigo-700" },
  { rank: 4, name: "Sneha Patel", initials: "SP", college: "BITS Pilani", collegeShort: "BITS-P", streak: 49, weeklyCommits: 9, badges: ["LinkedIn Star"], avatarColor: "from-rose-500 to-pink-600" },
  { rank: 5, name: "Rahul Sharma", initials: "RS", college: "IIT Bombay", collegeShort: "IIT-B", streak: 12, weeklyCommits: 7, badges: ["Rising Streak"], avatarColor: "from-indigo-500 to-indigo-700", isCurrentUser: true },
  { rank: 6, name: "Rohan Pillai", initials: "RP", college: "NIT Trichy", collegeShort: "NIT-T", streak: 52, weeklyCommits: 8, badges: ["Night Owl Coder"], avatarColor: "from-emerald-500 to-teal-600" },
  { rank: 7, name: "Vikram Reddy", initials: "VR", college: "IIT Bombay", collegeShort: "IIT-B", streak: 47, weeklyCommits: 7, badges: ["GitHub Warrior"], avatarColor: "from-sky-500 to-blue-600" },
  { rank: 8, name: "Arjun Nair", initials: "AN", college: "DTU Delhi", collegeShort: "DTU", streak: 35, weeklyCommits: 8, badges: ["GitHub Warrior"], avatarColor: "from-orange-500 to-red-600" },
  { rank: 9, name: "Deepak Yadav", initials: "DY", college: "NIT Warangal", collegeShort: "NIT-W", streak: 40, weeklyCommits: 6, badges: ["Streak Guardian"], avatarColor: "from-cyan-500 to-teal-600" },
  { rank: 10, name: "Ishita Jain", initials: "IJ", college: "VIT Vellore", collegeShort: "VIT-V", streak: 38, weeklyCommits: 5, badges: ["Night Owl Coder"], avatarColor: "from-fuchsia-500 to-pink-600" },
];

export interface CollegeLeaderboardEntry {
  rank: number;
  college: string;
  collegeShort: string;
  totalStreakDays: number;
  activeStudents: number;
  avgConsistency: string;
  badge: string;
}

export const collegeLeaderboard: CollegeLeaderboardEntry[] = [
  { rank: 1, college: "IIT Madras", collegeShort: "IIT-M", totalStreakDays: 1240, activeStudents: 180, avgConsistency: "94%", badge: "Consistency Capital" },
  { rank: 2, college: "IIT Bombay", collegeShort: "IIT-B", totalStreakDays: 1180, activeStudents: 165, avgConsistency: "91%", badge: "Night Owl Hub" },
  { rank: 3, college: "IIT Delhi", collegeShort: "IIT-D", totalStreakDays: 1095, activeStudents: 150, avgConsistency: "89%", badge: "GitHub Fortress" },
  { rank: 4, college: "BITS Pilani", collegeShort: "BITS-P", totalStreakDays: 980, activeStudents: 140, avgConsistency: "87%", badge: "Streak Guardians" },
  { rank: 5, college: "NIT Trichy", collegeShort: "NIT-T", totalStreakDays: 870, activeStudents: 120, avgConsistency: "85%", badge: "Rising Powerhouse" },
  { rank: 6, college: "IIIT Hyderabad", collegeShort: "IIIT-H", totalStreakDays: 820, activeStudents: 95, avgConsistency: "88%", badge: "LinkedIn Stars" },
  { rank: 7, college: "NIT Warangal", collegeShort: "NIT-W", totalStreakDays: 740, activeStudents: 110, avgConsistency: "82%", badge: "Late Night Legends" },
  { rank: 8, college: "VIT Vellore", collegeShort: "VIT-V", totalStreakDays: 680, activeStudents: 130, avgConsistency: "79%", badge: "Consistency Climbers" },
];

// ─── Late-Night Coder Pulse Ticker ───────────────────────────────

export interface CoderPulseItem {
  name: string;
  initials: string;
  college: string;
  action: string;
  time: string;
  color: string;
}

export const coderPulseFeed: CoderPulseItem[] = [
  { name: "Karthik Iyer", initials: "KI", college: "IIT Madras", action: "just pushed a commit", time: "now", color: "from-amber-500 to-orange-600" },
  { name: "Aditi Verma", initials: "AV", college: "IIT Delhi", action: "verified Day 42 proof", time: "1m ago", color: "from-indigo-500 to-indigo-700" },
  { name: "Rohan Pillai", initials: "RP", college: "NIT Trichy", action: "posted on LinkedIn", time: "2m ago", color: "from-emerald-500 to-teal-600" },
  { name: "Sneha Patel", initials: "SP", college: "BITS Pilani", action: "hit a 49-day streak", time: "3m ago", color: "from-rose-500 to-pink-600" },
  { name: "Vikram Reddy", initials: "VR", college: "IIT Bombay", action: "merged a PR", time: "4m ago", color: "from-sky-500 to-blue-600" },
  { name: "Ananya Singh", initials: "AS", college: "IIIT Hyderabad", action: "unlocked Night Owl badge", time: "5m ago", color: "from-violet-500 to-purple-600" },
  { name: "Deepak Yadav", initials: "DY", college: "NIT Warangal", action: "just pushed a commit", time: "6m ago", color: "from-cyan-500 to-teal-600" },
  { name: "Ishita Jain", initials: "IJ", college: "VIT Vellore", action: "verified Day 38 proof", time: "7m ago", color: "from-fuchsia-500 to-pink-600" },
  { name: "Arjun Nair", initials: "AN", college: "DTU Delhi", action: "started Day 35 challenge", time: "8m ago", color: "from-orange-500 to-red-600" },
  { name: "Meera Krishnan", initials: "MK", college: "Anna University", action: "restored streak with Shield", time: "9m ago", color: "from-lime-500 to-green-600" },
];

// ─── AI Mentor Hints ─────────────────────────────────────────────

export interface AIMentorHint {
  level: number;
  title: string;
  type: "nudge" | "architectural" | "debug";
  content: string;
  codeSnippet?: string;
}

export const aiMentorHints: AIMentorHint[] = [
  {
    level: 1,
    title: "Gentle Nudge",
    type: "nudge",
    content: "Start by breaking the problem into smaller pieces. You need: (1) a data array for plans, (2) a billing toggle state, (3) a card component that maps over the data. Don't overthink it — just get the structure on screen first, then refine.",
  },
  {
    level: 2,
    title: "Architectural Hint",
    type: "architectural",
    content: "Use a single `billing` state (monthly/yearly) and multiply each plan's base price by 12 with a 20% discount for yearly. Store your plans in an array of objects — name, monthlyPrice, features[], and a `popular` boolean. Map over them to render cards.",
    codeSnippet: `const [yearly, setYearly] = useState(false);
const plans = [
  { name: "Starter", monthly: 0, features: [...] },
  { name: "Pro", monthly: 29, popular: true, features: [...] },
  { name: "Enterprise", monthly: 99, features: [...] },
];
const price = yearly ? plan.monthly * 12 * 0.8 : plan.monthly;`,
  },
  {
    level: 3,
    title: "Responsive Layout Tip",
    type: "architectural",
    content: "For the responsive grid: use Tailwind's `grid-cols-1` by default (mobile stacking), then `md:grid-cols-3` for desktop side-by-side. The 'Pro' card should have `md:scale-105` and a distinct border color to stand out as recommended.",
    codeSnippet: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {plans.map(plan => (
    <div className={plan.popular ? "md:scale-105 border-indigo-500" : ""}>
      {/* card content */}
    </div>
  ))}
</div>`,
  },
  {
    level: 4,
    title: "Toggle Transition Debug",
    type: "debug",
    content: "If your billing toggle feels janky, wrap the price in a `<span key={yearly}>` with a CSS transition. The key change forces React to re-mount the span, triggering a smooth fade animation. Also — it's 3 AM, drink water. Your brain debugs better hydrated.",
    codeSnippet: `<span key={yearly ? 'y' : 'm'} 
  className="transition-opacity duration-300">
  {price}
</span>`,
  },
];
