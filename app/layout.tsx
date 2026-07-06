import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import "@/styles/print.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { AuthProvider } from "@/components/shared/auth-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ResumeAI — Build Your Dream Resume with AI",
    template: "%s | ResumeAI",
  },
  description:
    "Create stunning, ATS-optimized resumes, CVs, cover letters, and portfolios in minutes using AI-powered tools and 30+ professional templates.",
  keywords: [
    "resume builder",
    "AI resume",
    "CV builder",
    "cover letter",
    "ATS resume",
    "professional resume",
    "free resume builder",
  ],
  authors: [{ name: "ResumeAI" }],
  creator: "ResumeAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "ResumeAI — Build Your Dream Resume with AI",
    description:
      "Create stunning, ATS-optimized resumes, CVs, cover letters, and portfolios in minutes.",
    siteName: "ResumeAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI — Build Your Dream Resume with AI",
    description: "Create stunning, ATS-optimized resumes with AI assistance.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
