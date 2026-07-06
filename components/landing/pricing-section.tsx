'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, X, Sparkles, Zap, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Perfect for getting started',
    badge: null,
    color: '#6B7280',
    cta: 'Get Started Free',
    ctaHref: '/register',
    features: [
      { text: '3 resume downloads/month', included: true },
      { text: '5 free templates', included: true },
      { text: 'PDF export', included: true },
      { text: 'Basic AI writing (10 uses/month)', included: true },
      { text: 'ATS scoring', included: true },
      { text: 'Unlimited resumes', included: false },
      { text: 'Premium templates (25+)', included: false },
      { text: 'Unlimited AI uses', included: false },
      { text: 'DOCX export', included: false },
      { text: 'Cover letter builder', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 19, annual: 14 },
    description: 'For serious job seekers',
    badge: 'Most Popular',
    color: '#4F46E5',
    cta: 'Start Pro Trial',
    ctaHref: '/register?plan=pro',
    features: [
      { text: 'Unlimited resume downloads', included: true },
      { text: 'All 30+ premium templates', included: true },
      { text: 'PDF & DOCX export', included: true },
      { text: 'Unlimited AI writing', included: true },
      { text: 'Advanced ATS scoring', included: true },
      { text: 'Unlimited resumes & versions', included: true },
      { text: 'Cover letter AI builder', included: true },
      { text: 'Job match analysis', included: true },
      { text: 'Portfolio builder', included: false },
      { text: 'Custom domain', included: false },
      { text: 'Priority support', included: true },
    ],
  },
  {
    name: 'Team',
    price: { monthly: 49, annual: 39 },
    description: 'For teams & career coaches',
    badge: 'Best Value',
    color: '#7C3AED',
    cta: 'Start Team Trial',
    ctaHref: '/register?plan=team',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Up to 10 team members', included: true },
      { text: 'Portfolio builder', included: true },
      { text: 'Custom domain for portfolio', included: true },
      { text: 'White-label PDFs', included: true },
      { text: 'Team analytics dashboard', included: true },
      { text: 'Bulk resume management', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom templates', included: true },
      { text: 'SLA-backed support', included: true },
    ],
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0A0A18 0%, #0D0D20 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-amber-300 border border-amber-500/30 bg-amber-500/10 mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Invest in Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Career
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            Start free. Upgrade when you're ready. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-4 p-1 rounded-full bg-white/5 border border-white/8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? 'bg-white text-gray-900 shadow' : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual ? 'bg-white text-gray-900 shadow' : 'text-white/50 hover:text-white'
              }`}
            >
              Annual
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                plan.badge === 'Most Popular' ? 'shadow-2xl' : ''
              }`}
              style={{
                background:
                  plan.badge === 'Most Popular'
                    ? `linear-gradient(135deg, ${plan.color}20, ${plan.color}08)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                borderColor:
                  plan.badge === 'Most Popular' ? `${plan.color}40` : 'rgba(255,255,255,0.06)',
                boxShadow: plan.badge === 'Most Popular' ? `0 16px 48px ${plan.color}25` : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)` }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-white/40 mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-sm text-white/40 mb-1">/mo</span>
                  )}
                </div>
                {isAnnual && plan.price.monthly > 0 && (
                  <p className="text-xs text-emerald-400 mt-1">
                    Billed ${(isAnnual ? plan.price.annual : plan.price.monthly) * 12}/year
                  </p>
                )}
              </div>

              <Link
                href={plan.ctaHref}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold mb-6 transition-all duration-200 hover:-translate-y-0.5"
                style={
                  plan.badge === 'Most Popular'
                    ? {
                        background: `linear-gradient(135deg, ${plan.color}, #7C3AED)`,
                        color: '#fff',
                        boxShadow: `0 4px 16px ${plan.color}40`,
                      }
                    : {
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }
                }
              >
                {plan.badge === 'Most Popular' && <Sparkles className="w-3.5 h-3.5" />}
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="space-y-2.5">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    {feature.included ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: plan.color }} />
                    ) : (
                      <X className="w-4 h-4 text-white/15 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${feature.included ? 'text-white/70' : 'text-white/25'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          All plans include 14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
