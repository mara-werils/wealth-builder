"use client";
import { useEffect } from 'react';

interface StructuredDataProps {
  capital30: number;
  careerTrack: string;
  investmentRate: number;
  taxJurisdiction: string;
}

export default function StructuredData({ capital30, careerTrack, investmentRate, taxJurisdiction }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "WealthBuilder Pro",
      "description": "Free wealth calculator for career planning and investment projections",
      "url": "https://wealthbuilder.pro",
      "logo": "https://wealthbuilder.pro/logo.png",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Calculator",
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Premium Features",
          "price": "9.99",
          "priceCurrency": "USD",
          "priceValidUntil": "2025-12-31"
        }
      ],
      "featureList": [
        "Compound Interest Calculator",
        "Career Path Projections",
        "Investment Strategy Recommendations",
        "Tax Optimization Insights",
        "AI-Powered Financial Advice"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250"
      },
      "creator": {
        "@type": "Organization",
        "name": "WealthBuilder Pro",
        "url": "https://wealthbuilder.pro"
      }
    });

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [capital30, careerTrack, investmentRate, taxJurisdiction]);

  return null;
}
