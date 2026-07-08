'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  const { update } = useSession();
  const [paymentId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('paymentId');
  });
  const router = useRouter();

  useEffect(() => {
    if (update) {
      update();
    }
  }, [update]);

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-[0_40px_90px_rgba(0,0,0,0.25)]">
        <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">Payment complete</p>
        <h1 className="mt-4 text-4xl font-black text-white">You are now a Pro member</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          Your payment was successfully verified. You can now access premium templates and AI features.
        </p>
        {paymentId ? (
          <p className="mt-6 text-sm text-white/70">Payment ID: <span className="font-semibold text-white">{paymentId}</span></p>
        ) : null}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={() => router.push('/dashboard')} className="w-full sm:w-auto">
            Go to dashboard
          </Button>
          <Button variant="secondary" onClick={() => router.push('/dashboard/settings')} className="w-full sm:w-auto">
            View subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
