# AGENT.md — Adarsh Sr. Sec. School Website

> ## ⚠️ SABSE ZAROORI RULES — HAR AGENT KE LIYE (PAHLA YEHI PADHO)
>
> 1. **Naye session me sabse pehle YE FILE padho.** Yahi file project ki poori current state batati hai.
> 2. **Jo bhi kaam/task karo, complete hone ke baad is file me update karo:**
>    - `📋 Task Log` section me nayi entry add karo (date + kya kiya + kaunse files badle).
>    - Agar koi naya package/route/env var/command add hua ho to uske relevant section (`Repo Map`, `API Routes`, `Env Vars`, `Commands`) ko bhi update karo.
> 3. **Kabhi ye file mat delete/overwrite karo** — sirf update/edit karo.
> 4. Is rule ko follow karna **mandatory** hai, taaki doosra agent ya future session sirf ye padhkar pura context samajh jaaye.

---

## 1. Project Overview

**Adarsh Senior Secondary School, Jakhouli** (Est. 1995, Kaithal, Haryana) ka official website.

- **School info:** BSEH affiliated, Class VI–XII, 1200+ students, 45+ teachers
- **Streams:** Science (PCM/PCB), Commerce, Arts
- **Phone:** +91 74041 20200 | **Email:** bangernargish@gmail.com
- **Address:** Jakhouli Kassan Road, Jakhouli, Kaithal, Haryana

### User-facing features (abhi tak bane hue)
- Pages: Home, About, Academics, Gallery, Faculty, Admissions, Contact + 404
- **AI ChatBot** ("Adarsh Assistant") — Groq API se chalta hai, Hinglish me school ke sawalon ke jawab deta hai, non-school questions politely refuse karta hai
- **Admission form** — submit hone par Resend se email jata hai CONTACT_EMAIL par
- **Contact form** — waise hi Resend email ke through

---

## 2. Tech Stack

| Layer      | Tech |
|------------|------|
| Monorepo   | pnpm workspaces (`artifacts/*`, `lib/*`, `scripts`) |
| Frontend   | React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui (Radix) + wouter (routing) + TanStack Query |
| Backend    | Express 5 (Node.js 24), esbuild bundle |
| Email      | Resend |
| AI Chat    | Groq SDK, model `qwen/qwen3.6-27b` |
| DB         | PostgreSQL + Drizzle ORM (**abhi schema khali hai — DB use nahi ho raha**) |
| Validation | Zod |
| Language   | TypeScript 5.9 |

**Note:** Ye project originally Replit par tha, ab Windows local machine par chal raha hai.

---

## 3. Repo Map (kahan kya hai)

```
├── artifacts/
│   ├── school-website/        # Frontend (@workspace/school-website)
│   │   └── src/
│   │       ├── App.tsx            # Routes + layout (Navbar/Footer/ChatBot)
│   │       ├── pages/             # Home, About, Academics, Admissions, Contact, Faculty, Gallery, not-found
│   │       ├── components/
│   │       │   ├── ChatBot.tsx    # AI chatbot widget (frontend se direct Groq call karta hai)
│   │       │   ├── layout/        # Navbar, Footer
│   │       │   └── ui/            # shadcn components
│   │       └── index.css          # Tailwind theme
│   ├── api-server/            # Backend (@workspace/api-server)
│   │   └── src/
│   │       ├── index.ts           # Entry — PORT env zaroori, root .env load karta hai
│   │       ├── app.ts             # Express app (cors, json, /api router)
│   │       └── routes/            # health.ts, chat.ts, admission.ts, contact.ts
│   └── mockup-sandbox/        # UI experiments/mockups ke liye alag Vite sandbox
├── lib/
│   ├── api-spec/              # OpenAPI spec + Orval codegen config
│   ├── api-client-react/      # Generated React hooks (codegen output) — abhi khali
│   ├── api-zod/               # Generated Zod schemas (codegen output) — abhi khali
│   └── db/                    # Drizzle ORM setup; src/schema/index.ts abhi khali
├── scripts/                   # Utility scripts (hello.ts placeholder)
├── attached_assets/generated_images/  # Generated images/assets
├── .env                       # Local secrets (git me nahi hai)
└── .env.example               # Required env vars ki list
```

---

## 4. Commands

Root se (pnpm installed hona chahiye):

