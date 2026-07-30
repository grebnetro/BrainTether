# Project Rules for BrainTether

## Vercel Deployment & Versioning Convention
- All git commit messages and Vercel deployment descriptions **MUST** start with `🧠v0.x.x:` followed by the summary.
- Format: `🧠v<version>: <summary>` (e.g. `🧠v0.2.0: Add public landing page, authentication, user profile, and Vercel deployment setup`).
- Version source of truth is `version.json` (`STAGE.MAJOR.MINOR`).
- `CHANGELOG.md` table must maintain newest entries on top.
