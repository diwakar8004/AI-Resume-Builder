'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  FileText,
  LayoutDashboard,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  ChevronRight,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/resumes', icon: FileText, label: 'My Resumes' },
  { href: '/dashboard/cover-letters', icon: BookOpen, label: 'Cover Letters' },
  { href: '/dashboard/job-tracker', icon: Briefcase, label: 'Job Tracker' },
];

const bottomItems = [
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/help', icon: HelpCircle, label: 'Help & Support' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-60 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 border-r border-white/5"
      style={{ background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)' }}
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                active
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              )}
              style={active ? { background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.1))', border: '1px solid rgba(79,70,229,0.2)' } : {}}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-indigo-400' : 'text-current')} />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-indigo-400/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Pro upgrade banner */}
      <div className="mx-3 mb-3 p-4 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.25), rgba(124,58,237,0.15))', border: '1px solid rgba(79,70,229,0.2)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-white">Upgrade to Pro</span>
        </div>
        <p className="text-xs text-white/50 mb-3 leading-relaxed">Unlock 25+ templates, unlimited AI generations & more.</p>
        <button
          className="w-full py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
        >
          Upgrade — $9/mo
        </button>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>

      {/* User avatar */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">User</p>
            <p className="text-xs text-white/35 truncate">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
