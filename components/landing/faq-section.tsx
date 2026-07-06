'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Is ResumeAI really free to start?',
    a: "Yes! Our free plan lets you create unlimited resumes with 5 templates, 3 PDF downloads per month, and 10 AI writing uses. No credit card required to sign up.",
  },
  {
    q: 'Are the resumes ATS-compatible?',
    a: "All 30+ templates are designed to pass Applicant Tracking Systems. We test every template against the top ATS systems including Greenhouse, Lever, Workday, and Taleo. Our ATS scorer also tells you exactly how to improve your score.",
  },
  {
    q: 'How does the AI writing work?',
    a: "Our AI uses GPT-4 to generate professional summaries, rewrite bullet points, suggest skills, and write cover letters. It analyzes your job title, experience, and the specific job description you're targeting to create highly personalized content.",
  },
  {
    q: 'Can I export to Word (DOCX)?',
    a: "Yes! Pro and Team plans include DOCX export in addition to PDF. The Word export maintains all formatting and is compatible with Microsoft Word, Google Docs, and LibreOffice.",
  },
  {
    q: 'How many resumes can I create?',
    a: "Free users can create up to 3 resumes. Pro and Team users get unlimited resumes with unlimited version history. We recommend creating a tailored resume for each job application.",
  },
  {
    q: 'Is my data private and secure?',
    a: "Absolutely. Your resume data is encrypted at rest and in transit using AES-256 and TLS 1.3. We never share, sell, or use your data to train AI models. You can delete your account and all data at any time.",
  },
  {
    q: 'Can I import my existing resume?',
    a: "Yes! You can import a PDF or DOCX resume and our system will parse it and pre-fill your builder. Then you can apply any of our templates and enhance the content with AI.",
  },
  {
    q: 'What if I cancel my subscription?',
    a: "You can cancel anytime with no fees. After cancellation, you'll keep access until the end of your billing period. Your resumes are never deleted — you can still download them on the free plan.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A18 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-sky-300 border border-sky-500/30 bg-sky-500/10 mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Got{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #38BDF8, #818CF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Questions?
            </span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 overflow-hidden transition-all duration-200"
              style={{
                background:
                  openIndex === i
                    ? 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.04))'
                    : 'rgba(255,255,255,0.02)',
                borderColor: openIndex === i ? 'rgba(79,70,229,0.2)' : 'rgba(255,255,255,0.05)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span
                  className={`text-sm font-semibold transition-colors ${
                    openIndex === i ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                    openIndex === i ? 'rotate-180 text-indigo-400' : 'text-white/30'
                  }`}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-white/55 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
