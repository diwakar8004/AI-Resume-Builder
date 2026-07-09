import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';

// Basic runtime env validation to give clearer errors in production
function ensureEnv(required: string[]) {
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length === 0) return;
  const msg = `Missing required environment variables: ${missing.join(', ')}`;
  if (process.env.NODE_ENV === 'production') {
    // fail fast in production so deploy logs show the issue
    throw new Error(msg);
  } else {
    // helpful dev-time warning
    console.warn('[env check]', msg);
  }
}

ensureEnv([
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
]);

// Google-only auth with Prisma adapter
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    ...(process.env.NODE_ENV !== 'production'
      ? [
          Credentials({
            id: 'credentials',
            name: 'Dev Account',
            credentials: {
              email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
              password: { label: 'Password', type: 'password', placeholder: 'password' },
            },
            async authorize(credentials) {
              if (!credentials?.email || typeof credentials.email !== 'string') return null;
              const email = credentials.email.toLowerCase();
              let user = await prisma.user.findUnique({ where: { email } });
              if (!user) {
                user = await prisma.user.create({
                  data: {
                    email,
                    name: email.split('@')[0],
                  },
                });
              }
              return user;
            },
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  debug: process.env.NODE_ENV !== 'production',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        const userPlan = (user as { plan?: string } | undefined)?.plan;
        token.plan = userPlan ?? token.plan ?? 'FREE';
        console.log('[JWT Callback] User signed in:', { id: user.id, email: user.email, plan: token.plan });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        try {
          const dbUser = await prisma.user.findUnique({ where: { id: token.id as string } });
          (session.user as { id?: string; plan?: string }).id = token.id as string;
          const planFromToken = typeof token.plan === 'string' ? token.plan : 'FREE';
          (session.user as { id?: string; plan?: string }).plan = dbUser?.plan ?? planFromToken;
          console.log('[Session Callback] Session created:', {
            userId: token.id,
            email: session.user.email,
            plan: (session.user as { plan?: string }).plan,
          });
        } catch (err) {
          // Don't throw — log and return the session as-is so UI doesn't crash on DB errors
          console.error('[Session Callback] Error fetching user from DB:', err);
          (session.user as { id?: string }).id = token.id as string;
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
    async signIn({ user, account }) {
      console.log('[SignIn Callback] User attempting sign in:', { email: user.email, provider: account?.provider });
      return true;
    },
  },
});
