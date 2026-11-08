# GrowthPilot AI

GrowthPilot AI is a web-first business growth intelligence and executive productivity SaaS starter. It combines business onboarding, AI-generated daily quests, task management and a contextual AI advisor in a premium dark executive interface.

> This repository is a functional MVP foundation, not a finished commercial platform. Live market research, verified event/grant discovery, team invitations and push/WhatsApp notifications are intentionally not represented as complete features. Connect and test those integrations before using them with customers.

## Technology

- Next.js App Router, React and TypeScript
- PostgreSQL + Prisma ORM
- Password hashing with bcryptjs
- Signed, HTTP-only JWT session cookie using `jose`
- OpenAI API for AI quest generation and business advice
- Tailwind CSS v4

## Included

- Public marketing landing page
- Registration, login and logout
- Business onboarding and profile editing
- Tenant-scoped business data
- Executive dashboard
- AI-generated daily quests (fallback quests work without an API key)
- Quest status updates
- Task creation and completion
- Contextual AI business advisor
- Opportunity data model and empty-state UI
- Secured daily quest cron endpoint
- Prisma schema and deployment notes

## Requirements

- Node.js 20.9 or later
- PostgreSQL 14+
- npm
- OpenAI API key for live AI generation (optional; fallback quest generation works without it)

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/growthpilot-ai.git
   cd growthpilot-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create your environment file:

   ```bash
   cp .env.example .env
   ```

4. Create a PostgreSQL database and set `DATABASE_URL` in `.env`.

5. Set `AUTH_SECRET` to a cryptographically random secret of at least 32 characters. Example generation:

   ```bash
   openssl rand -base64 48
   ```

6. Optional: add `OPENAI_API_KEY` and set `OPENAI_MODEL` if required.

7. Create the database schema:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

8. Start the development server:

   ```bash
   npm run dev
   ```

9. Open http://localhost:3000, create an account and complete business onboarding.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | Secret for signing sessions; use 32+ random characters |
| `OPENAI_API_KEY` | No | Enables OpenAI-backed quest generation and advisor |
| `OPENAI_MODEL` | No | Defaults to `gpt-4.1-mini` |
| `NEXT_PUBLIC_APP_URL` | No | Canonical public application URL |
| `CRON_SECRET` | For cron | Bearer token protecting daily quest generation |

Never expose `OPENAI_API_KEY`, `AUTH_SECRET`, `DATABASE_URL` or `CRON_SECRET` through a `NEXT_PUBLIC_` variable or client-side code.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Provision a managed PostgreSQL database (for example, Neon, Supabase or another PostgreSQL provider).
4. Add `DATABASE_URL`, `AUTH_SECRET`, `OPENAI_API_KEY` (optional), `OPENAI_MODEL`, `NEXT_PUBLIC_APP_URL` and `CRON_SECRET` to Vercel project environment variables.
5. Ensure the production build runs Prisma Client generation. The `build` script already runs `prisma generate`.
6. Apply migrations against production before directing users to the site:

   ```bash
   npx prisma migrate deploy
   ```

7. Deploy and test registration, login, onboarding, quest generation and task updates.

For production, use a pooled database URL for application traffic if your provider recommends it, and a direct connection URL for migrations when required by that provider. Configure both according to the database provider's current Prisma instructions.

## Daily quest scheduler

The secured endpoint is:

`POST /api/cron/daily-quests`

Send this header:

`Authorization: Bearer YOUR_CRON_SECRET`

Example:

```bash
curl -X POST https://YOUR_DOMAIN/api/cron/daily-quests \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Configure a trusted scheduler (Vercel Cron, GitHub Actions or an external scheduler) to call this endpoint once per day. Add monitoring and retries before relying on it operationally. The current endpoint skips a business if it already has quests created since the start of the server's local day; production deployments should refine this to use each business's configured timezone.

## API overview

All authenticated routes require the `gp_session` HTTP-only cookie.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account and session |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/auth/me` | Current user |
| GET/POST/PATCH | `/api/business` | Read/create/update business profile |
| POST | `/api/quests/generate` | Generate personalised quests |
| PATCH | `/api/quests/:id` | Update quest status |
| GET/POST | `/api/tasks` | List/create tasks |
| PATCH | `/api/tasks/:id` | Update task |
| POST | `/api/advisor` | Ask the AI business advisor |
| POST | `/api/cron/daily-quests` | Protected scheduled quest generation |

## GitHub workflow

Suggested first push:

```bash
git init
git add .
git commit -m "Initial GrowthPilot AI web MVP"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/growthpilot-ai.git
git push -u origin main
```

Do not commit `.env` or any production secrets. `.gitignore` excludes environment files.

## Production hardening checklist

Before a public commercial launch:

- Add email verification, password reset and account recovery.
- Add rate limiting to authentication, advisor and AI-generation endpoints.
- Add CSRF/origin protections appropriate to the chosen deployment and cookie strategy.
- Add request logging, error monitoring, database backups and restore tests.
- Add pagination and API quotas.
- Add tenant-scoped team membership, roles and permission tests before multi-user organisations.
- Add a real research provider, source credibility checks, timestamps, deduplication and source links before showing current events, grants, competitor developments or market claims.
- Add notification delivery providers and user consent/preferences.
- Add subscription billing, webhook signature validation and entitlement checks.
- Add privacy policy, terms, data retention/deletion workflows and compliance review for applicable data-protection laws.
- Conduct independent security review and automated tests.

## Product boundaries

The AI advisor and quest generator are decision-support tools. They must not claim to have conducted live market research unless a connected research service has actually retrieved and verified sources. Human review remains necessary for financial, legal, regulatory and other consequential decisions.
