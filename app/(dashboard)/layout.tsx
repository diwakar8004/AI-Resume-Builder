import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div
      className="flex min-h-screen flex-col md:flex-row"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      <DashboardSidebar />
      <main className="flex-1 overflow-auto w-full">
        {children}
      </main>
    </div>
  );
}
