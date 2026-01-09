import { NextRequest } from 'next/server';

const careerTracks = [
  'local', 'global', 'faang', 'startup', 'consulting', 'finance', 'healthcare', 'education'
];

const taxJurisdictions = [
  'USA', 'UK', 'Germany', 'Canada', 'Australia', 'Singapore', 'UAE', 'Switzerland'
];

const contentPages = [
  'how-to-use-this-wealth-calculator',
  'understanding-compound-interest',
  'career-specific-wealth-tips',
  'investment-strategies',
  'tax-optimization',
  'common-wealth-building-mistakes',
  'getting-started-financial-freedom'
];

export async function GET(request: NextRequest) {
  const baseUrl = 'https://wealthbuilder.pro';

  // Generate URLs for different career track combinations
  const careerUrls = careerTracks.map(track => ({
    url: `${baseUrl}/career/${track}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }));

  // Generate URLs for tax jurisdiction combinations
  const taxUrls = taxJurisdictions.map(tax => ({
    url: `${baseUrl}/tax/${tax.toLowerCase()}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  // Generate URLs for content pages
  const contentUrls = contentPages.map(page => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9
  }));

  // Combine all URLs
  const allUrls = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    ...careerUrls,
    ...taxUrls,
    ...contentUrls
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
