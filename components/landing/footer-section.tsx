'use client';

import Link from 'next/link';
import { Sparkles, MessageSquare, Briefcase, Terminal, Mail, ArrowRight } from 'lucide-react';
import { HomeLink } from '@/components/shared/home-link';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'AI Tools', href: '#ai-tools' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '/changelog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press Kit', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Resume Guide', href: '/guides/resume' },
    { label: 'Cover Letter Guide', href: '/guides/cover-letter' },
    { label: 'ATS Tips', href: '/guides/ats' },
    { label: 'Interview Prep', href: '/guides/interview' },
    { label: 'Career Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'GDPR', href: '/gdpr' },
  ],
};

const socials = [
  { icon: MessageSquare, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Terminal, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@resumeai.app', label: 'Email' },
];

export function FooterSection() {
  return (
    <footer
      className="border-t border-white/5"
      style={{ background: '#07070F' }}
    >
      {/* CTA Banner */}
      <div className="py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.1))' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-6 sm:mb-8 max-w-lg mx-auto">
            Join 2 million+ professionals who built their careers with ResumeAI.
            Start free, no credit card required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white rounded-lg sm:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              boxShadow: '0 8px 32px rgba(79,70,229,0.4)',
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Build Your Resume — It&apos;s Free
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <HomeLink className="flex items-center gap-2 mb-3 sm:mb-4 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span
                className="text-base sm:text-lg font-bold text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Resume<span className="text-indigo-400">AI</span>
              </span>
            </HomeLink>
            <p className="text-xs text-white/35 leading-relaxed mb-4 sm:mb-6">
              Build job-winning resumes with the power of AI. Trusted by 2M+ professionals worldwide.
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200"
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3 sm:mb-4">
                {category}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/35 hover:text-white/70 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs text-white/25 text-center sm:text-left">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/25">
            <span>Made with</span>
            <span className="text-rose-400">♥</span>
            <span>for job seekers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
