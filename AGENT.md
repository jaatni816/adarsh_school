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

### [2026-08-22] — Aaj ke changes GitHub par push kiye
- `281d4e1` (AGENT.md GitHub-connect log) ko origin/fresh-main par push kiya — ab local aur remote fully synced.
- **Gotcha:** Push ke time Git LFS locking error aaya tha; fix: `git config lfs.<remote-url>/info/lfs.locksverify false` (repo-local set kar diya). Network flaky hai to push retry karna.
- Files changed: `AGENT.md`.

### [2026-08-22] — GitHub repo connect + push
- Remote `origin` = `https://github.com/jaatni816/adarsh_school.git` (pehle se set tha).
- Current branch `fresh-main` ko `origin/fresh-main` par push kiya + upstream tracking set.
- **Branch situation (dhyaan rakhna):** local `fresh-main` = GitHub `main` + 1 commit (`360bd72 agent`) — yahi active line of work hai. Local `main` branch purani/diverged history hai (43 commits alag, origin/main se mismatch) — use merge mat karna bina poochhe.
- GitHub default branch `main` hai; agar fresh-main ka kaam main me chahiye to PR ya fast-forward kar sakte hain.
- Network flaky tha (DNS `Could not resolve host: github.com` kabhi-kabhi aata hai) — push fail ho to retry karna.
- Files changed: koi code nahi, sirf git push.

### [2026-08-22] — Project bootstrap + AGENT.md creation
- Project ko fully explore/read kiya aur ye AGENT.md banayi.
- Current state: frontend (7 pages + chatbot), backend (chat/admission/contact routes), email integration (Resend), AI chatbot (Groq) — sab working.
- Files changed: `AGENT.md` (nayi).
- Git state: last commit `1913c97` (chatbot + admission form + Windows support); uncommitted: `pnpm-lock.yaml`.

### [2026-08-25] — Chatbot prompt fix
- **System prompt strict banaya:** Ab sirf utna hi batata hai jitna pucha jaye — extra info nahi deta.
- **Thinking tags fix kiye:** `<think>` tags ab properly remove hote hain reply se (frontend + backend dono).
- **Tokens kam kiye:** `max_tokens` 512 se 256 kiya — short answers aayenge.
- **Temperature kam kiya:** 0.7 se 0.5 — zyada precise answers aayenge.
- Files changed: `ChatBot.tsx`, `chat.ts`

<!-- NAYA TASK YAHAN SE UPAR ADD KARO (latest first) -->

### [2026-08-25] — Contact form working + Windows fix
- **Contact form wapas add kiya:** `Contact.tsx` mein full form add kiya — Name, Phone, Email, City, Subject, Message fields.
- **Test kiya:** Backend server start karke contact form aur admission form dono test kiye — dono successfully email bhej rahe hain (`RESEND_API_KEY` se).
- **Windows fix:** `api-server/package.json` mein `dev` script se `export NODE_ENV=development` hataya — Windows pe `export` kaam nahi karta.
- Files changed: `Contact.tsx`, `api-server/package.json`

### [2026-08-25] — Chatbot prompt strict rewrite
- **Welcome message chhota kiya:** "Hello! Kya jaanna chahte hain?" — purana welcome message bahut lamba tha.
- **Greeting rule add kiya:** "Hello/Hi" ka sirf greeting wapas do, school info mat do.
- **System prompt bilkul minimal banaya:** Ab sirf rules + compact data hai — zyada info nahi hai.
- **"Unsolicited" rule:** Kabhi bhi pura school description mat do bina puche.
- Files changed: `ChatBot.tsx`, `chat.ts`

### [2026-08-25] — Form backend fixes
- **PORT mismatch fix kiya:** `.env` me `PORT=5000` tha lekin Vite proxy `localhost:3001` ko target kar raha tha — proxy ko dynamic PORT se match karaya (`vite.config.ts`).
- **Contact form remove kiya:** `Contact.tsx` se form hataaya — ab sirf contact info cards + Google Map hai.
- **Admission form error handling fix kiya:** Pehle silently localStorage me save ho raha tha bina error dikhaye — ab proper error message dikhta hai jab backend kaam na kare.
- **`.env` clean kiya:** Duplicate `CONTACT_EMAIL` hataya, comments saaf kiye.
- Files changed: `vite.config.ts`, `Contact.tsx`, `Admissions.tsx`, `.env`
