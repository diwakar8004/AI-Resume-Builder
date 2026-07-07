'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import {
  Shield,
  Globe,
  Bell,
  CreditCard,
  BarChart3,
  Trash2,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react';

type NotificationSettings = {
  productUpdates: boolean;
  weeklySummary: boolean;
  aiTips: boolean;
};

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileImage, setProfileImage] = useState(session?.user?.image || '');
  const [values, setValues] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    company: '',
    website: '',
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    productUpdates: true,
    weeklySummary: false,
    aiTips: true,
  });

  useEffect(() => {
    if (session) {
      setValues((current) => ({
        ...current,
        name: session.user?.name || current.name,
        email: session.user?.email || current.email,
      }));
      setProfileImage(session.user?.image || '');
    }
  }, [session]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };

  const handleCheckbox = (key: keyof NotificationSettings) => {
    setNotifications((current) => ({ ...current, [key]: !current[key] }));
  };

  const themeOptions = ['system', 'light', 'dark'] as const;

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">Account settings</p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Personalize your workspace</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
              Control your profile, subscription, security, and notifications from one polished dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/50">Plan</p>
                <p className="text-base font-semibold text-white">Free Starter</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Profile</p>
                  <p className="mt-2 text-sm text-white/50">Update your identity and personal details.</p>
                </div>
                <div className="space-y-2 text-right">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30">Connected with</p>
                  <p className="text-sm font-semibold text-white">Google</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-[120px_1fr]">
                <div className="space-y-4">
                  <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                    {profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profileImage} alt="Profile avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-white/5 text-3xl font-bold text-white/40">{values.name?.charAt(0) || 'U'}</div>
                    )}
                  </div>
                  <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-white transition hover:border-indigo-400/50 hover:bg-white/5">
                    Upload Avatar
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-white">Full Name</label>
                    <input
                      type="text"
                      value={values.name}
                      onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/70"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white">Email address</label>
                    <input
                      type="email"
                      value={values.email}
                      disabled
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white">Company</label>
                    <input
                      type="text"
                      value={values.company}
                      onChange={(e) => setValues((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Acme Inc."
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/70"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white">Website</label>
                    <input
                      type="text"
                      value={values.website}
                      onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="https://yourcompany.com"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/70"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Security</p>
                  <p className="mt-2 text-sm text-white/50">Password management and sign-in options.</p>
                </div>
                <Shield className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="mt-8 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-white">Current password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/70"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-white">New password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/70"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-white">Confirm password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/70"
                  />
                </div>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Update password
                </button>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Notifications</p>
                  <p className="mt-2 text-sm text-white/50">Customize the emails you receive.</p>
                </div>
                <Bell className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="mt-8 space-y-4">
                {[
                  { key: 'productUpdates' as const, label: 'Product updates', description: 'New feature announcements and release notes.' },
                  { key: 'weeklySummary' as const, label: 'Weekly summary', description: 'A weekly report of your account activity.' },
                  { key: 'aiTips' as const, label: 'AI tips', description: 'Personalized AI best practices and suggestions.' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-indigo-400/30">
                    <div>
                      <p className="font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-white/50">{item.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={() => handleCheckbox(item.key)}
                      className="h-5 w-5 rounded-full border border-white/10 bg-indigo-500 text-indigo-500 focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            </section>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isLoading ? 'Saving changes…' : saved ? 'Saved successfully' : 'Save settings'}
            </button>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Theme preference</p>
                  <p className="mt-2 text-sm text-white/50">Switch between light, dark, and system themes.</p>
                </div>
                <Globe className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="mt-6 grid gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTheme(option)}
                    className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${
                      theme === option ? 'border-indigo-400/60 bg-indigo-500/10 text-white' : 'border-white/10 bg-black/20 text-white/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold capitalize">{option}</span>
                      {theme === option ? <CheckCircle2 className="h-5 w-5 text-emerald-300" /> : null}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Subscription</p>
                  <p className="mt-2 text-sm text-white/50">Billing, usage, and upgrade options.</p>
                </div>
                <CreditCard className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Free Starter</p>
                    <p className="text-xs text-white/50">Monthly plan</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">Current</span>
                </div>
                <div>
                  <p className="text-sm text-white/60">You're on the starter plan with limited AI suggestions, resumes, and cover letters.</p>
                </div>
                <button
                  type="button"
                  className="mt-3 w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Upgrade to Premium
                </button>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Usage</p>
                  <p className="mt-2 text-sm text-white/50">Track your activity and plan limits.</p>
                </div>
                <BarChart3 className="h-5 w-5 text-indigo-300" />
              </div>
              <div className="mt-8 space-y-5">
                {[
                  { label: 'AI suggestions used', value: '8 / 20', progress: 40 },
                  { label: 'Cover letters generated', value: '2 / 5', progress: 40 },
                  { label: 'Resumes created', value: '3 / 3', progress: 100 },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-indigo-500" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-[#1b152b] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Danger zone</p>
                  <p className="mt-2 text-sm text-white/50">Delete your account and data permanently.</p>
                </div>
                <Trash2 className="h-5 w-5 text-rose-300" />
              </div>
              <button
                type="button"
                className="mt-6 w-full rounded-3xl bg-rose-500/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
              >
                Delete account
              </button>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
}
