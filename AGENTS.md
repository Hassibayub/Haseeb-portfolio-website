# AGENTS.md

## Repo in one sentence
Static HTML/CSS/JS portfolio (`index.html`) + tiny Express mailer backend (`backend/index.js`). A full Next.js 15 rebuild is **planned but not started** — all specs live in `REBUILD/`.

---

## Current stack (what is actually built)
- **Frontend:** single `index.html` — no framework, no bundler, no build step
- **Backend:** `backend/index.js` — Express 4 + Nodemailer, one route: `POST /send-mail`
- **JS libs loaded via CDN/local files:** jQuery, Bootstrap 5, Swiper, Isotope, Magnific Popup, jVectorMap, Typed.js, circleProgress
- **No TypeScript, no tests, no linter, no CI**

---

## Developer commands

```bash
# Start the backend mailer server (port 5000)
npm start          # runs: node backend/index.js
```

There is no `dev`, `build`, `test`, or `lint` script. To view the frontend, open `index.html` directly in a browser or serve it with any static file server.

---

## Environment variables

Backend reads from `backend/.env`:
```
PORT=5000
SMTP_EMAIL="miltech.haseeb@gmail.com"
SMTP_PASS="<gmail-app-password>"
```

> **Note:** `backend/.env` is committed to the repo (`.gitignore` lists `.env` at root but not in `backend/`). Do not print or expose these credentials.

---

## Architecture notes

| Path | Role |
|---|---|
| `index.html` | Entire frontend — all sections inline (About, Portfolio, Experience, Skills, Testimonials, Contact) |
| `assets/js/custom.js` | All frontend JS logic — jQuery-based, wires up sliders, scroll nav, Isotope gallery, animations |
| `backend/index.js` | Express server — sole purpose is to relay contact form submissions via Gmail SMTP |
| `REBUILD/` | Planning docs only — 5 markdown files (~6k lines) specifying the Next.js rebuild; no code exists yet |

Single-page layout: sidebar nav uses `data-number` attributes; `custom.js` handles smooth-scrolling between sections. No routes.

---

## Planned rebuild (not yet started)

All rebuild planning is in `REBUILD/`:
- `01-BUILD-SPEC.md` — full Next.js 15 + Tailwind 4 + shadcn/ui + MagicUI spec
- `02-CASE-STUDIES.md` — MDX copy for 8 client case studies
- `03-COMPONENTS-CODE.md` — ready-to-paste TSX component code
- `04A-ASSETS-NEEDED.md` — image/asset requirements
- `05-SEO-PERFORMANCE-PATCH.md` — SEO + motion patches on top of `03`

Target stack: Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind 4 · shadcn/ui · Framer Motion · Resend · Vercel

When starting the rebuild, create a new Next.js app **outside** this directory or in a subdirectory — do not place Next.js files alongside the existing static site.

Required `.env.local` for the rebuild:
```
NEXT_PUBLIC_GA_ID=G-2EH689YWQK
NEXT_PUBLIC_CLARITY_ID=
RESEND_API_KEY=
CONTACT_FORM_TO_EMAIL=miltech.haseeb@gmail.com
CONTACT_FORM_FROM_EMAIL=contact@codewithhaseeb.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/miltech-haseeb/30min
```

---

## Hosting (current)
- **Frontend:** GitHub Pages — custom domain via `CNAME` (`codewithhaseeb.com`)
- **Backend:** Heroku — `Procfile` runs `npm start`
- These are deployed independently; the frontend calls the Heroku backend URL for the contact form.

---

## Lockfile
`package-lock.json` is gitignored and not committed. Run `npm install` before `npm start` on a fresh clone.

## Task Done log 
everytime you complete a task you need to log it into task_done.log with human readable [time/date] and Short concise message of whats completed
