#!/bin/bash

# ML Career & Wealth Simulator - Monetization Setup Script
# This script sets up the basic infrastructure for monetization

echo "🚀 Setting up monetization infrastructure..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

echo "📦 Installing payment and auth dependencies..."

# Install Stripe for payments
npm install stripe @stripe/stripe-js

# Install NextAuth for authentication
npm install next-auth

# Install Supabase for database (optional alternative to local storage)
npm install @supabase/supabase-js

# Install analytics
npm install @vercel/analytics

echo "🔧 Setting up environment variables..."

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    cat > .env.local << EOF
# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Stripe (get from https://stripe.com)
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase (optional - get from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS=true
EOF
    echo "✅ Created .env.local with placeholder values"
    echo "⚠️  IMPORTANT: Update with your actual API keys!"
else
    echo "ℹ️  .env.local already exists"
fi

echo "📝 Creating monetization components..."

# Create components directory if it doesn't exist
mkdir -p src/components

# Create premium features component
cat > src/components/PremiumFeatures.tsx << 'EOF'
"use client";
import React from 'react';
import { Crown, Zap, Download, TrendingUp, Shield, Users } from 'lucide-react';

interface PremiumFeaturesProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

export default function PremiumFeatures({ isPremium, onUpgrade }: PremiumFeaturesProps) {
  const features = [
    { icon: <Zap />, title: "Unlimited Scenarios", description: "Create unlimited financial scenarios" },
    { icon: <Download />, title: "Advanced Export", description: "Export to PDF, Excel, and more" },
    { icon: <TrendingUp />, title: "Detailed Analytics", description: "Advanced portfolio analytics" },
    { icon: <Shield />, title: "Priority Support", description: "24/7 priority customer support" },
    { icon: <Users />, title: "Team Features", description: "Share scenarios with your team" },
    { icon: <Crown />, title: "Premium Templates", description: "Pre-built career templates" }
  ];

  if (isPremium) {
    return null; // Don't show upgrade prompt for premium users
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6 my-6">
      <div className="text-center mb-6">
        <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Unlock Premium Features</h3>
        <p className="text-slate-300">Get unlimited access to advanced financial planning tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
            <div className="text-indigo-400 mt-1">{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
              <p className="text-slate-400 text-xs">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onUpgrade}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
        >
          Upgrade to Premium - $9.99/month
        </button>
        <p className="text-xs text-slate-400 mt-2">Cancel anytime • 30-day money-back guarantee</p>
      </div>
    </div>
  );
}
EOF

# Create Stripe checkout component
cat > src/components/StripeCheckout.tsx << 'EOF'
"use client";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
  priceId: string; // You'll need to create this in Stripe Dashboard
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StripeCheckout({ priceId, onSuccess, onCancel }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error('Stripe checkout error:', error);
          onCancel();
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      onCancel();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
    >
      {loading ? 'Processing...' : 'Subscribe Now'}
    </button>
  );
}
EOF

# Create API route for Stripe checkout
mkdir -p src/app/api/create-checkout-session

cat > src/app/api/create-checkout-session/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
      metadata: {
        userId: 'user-123', // Replace with actual user ID
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
EOF

echo "✅ Created monetization components"
echo ""
echo "🎯 Next Steps:"
echo "1. Set up Stripe account at https://stripe.com"
echo "2. Create products and prices in Stripe Dashboard"
echo "3. Update .env.local with your actual API keys"
echo "4. Add authentication (NextAuth setup)"
echo "5. Implement user subscription status checking"
echo "6. Add premium feature gates throughout the app"
echo ""
echo "📚 Resources:"
echo "- Stripe Docs: https://stripe.com/docs"
echo "- NextAuth Docs: https://next-auth.js.org"
echo "- Supabase Docs: https://supabase.com/docs"
echo ""
echo "🚀 Ready to monetize! Check the new components in src/components/"
