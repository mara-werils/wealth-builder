import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const career = searchParams.get('career') || 'professional';
  const wealth = searchParams.get('wealth') || '100000';
  const rate = searchParams.get('rate') || '25';

  // In a real implementation, you'd use a library like @vercel/og or puppeteer
  // to generate actual images. For now, we'll return a placeholder.

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

  const careerName = careerTitles[career] || 'Professional';

  // For demonstration, return a simple SVG as an image
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
        </linearGradient>
      </defs>

      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Logo/Brand -->
      <text x="60" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#6366f1">
        WealthBuilder Pro
      </text>

      <!-- Main Title -->
      <text x="60" y="140" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">
        My Wealth Projection
      </text>

      <!-- Career -->
      <text x="60" y="200" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8">
        Career: ${careerName}
      </text>

      <!-- Wealth Amount -->
      <text x="60" y="250" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#10b981">
        $${parseInt(wealth).toLocaleString()} at age 30
      </text>

      <!-- Investment Rate -->
      <text x="60" y="300" font-family="Arial, sans-serif" font-size="24" fill="#94a3b8">
        Investment Rate: ${rate}%
      </text>

      <!-- Website URL -->
      <text x="60" y="580" font-family="Arial, sans-serif" font-size="20" fill="#64748b">
        wealthbuilder.pro
      </text>

      <!-- Decorative elements -->
      <circle cx="1000" cy="150" r="80" fill="#6366f1" opacity="0.2"/>
      <circle cx="1050" cy="200" r="60" fill="#10b981" opacity="0.2"/>
      <circle cx="1100" cy="100" r="40" fill="#f59e0b" opacity="0.2"/>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
