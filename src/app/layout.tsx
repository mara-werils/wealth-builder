import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WealthBuilder Pro - Free Wealth Calculator & Financial Planning",
  description: "Calculate your career wealth projection with AI-powered insights. Plan investments, optimize taxes, and achieve financial freedom. Free tool for professionals worldwide.",
  keywords: "wealth calculator, financial planning, investment calculator, career planning, compound interest, financial freedom",
  authors: [{ name: "WealthBuilder Pro" }],
  creator: "WealthBuilder Pro",
  publisher: "WealthBuilder Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wealthbuilder.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "WealthBuilder Pro - Free Wealth Calculator & Financial Planning",
    description: "Calculate your career wealth projection with AI-powered insights. Plan investments, optimize taxes, and achieve financial freedom.",
    url: 'https://wealthbuilder.pro',
    siteName: 'WealthBuilder Pro',
    images: [
      {
        url: 'https://wealthbuilder.pro/api/og',
        width: 1200,
        height: 630,
        alt: 'WealthBuilder Pro - Wealth Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "WealthBuilder Pro - Free Wealth Calculator & Financial Planning",
    description: "Calculate your career wealth projection with AI-powered insights. Plan investments, optimize taxes, and achieve financial freedom.",
    images: ['https://wealthbuilder.pro/api/og'],
    creator: '@wealthbuilderpro',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
