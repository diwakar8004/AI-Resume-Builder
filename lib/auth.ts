import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
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
        console.log('[JWT Callback] User signed in:', { id: user.id, email: user.email });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
        console.log('[Session Callback] Session created:', { userId: token.id, email: session.user.email });
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      console.log('[SignIn Callback] User attempting sign in:', { email: user.email, provider: account?.provider });
      return true;
    },
  },
});
