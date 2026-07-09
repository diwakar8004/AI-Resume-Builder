import Link from 'next/link';
import { HomeLink } from '@/components/shared/home-link';
import { Sparkles, ChevronLeft } from 'lucide-react';

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs text-white/40 mb-10">Last Updated: July 5, 2026</p>

        <div className="space-y-8 text-sm text-white/70 leading-relaxed font-sans">
          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, build your resume, or communicate with us. This includes your name, email address, password, billing information, and any professional data you input (such as experience, education, and skills).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">2. How We Use Your Information</h2>
            <p>
              We use the collected information to deliver and optimize our services, including providing resume builder features, rendering templates, facilitating AI-powered rewriting and summary generation, processing payments, and contacting you regarding account updates.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell your personal data. We share information with third-party service providers (such as OpenAI for AI text generation, Resend for email notifications, and payment processors) solely to execute core functions of the application.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">4. Data Security & Retention</h2>
            <p>
              We implement industry-standard administrative, technical, and physical safeguards to protect your personal data. We retain your information for as long as your account remains active or as needed to provide you with the application services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-white mb-3 uppercase tracking-wider font-['Outfit']">5. Your Rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or limit our use of your personal data. To exercise any of these rights, please contact our support team at support@resumeai.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
