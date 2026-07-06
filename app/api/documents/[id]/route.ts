import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const updateDocumentSchema = z.object({
  title: z.string().max(200).optional(),
  template: z.string().max(50).optional(),
  atsScore: z.number().int().min(0).max(100).optional(),
  status: z.string().max(50).optional(),
  starred: z.boolean().optional(),
  resumeData: z.any().optional(),
});
type UpdateDocumentData = z.infer<typeof updateDocumentSchema>;

// GET /api/documents/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const doc = await prisma.document.findUnique({ where: { id } });
  if (!doc || doc.ownerId !== (user.id as string)) return NextResponse.json({ error: 'Document not found or access denied' }, { status: 404 });
  return NextResponse.json({ document: doc });
}

// PUT /api/documents/[id] — full update
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = updateDocumentSchema.parse(await req.json());
    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== (user.id as string)) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

    const updated = await prisma.document.update({
      where: { id },
      data: {
        title: body.title,
        template: body.template,
        atsScore: body.atsScore,
        status: body.status,
        starred: body.starred,
        resumeData: body.resumeData ?? existing.resumeData,
      },
    });
    return NextResponse.json({ document: updated });
  } catch (err) {
    console.error('Update document error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/documents/[id] — partial update
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = updateDocumentSchema.parse(await req.json());
    const existing = await prisma.document.findUnique({ where: { id } });
    if (!existing || existing.ownerId !== (user.id as string)) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

    const data: Partial<UpdateDocumentData> = { ...body };
    if (body.resumeData !== undefined) data.resumeData = body.resumeData;
    const updated = await prisma.document.update({ where: { id }, data });
    return NextResponse.json({ document: updated });
  } catch (err) {
    console.error('Patch document error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/documents/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await prisma.document.findUnique({ where: { id } });
  if (!existing || existing.ownerId !== (user.id as string)) return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  await prisma.document.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
