# AI-Usage Log: ABTalks Redesign

This document logs the iterative prompts used to build this project in Bolt.new.

## Phase 1: Initial Build & Architecture
**Prompt:**
Act as an elite frontend engineer and product designer specializing in mobile-first web applications. Build a complete, fully functional, multi-page web application redesign for "ABTalks" — a platform running a 60-day coding challenge for Indian college students.

### Technical & Design Requirements:
1. Tech Stack: Next.js (App Router) using Tailwind CSS.
2. Viewport Constraint: Designed mobile-first with a strict maximum width of 390px (simulated mobile app frame).
3. Design System: Modern, high-contrast dark theme (slate-950 background, indigo-600 primary accents).

### Required Route Map & Screens:
- / (Landing Page)
- /dashboard (Student Dashboard)
- /day/12 (Challenge Day Workspace)

## Phase 2: Gamification & Prize-Winning Features
**Prompt:**
Act as a world-class product designer and senior frontend engineer. Take our current ABTalks Redesign web app and elevate it into a grand-prize winning entry for the Vicodathon hackathon. 

Inject the following breakthrough features:
1. Interactive 60-Day Contribution Heatmap on /dashboard.
2. Streak Shield / Freeze Mechanics for missed days.
3. Celebratory Submission Confetti on /day/12.
4. Recruiter Visibility Mode toggle.
5. High-end glassmorphism and smooth skeleton loading states.

## Phase 3: Final Polish & Rule Compliance
**Prompt:**
Act as a world-class frontend engineer and hackathon strategist. Take our existing ABTalks mobile-first web app and upgrade it while strictly respecting these core rules:
1. STRICT ROUTE MAP: Maintain /, /dashboard, and /day/12.
2. IN-PAGE ENHANCEMENTS: Add a "Campus Leaderboard" and "Recruiter View" as tabs within the existing routes.
3. WORKSPACE UPGRADE: Add an interactive "AI Mentor Hint Drawer" on /day/12.
4. Ensure the 390px mobile viewport frame is perfectly centered with zero layout bugs.
