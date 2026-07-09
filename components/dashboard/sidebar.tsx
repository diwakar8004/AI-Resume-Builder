"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeLink } from "@/components/shared/home-link";
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
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/resumes", icon: FileText, label: "My Resumes" },
  { href: "/dashboard/cover-letters", icon: BookOpen, label: "Cover Letters" },
  { href: "/dashboard/job-tracker", icon: Briefcase, label: "Job Tracker" },
];

const bottomItems = [
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/help", icon: HelpCircle, label: "Help & Support" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 sm:p-5 border-b border-white/5">
        <HomeLink className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl text-white" style={{ fontFamily: "Outfit, sans-serif" }}>
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </HomeLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 sm:p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 group",
                active
                  ? "text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
              style={
                active
                  ? { background: "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(124,58,237,0.1))", border: "1px solid rgba(79,70,229,0.2)" }
                  : {}
              }
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-indigo-400" : "text-current")} />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(" ")[0]}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto text-indigo-400/60 hidden sm:block" />}
            </Link>
          );
        })}
      </nav>

      {/* Pro upgrade banner */}
      <div
        className="hidden sm:block mx-3 mb-3 p-3 sm:p-4 rounded-lg sm:rounded-2xl relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(124,58,237,0.15))", border: "1px solid rgba(79,70,229,0.2)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
          <span className="text-xs font-bold text-white">Upgrade to Pro</span>
        </div>
        <p className="text-xs text-white/50 mb-2 sm:mb-3 leading-relaxed">Unlock 25+ templates, unlimited AI generations & more.</p>
        <Link href="/pricing">
          <button
            type="button"
            className="w-full py-1.5 sm:py-2 rounded-lg text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED)" }}
          >
            Upgrade — ₹9/mo
          </button>
        </Link>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 p-2 sm:p-3 space-y-0.5">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200",
                active ? "text-white bg-white/5" : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex w-60 flex-shrink-0 flex-col h-screen sticky top-0 border-r border-white/5"
        style={{ background: "linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header with Menu Toggle */}
      <div
        className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b border-white/5"
        style={{ background: "rgba(13,13,32,0.95)", backdropFilter: "blur(20px)" }}
      >
        <HomeLink className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm text-white">
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </HomeLink>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="md:hidden fixed inset-0 bg-black/50 z-30 top-[57px]" />

            {/* Drawer */}
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed left-0 top-[57px] bottom-0 w-60 z-40 flex flex-col overflow-y-auto border-r border-white/5"
              style={{ background: "linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)" }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

