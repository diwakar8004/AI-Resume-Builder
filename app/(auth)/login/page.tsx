'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [error] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return new URLSearchParams(window.location.search).get('error');
  });

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0F0F2D 50%, #0A0A18 100%)' }}
    >
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        <div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }}
        />

        <Link href="/" className="flex items-center gap-2 relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </Link>

        <div className="relative">
          <div
            className="absolute inset-0 -m-6 rounded-2xl blur opacity-20"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
          />
          <div className="relative p-6 rounded-2xl border border-white/10 bg-white/3">
            <p className="text-xl font-semibold text-white mb-4 leading-relaxed">
              &quot;ResumeAI helped me land interviews at Google, Meta, and Stripe. The AI bullet
              rewriter is absolutely incredible.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                PS
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Priya Sharma</p>
                <p className="text-xs text-white/50">Software Engineer at Google</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 relative">
          {[
            { value: '2M+', label: 'Users' },
            { value: '94%', label: 'Interview Rate' },
            { value: '4.9★', label: 'Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-white/3 border border-white/5">
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12">
        <div className="w-full max-w-md mx-auto">
          <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Resume<span className="text-indigo-400">AI</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Welcome back
            </h1>
            <p className="text-white/50 text-sm">Sign in with Google to continue building your career.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-6">
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/dashboard` })}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-white/80 border border-white/10 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              Register with Google
            </Link>
            {error ? (
              <p className="text-center text-sm text-red-300 mt-4">
                Authentication failed. Please try again.
              </p>
            ) : null}
          </div>

          <p className="text-center text-sm text-white/40 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Create one with Google
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
