'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function PaymentFailedPage() {
  const [reason] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('reason');
  });
  const router = useRouter();

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-[0_40px_90px_rgba(0,0,0,0.25)]">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-300/80">Payment failed</p>
        <h1 className="mt-4 text-4xl font-black text-white">Something went wrong</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          Your payment could not be completed. Please try again or contact support if this continues.
        </p>
        {reason ? (
          <p className="mt-6 text-sm text-white/70">Reason: <span className="font-semibold text-white">{reason}</span></p>
        ) : null}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={() => router.push('/pricing')} className="w-full sm:w-auto">
            Try again
          </Button>
          <Button variant="secondary" onClick={() => router.push('/dashboard/settings')} className="w-full sm:w-auto">
            Manage subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
