import Link from 'next/link';
import { HomeLink } from '@/components/shared/home-link';
import { Sparkles, ChevronLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div
      className="min-h-screen pb-20 text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A18 0%, #0F0F2D 50%, #0A0A18 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #4F46E5, transparent)' }} />

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between border-b border-white/5 relative z-10">
        <HomeLink className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-xl text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Resume<span className="text-indigo-400">AI</span>
          </span>
        </HomeLink>
        <HomeLink className="flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </HomeLink>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pt-16 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 font-['Outfit']">
          Terms of Service
        </h1>
        <p className="text-xs text-white/40 mb-10">Last Updated: July 5, 2026</p>

        <div className="space-y-8 text-sm text-white/70 leading-relaxed font-sans">
          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">1. Agreement to Terms</h2>
            <p>
              By accessing or using ResumeAI, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not access or use the application. We reserve the right to change or modify these terms at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">2. User Accounts</h2>
            <p>
              You must register for an account to use the application features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">3. AI-Generated Content</h2>
            <p>
              ResumeAI provides tools utilizing artificial intelligence models to assist with resume enhancement, summary generation, and ATS optimization. We make no guarantees regarding the accuracy, completeness, or suitability of generated text for your job applications.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">4. Subscriptions & Billing</h2>
            <p>
              Some services require paid subscriptions. Subscription fees are billed in advance on a recurring monthly or annual basis. You may cancel your subscription at any time. All fees paid are non-refundable unless required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">5. Limitation of Liability</h2>
            <p>
              In no event shall ResumeAI, its directors, employees, or partners be liable for any indirect, incidental, special, or consequential damages resulting from the use of or inability to use the service, including but not limited to lost career opportunities.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
