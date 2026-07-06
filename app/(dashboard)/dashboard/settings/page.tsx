'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Shield,
  CreditCard,
  Crown,
  Check,
  Zap,
} from 'lucide-react';

export default function SettingsPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Top bar */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Settings
        </h1>
        <p className="text-sm text-white/40 mt-0.5">Manage your profile, account preferences, and billing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left two columns: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/3">
            <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" />
              Profile Details
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
              >
                {isLoading ? 'Saving...' : saved ? (
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved</span>
                ) : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/3">
            <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Security & Password
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/20 border border-white/8 bg-white/4 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Subscription Plan & Usage info */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/3 relative overflow-hidden">
            {/* Decorator */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-25" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
            
            <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              Subscription Plan
            </h2>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white">Free Starter</span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">Current</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">Upgrade to unlock unlimited AI suggestions, cover letters, and templates.</p>
            </div>

            <button
              className="w-full py-3 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 mb-4"
              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
            >
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              Upgrade to Premium
            </button>
            
            <p className="text-[10px] text-white/30 text-center">Standard subscription is billed monthly. Cancel anytime.</p>
          </div>

          {/* Usage Stats */}
          <div className="p-6 rounded-2xl border border-white/5 bg-white/3">
            <h2 className="text-base font-bold text-white mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              AI Usage
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1.5">
                  <span>AI Suggestions</span>
                  <span className="font-semibold text-white">8 / 20</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1.5">
                  <span>Cover Letters</span>
                  <span className="font-semibold text-white">2 / 5</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-1.5">
                  <span>Resumes</span>
                  <span className="font-semibold text-white">3 / 3</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-[10px] text-amber-400/80 mt-1.5">You have reached the free tier limit of 3 resumes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
