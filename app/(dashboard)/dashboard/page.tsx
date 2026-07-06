import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import DashboardContent from '@/components/dashboard/dashboard-content';
import type { DocumentData } from '@/components/dashboard/document-card';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  const documents = await prisma.document.findMany({
    where: { ownerId: session.user.id as string },
    orderBy: { updatedAt: 'desc' },
  });

  const formattedDocuments: DocumentData[] = documents.map((doc) => ({
    id: doc.id,
    title: doc.title ?? 'Untitled Resume',
    template: doc.template ?? 'classic',
    updatedAt: doc.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    atsScore: doc.atsScore ?? 0,
    status: doc.status as 'complete' | 'draft',
    starred: doc.starred,
  }));

  return <DashboardContent documents={formattedDocuments} />;
}
