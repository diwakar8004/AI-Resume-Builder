import { redirect } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { FeaturesSection } from "@/components/landing/features-section";
import { TemplateGallery } from "@/components/landing/template-gallery";
import { AIFeaturesSection } from "@/components/landing/ai-features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { BlogSection } from "@/components/landing/blog-section";
import { CTASection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { auth } from "@/lib/auth";

export default async function LandingPage() {
  const session = await auth();
  if (session?.user?.id) {
    // Authenticated users should land on the dashboard
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LogoCloud />
      <FeaturesSection />
      <TemplateGallery />
      <AIFeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <BlogSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
