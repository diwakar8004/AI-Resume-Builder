'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => Promise<void> | void;
  prefill: {
    name?: string;
    email?: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: {
      new (options: RazorpayCheckoutOptions): RazorpayInstance;
    };
  }
}

type OrderResponse = {
  order: {
    id: string;
    amount: number;
    currency: string;
    keyId: string | null;
  };
};

const pricing = {
  monthly: {
    title: 'Monthly Pro',
    subtitle: 'Best for quick upgrades',
    description: 'Unlock premium templates and unlimited AI features with a monthly subscription.',
    price: '₹499',
    amount: 49900,
    interval: 'monthly' as const,
  },
  yearly: {
    title: 'Yearly Pro',
    subtitle: 'Most savings',
    description: 'Save 20% with annual billing and keep Pro access all year long.',
    price: '₹4,990',
    amount: 499000,
    interval: 'yearly' as const,
  },
};

function formatAmount(amount: number) {
  return `₹${(amount / 100).toFixed(0)}`;
}

export default function PricingPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<'monthly' | 'yearly'>('monthly');
  const loginPrompt = status !== 'loading' && !session?.user?.id ? 'Please log in to upgrade to Pro.' : null;

  const loadRazorpayScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.Razorpay) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (plan: 'monthly' | 'yearly') => {
    if (!session?.user?.id) {
      setMessage('Log in first to continue.');
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      const response = await fetch('/api/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as OrderResponse | { error: string };
      const responseError = 'error' in data ? data.error : undefined;
      if (!response.ok || responseError) {
        throw new Error(responseError || 'Unable to create a payment order.');
      }

      const order = data as OrderResponse;

      await loadRazorpayScript();

      const razorpayKey = order.order.keyId ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('Razorpay public key is not configured.');
      }

      const options: RazorpayCheckoutOptions = {
        key: razorpayKey,
        amount: order.order.amount,
        currency: order.order.currency,
        name: 'ResumeAI',
        description: pricing[plan].subtitle,
        order_id: order.order.id,
        handler: async (payload) => {
          setIsProcessing(true);
          const verifyResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: payload.razorpay_order_id,
              razorpay_payment_id: payload.razorpay_payment_id,
              razorpay_signature: payload.razorpay_signature,
              plan,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (!verifyResponse.ok || verifyData.error) {
            router.push(`/payment/failed?reason=${encodeURIComponent(verifyData.error || 'Verification failed')}`);
            return;
          }

          if (update) {
            await update();
          }

          router.push(`/payment/success?paymentId=${encodeURIComponent(payload.razorpay_payment_id)}`);
        },
        prefill: {
          name: session.user?.name || undefined,
          email: session.user?.email || undefined,
        },
        theme: {
          color: '#4F46E5',
        },
        modal: {
          ondismiss: () => {
            if (!isProcessing) {
              setMessage('Payment was cancelled.');
            }
          },
        },
      };

      const RazorpayConstructor = window.Razorpay;
      if (!RazorpayConstructor) {
        throw new Error('Razorpay SDK failed to load.');
      }

      const razorpay = new RazorpayConstructor(options);
      razorpay.open();
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : 'Checkout failed.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_90px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">Upgrade to Pro</p>
              <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Premium resume tools for ambitious professionals</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                Get unlimited AI writing, premium templates, payment history, and razor-sharp export tools with ResumeAI Pro.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Current plan</p>
                <p className="mt-3 text-2xl font-bold text-white">{session?.user?.plan === 'PRO' ? 'Pro' : 'Free'}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">Status</p>
                <p className="mt-3 text-2xl font-bold text-white">{session ? 'Signed in' : 'Not signed in'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {Object.entries(pricing).map(([key, plan]) => (
            <div key={key} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{plan.title}</p>
                  <p className="text-xs text-white/50 mt-1">{plan.subtitle}</p>
                </div>
                <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
                  {key === activePlan ? 'Recommended' : 'Popular'}
                </span>
              </div>

              <div className="mt-8 flex items-end gap-4">
                <p className="text-5xl font-black text-white">{plan.price}</p>
                <span className="text-sm text-white/50">billed {plan.interval}</span>
              </div>

              <p className="mt-6 text-sm leading-7 text-white/60">{plan.description}</p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  variant={session?.user?.plan === 'PRO' ? 'secondary' : 'default'}
                  onClick={() => handleCheckout(plan.interval)}
                  disabled={isProcessing || session?.user?.plan === 'PRO'}
                >
                  {session?.user?.plan === 'PRO' ? 'Already Pro' : `Pay ${formatAmount(plan.amount)}`}
                </Button>
                <button
                  type="button"
                  className="text-sm text-white/60 underline transition hover:text-white"
                  onClick={() => setActivePlan(plan.interval)}
                >
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>

        {(message || loginPrompt) ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">
            {message || loginPrompt}
          </div>
        ) : null}

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">Payment workflow</p>
          <h2 className="mt-3 text-3xl font-black text-white">What happens next</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Secure Checkout', description: 'We use Razorpay Orders API and keep your card details out of our system.' },
              { title: 'Server verification', description: 'Payments are verified on the server by signature and stored in your account history.' },
              { title: 'Instant access', description: 'After successful verification, your account upgrades to Pro immediately.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
