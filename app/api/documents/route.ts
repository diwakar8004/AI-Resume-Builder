import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const createDocumentSchema = z.object({
  title: z.string().max(200).optional().default('Untitled Resume'),
  template: z.string().max(50).optional().default('classic'),
  atsScore: z.number().int().min(0).max(100).optional().default(0),
  status: z.string().max(50).optional().default('draft'),
  starred: z.boolean().optional().default(false),
  resumeData: z.any().optional().nullable(),
});

// GET /api/documents — list all documents for the authenticated user
export async function GET() {
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
    const body = createDocumentSchema.parse(await req.json());
    const doc = await prisma.document.create({
      data: {
        title: body.title,
        template: body.template,
        atsScore: body.atsScore,
        status: body.status,
        starred: body.starred,
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
