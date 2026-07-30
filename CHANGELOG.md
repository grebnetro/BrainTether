# Changelog

| Date | Version | Summary | Details |
| :--- | :--- | :--- | :--- |
| 2026-07-30 | 🧠v0.3.0 | Add onboarding wizard, Google auth, clean board & About tab | Added 3-step New User Onboarding Wizard with profile & avatar setup prompt, interactive ADHD instruction sheet tutorial, clean account initialization for new users, Google OAuth sign-in/sign-up support, and an About & Features guide tab in the main sidebar. |
| 2026-07-30 | 🧠v0.2.1 | Enforce mandatory authentication route middleware | Created NextAuth middleware (middleware.ts) protecting /dashboard and /profile routes. Unauthenticated visitors are automatically redirected to /auth/signin. |
| 2026-07-30 | 🧠v0.2.0 | Add public landing page, auth, profile & Vercel deploy | Added high-converting public ADHD marketing landing page (/), NextAuth.js authentication (sign in/sign up/session provider), user profile settings page (/profile) with ADHD preferences, and Vercel cloud deployment setup. Vercel deployment descriptions prefixed with 🧠v0.x.x. |
| 2026-07-30 | 🧠v0.1.0 | Initial versioning setup & core BrainTether platform | Established version.json as source of truth, created root CHANGELOG.md, and wired live version display into the Sidebar and Header UI for BrainTether ADHD Productivity Platform. |
