import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/documents — list all documents for the authenticated user
export async function GET(_req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const docs = await prisma.document.findMany({
    where: { ownerId: user.id as string },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ documents: docs });
}

// POST /api/documents — create a new document for authenticated user
export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const doc = await prisma.document.create({
      data: {
        title: body.title || 'Untitled Resume',
        template: body.template || 'classic',
        atsScore: body.atsScore ?? 0,
        status: body.status ?? 'draft',
        starred: body.starred ?? false,
        resumeData: body.resumeData ?? null,
        ownerId: user.id as string,
      },
    });

    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (err) {
    console.error('Create document error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