```bash
# Frontend dev server (Vite, default port 5173, PORT env se override)
pnpm --filter @workspace/school-website run dev

# Backend dev server (build + start; PORT env ZAROORI, e.g. 3001)
pnpm --filter @workspace/api-server run dev

# Full typecheck (sab packages)
pnpm run typecheck

# Full build (typecheck + build all)
pnpm run build

# API hooks/schemas regenerate (OpenAPI spec change karne ke baad)
pnpm --filter @workspace/api-spec run codegen

# DB schema push (agar DB use karna ho; DATABASE_URL chahiye)
pnpm --filter @workspace/db run push
```

**Dev flow:** Backend ko `PORT=3001` par chalao — frontend ka Vite proxy `/api` requests ko `http://localhost:3001` par forward karta hai (dekho `school-website/vite.config.ts`).

---

## 5. Environment Variables (root `.env`)

| Var | Kaam |
|-----|------|
| `CONTACT_EMAIL` | Form submissions kis email par jaayein (`bangernargish@gmail.com`) |
| `RESEND_API_KEY` | Admission/contact emails bhejne ke liye (resend.com) |
| `GROQ_API_KEY` | Backend chatbot route ke liye |
| `VITE_GROQ_API_KEY` | ⚠️ Frontend ChatBot.tsx **directly** browser se Groq call karta hai, is liye ye VITE_ var chahiye (backend route `/api/chat` bhi exist karta hai) |
| `SESSION_SECRET` | Session secret (abhi unused, reserved) |
| `PORT` | Dono servers ke liye required (Vite reads it too) |
| `DATABASE_URL` | Sirf agar DB-backed routes use ho (Postgres) |

Emails `onboarding@resend.dev` from address se jaate hain (Resend free tier).

---

## 6. API Routes (base: `/api`)

| Method | Route | Kaam | Body |
|--------|-------|------|------|
| GET | `/api/healthz` | Health check | — |
| POST | `/api/chat` | Groq AI chatbot reply | `{ messages: [{role, content}] }` → `{ reply }` (last 10 messages context) |
| POST | `/api/admission` | Admission application → email | Required: `studentName, dob, mobile, classApplying, parentName`; optional: `email, village` |
| POST | `/api/contact` | Contact message → email | Required: `name, phone, subject, message`; optional: `email, city` |

OpenAPI source of truth: `lib/api-spec/openapi.yaml` (⚠️ abhi me sirf healthz documented hai — chat/admission/contact add karne pending).

---

## 7. Architecture Decisions / Gotchas

- **Windows support:** Git commit `1913c97` ne Windows compatibility fix ki thi. `pnpm-workspace.yaml` me bahut saare platform-specific optional deps disabled hain via overrides — dhyaan rakhna jab dependencies add karo.
- **Supply-chain protection:** `minimumReleaseAge: 1440` (1 din) set hai `pnpm-workspace.yaml` me — **ISE DISABLE MAT KARNA.** Naya package turant install karna ho to `minimumReleaseAgeExclude` me add karo.
- **ChatBot dual path:** Frontend ChatBot seedha Groq API call karta hai (`VITE_GROQ_API_KEY`) aur backend pe bhi `/api/chat` route hai. Future me isko backend-only karna better rahega (key browser-exposed nahi honi chahiye).
- **PORT required:** api-server bina `PORT` env ke crash ho jata hai.
- **DB abhi unused:** Drizzle setup ready hai lekin schema khali — forms email-based hain, database me kuch save nahi hota.
- React version pinned hai `19.1.0` (catalog) — expo compatibility reason se, change mat karna bina soche.
- Typecheck/build hamesha root `pnpm run typecheck` se verify karo kaam karne ke baad.

---

## 8. 📋 Task Log (har completed kaam yahan add karo)

_Format: `### [YYYY-MM-DD] — Task title` phir bullets: kya kiya, kaunsi files badli._

### [2026-08-22] — Project bootstrap + AGENT.md creation
- Project ko fully explore/read kiya aur ye AGENT.md banayi.
- Current state: frontend (7 pages + chatbot), backend (chat/admission/contact routes), email integration (Resend), AI chatbot (Groq) — sab working.
- Files changed: `AGENT.md` (nayi).
- Git state: last commit `1913c97` (chatbot + admission form + Windows support); uncommitted: `pnpm-lock.yaml`.

<!-- NAYA TASK YAHAN SE UPAR ADD KARO (latest first) -->
