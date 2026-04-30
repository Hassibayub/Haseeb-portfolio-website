# Deploy to Netlify — Step by Step

This guide covers building the Next.js app, deploying it to Netlify, and pointing `codewithhaseeb.com` to it.

---

## Prerequisites

- Node.js 20+ installed locally
- A [Netlify account](https://app.netlify.com/signup) (free tier is fine)
- Access to your domain registrar (wherever `codewithhaseeb.com` is registered)
- The repo pushed to GitHub (already done — `dev` branch)

---

## Step 1 — Install the Netlify adapter

Next.js on Netlify requires the official runtime package so SSR, API routes, and image optimisation work correctly.

```bash
cd codewithhaseeb
npm install @netlify/plugin-nextjs
```

---

## Step 2 — Add `netlify.toml`

Create this file at the root of `codewithhaseeb/`:

```toml
[build]
  command   = "npm run build"
  publish   = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This tells Netlify how to build the app and activates the Next.js plugin that handles SSR routes, API routes, and the image optimisation endpoint.

---

## Step 3 — Verify the build locally first

```bash
cd codewithhaseeb
npm install
npm run build
```

The build must complete with no errors before deploying. Fix any TypeScript or lint errors that appear. The `next.config.ts` already has `ignoreBuildErrors: true` for the WASM workaround, so type errors won't block the build — but runtime errors will.

---

## Step 4 — Push to GitHub

Make sure your latest changes are on the remote branch:

```bash
git push origin dev
```

Netlify will pull from this branch.

---

## Step 5 — Create a new Netlify site

1. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site → Import an existing project**.
2. Choose **GitHub** and authorise Netlify to access your repositories.
3. Select the `Haseeb portfolio website` repository.
4. Configure the build settings:

| Field | Value |
|---|---|
| Branch to deploy | `dev` |
| Base directory | `codewithhaseeb` |
| Build command | `npm run build` |
| Publish directory | `codewithhaseeb/.next` |

5. Click **Add environment variables** (before hitting Deploy — do this first).

---

## Step 6 — Add environment variables in Netlify

Go to **Site configuration → Environment variables → Add a variable** and add each of these:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-2EH689YWQK` |
| `NEXT_PUBLIC_CLARITY_ID` | *(leave blank or add your Clarity ID)* |
| `RESEND_API_KEY` | *(your Resend API key)* |
| `CONTACT_FORM_TO_EMAIL` | `miltech.haseeb@gmail.com` |
| `CONTACT_FORM_FROM_EMAIL` | `contact@codewithhaseeb.com` |
| `NEXT_PUBLIC_CALENDLY_URL` | `https://calendly.com/miltech-haseeb/do-30min` |

> Never commit `.env.local` to git. These must live only in Netlify's dashboard.

---

## Step 7 — Deploy

Click **Deploy site**. Netlify will:

1. Clone the repo
2. Run `npm install` inside `codewithhaseeb/`
3. Run `npm run build`
4. Package the `.next` output via the plugin
5. Publish to a random `*.netlify.app` URL (e.g. `amazing-turing-abc123.netlify.app`)

Wait for the build to go green. If it fails, check the **Deploy log** tab — the error will be printed there.

---

## Step 8 — Test on the Netlify URL

Before touching DNS, open the `*.netlify.app` URL and verify:

- [ ] Home page loads
- [ ] `/services`, `/work`, `/about`, `/contact`, `/resume`, `/blog` all load
- [ ] Contact form submits and you receive the email
- [ ] No console errors

---

## Step 9 — Add your custom domain

1. In your Netlify site dashboard, go to **Domain management → Add a domain**.
2. Enter `codewithhaseeb.com` and click **Verify**.
3. Also add `www.codewithhaseeb.com` — Netlify will redirect `www` to the apex automatically.

Netlify will show you the DNS records you need to set.

---

## Step 10 — Update DNS at your registrar

Log in to wherever `codewithhaseeb.com` is registered (Namecheap, GoDaddy, Cloudflare, etc.) and update the DNS records.

### Option A — Netlify DNS (recommended, easiest)

Change your domain's **nameservers** to Netlify's:

```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

Netlify then manages all DNS for you, and SSL is provisioned automatically.

### Option B — Keep your current DNS, add records manually

Add these records at your registrar:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `75.2.60.5` |
| `CNAME` | `www` | `<your-site-name>.netlify.app` |

> The `A` record IP (`75.2.60.5`) is Netlify's load balancer. Check the Netlify dashboard for the current recommended value — it may differ.

---

## Step 11 — Wait for DNS propagation

DNS changes can take 1 to 48 hours to propagate worldwide. Typically it is under 30 minutes.

You can check propagation at [dnschecker.org](https://dnschecker.org) — search for `codewithhaseeb.com` and look for your new records appearing globally.

---

## Step 12 — SSL certificate

Netlify provisions a free Let's Encrypt certificate automatically once DNS is confirmed. You will see **Certificate provisioned** in the **Domain management** panel.

If it does not auto-provision after an hour, click **Renew certificate** manually.

---

## Step 13 — Set up continuous deployment

From now on, every push to `dev` will trigger an automatic deploy on Netlify. No manual steps needed.

If you want production-only deploys:

1. Create a `main` branch and merge `dev` into it when you are ready to ship.
2. Change the **Branch to deploy** in Netlify from `dev` to `main`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails: `Cannot find module` | Run `npm install` locally, check `package.json` has all deps |
| Build fails: `WASM` error | The `--webpack` flag in `build` script handles this — confirm `next.config.ts` has no Turbopack config |
| API route `/api/contact` returns 500 | Check `RESEND_API_KEY` is set correctly in Netlify env vars |
| Domain shows Netlify default page | DNS has not propagated yet — wait and recheck |
| SSL shows "Not secure" | Certificate not yet provisioned — wait up to 1 hour after DNS confirms |
| `www` does not redirect | Add the `www` alias in Netlify domain management |

---

## Current hosting split (for reference)

| Asset | Current host | After this guide |
|---|---|---|
| Frontend (Next.js) | GitHub Pages (static `index.html`) | Netlify |
| Backend (mailer) | Heroku (`backend/index.js`) | Replaced by `/api/contact` route on Netlify via Resend |
| Domain | GitHub Pages CNAME | Netlify custom domain |

Once the Next.js site is live on Netlify and the contact form is confirmed working via Resend, the Heroku backend can be shut down.
