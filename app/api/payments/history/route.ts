import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payments = await prisma.paymentHistory.findMany({
    where: { userId: user.id as string },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ payments });
}
