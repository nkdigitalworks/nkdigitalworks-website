import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { baseOpenGraph, companySeo, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // The company homepage (Phase 3J-AX); NoorLife's page sets its own.
    default: companySeo.title,
    template: `%s — ${site.name}`,
  },
  description: companySeo.description,
  applicationName: site.name,
  // Deliberately free of feature, module and category terms.
  keywords: [
    "NK Digital Works",
    "independent software studio",
    "mobile applications",
    "NoorLife",
    "LumiTale",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  // No `images` entry: there is no real OG asset yet, and a fabricated one
  // would be worse than none. Add one when brand artwork exists.
  openGraph: { ...baseOpenGraph, url: "/" },
  twitter: {
    card: "summary",
    title: companySeo.title,
    description: companySeo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#03060f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Next.js 16 only neutralises smooth scrolling during route transitions
      // when this attribute is present, which keeps navigations instant while
      // in-page anchors still glide.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink">
        <a
          href="#main"
          className="glass sr-only rounded-full px-4 py-2 text-sm font-semibold text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
