# Deployment & Auth Troubleshooting

This document lists steps to ensure authentication works after deploying to Vercel.

Required environment variables (set these in Vercel Project Settings -> Environment Variables):

- `DATABASE_URL` — production Postgres connection (must not point to `localhost`)
- `NEXTAUTH_URL` — e.g. `https://your-vercel-app.vercel.app`
- `NEXTAUTH_SECRET` — secure random string (recommend `openssl rand -hex 32`)
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `RESEND_API_KEY` (if used)
- `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_APP_NAME`

Google OAuth setup (Google Cloud Console):

1. In the OAuth 2.0 Client credentials, ensure the **Authorized redirect URIs** include:

   - `https://your-vercel-app.vercel.app/api/auth/callback/google`

   Replace `your-vercel-app.vercel.app` with your Vercel domain (e.g. `buildresumewithai.vercel.app`).

2. Optionally add **Authorized JavaScript origins**:

   - `https://your-vercel-app.vercel.app`

Vercel notes:

- After adding environment variables in the Vercel dashboard, trigger a new deployment so the vars are available to the build/runtime.
- Make sure `NEXTAUTH_URL` matches the public URL (including `https://`).
- Set `NEXTAUTH_SECRET` to a long random value — NextAuth uses this for session signing.
- Ensure your production database has the Prisma schema applied before authentication is used. Run:

```bash
npm run prisma:deploy
```

  If you prefer not to run migrations during the Vercel build, keep `prisma migrate deploy` out of `build` and deploy schema changes separately.

Local testing tips:

```bash
# generate a secret
openssl rand -hex 32

# copy .env.example to .env.local and fill values
cp .env.example .env.local
```

Common causes for auth failures after deploy:

- Missing or incorrect `NEXTAUTH_URL` (must be the deployed HTTPS URL).
- `GOOGLE_CLIENT_SECRET` not set on Vercel or mismatched client config in Google Cloud Console.
- Forgetting to add the redirect URI to Google OAuth settings.
- Using a local-only `DATABASE_URL` on localhost — your production app needs an accessible DB.

If you'd like, I can:

- Add a simple Vercel environment checklist PR.
- Generate a suggested `NEXTAUTH_SECRET` and add instructions to set it in Vercel.
