"use client";
import { useEffect } from 'react';

interface DynamicHeadProps {
  careerTrack: string;
  capital30: number;
  investmentRate: number;
}

export default function DynamicHead({ careerTrack, capital30, investmentRate }: DynamicHeadProps) {
  useEffect(() => {
    // Update document title
    const careerTitles: Record<string, string> = {
      local: 'Traditional Career',
      global: 'Remote Global Work',
      faang: 'Big Tech FAANG',
      startup: 'Startup Employee',
      consulting: 'Management Consulting',
      finance: 'Finance & Banking',
      healthcare: 'Healthcare Professional',
      education: 'Academic Career'
    };

    const careerName = careerTitles[careerTrack] || 'Professional';
    const title = `${careerName} Wealth Calculator - $${capital30.toLocaleString()} at Age 30 | WealthBuilder Pro`;
    const description = `Calculate your wealth projection as a ${careerName.toLowerCase()}. With ${investmentRate}% investment rate, reach $${capital30.toLocaleString()} by age 30. Free AI-powered financial planning tool.`;

    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', `https://wealthbuilder.pro/api/og?career=${careerTrack}&wealth=${capital30}&rate=${investmentRate}`);
    updateMetaTag('og:url', typeof window !== 'undefined' ? window.location.href : 'https://wealthbuilder.pro');

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:image', `https://wealthbuilder.pro/api/og?career=${careerTrack}&wealth=${capital30}&rate=${investmentRate}`);

  }, [careerTrack, capital30, investmentRate]);

  return null;
}
