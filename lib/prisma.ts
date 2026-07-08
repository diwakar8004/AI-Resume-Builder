import { PrismaClient } from '../node_modules/.prisma/client/index';

function validateDatabaseUrl(url: string | undefined): string {
  if (!url) {
    throw new Error(
      'Missing DATABASE_URL. Set a production database connection string in your Vercel environment variables.'
    );
  }

  const normalized = url.toLowerCase();
  if (
    process.env.NODE_ENV === 'production' &&
    (normalized.includes('localhost') || normalized.includes('127.0.0.1'))
  ) {
    throw new Error(
      'DATABASE_URL in production must not point to localhost. Use a cloud-accessible PostgreSQL database connection string for Vercel.'
    );
  }

  return url;
}

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  datasources: { db: { url: validateDatabaseUrl(process.env.DATABASE_URL) } },
});
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
