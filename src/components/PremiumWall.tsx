"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Crown, Zap, Download, TrendingUp, Shield, Users, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PremiumWallProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function PremiumWall({ feature, children, fallback }: PremiumWallProps) {
  const { data: session, status } = useSession();
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Mock premium status - in real app, check from database
  const isPremium = session?.user?.email?.includes('premium') || false;

  if (status === 'loading') {
    return <div className="animate-pulse bg-slate-800 h-32 rounded-lg"></div>;
  }

  if (isPremium) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="space-y-4">
      {/* Premium Teaser */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-6 h-6 text-yellow-400" />
          <span className="text-lg font-semibold text-white">Premium Feature</span>
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">Locked</span>
        </div>

        <p className="text-slate-300 mb-4">
          Unlock <strong>{feature}</strong> and get access to unlimited scenarios, advanced analytics, and priority support.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUpgrade(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-105"
          >
            <Star className="w-4 h-4" />
            Upgrade to Premium
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-sm text-slate-400">$9.99/month</span>
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUpgrade(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Upgrade to Premium</h2>
              <p className="text-slate-400">Get unlimited access to all features</p>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { icon: <Zap />, text: "Unlimited financial scenarios" },
                { icon: <Download />, text: "Advanced export options (PDF, Excel)" },
                { icon: <TrendingUp />, text: "Detailed portfolio analytics" },
                { icon: <Shield />, text: "Priority customer support" },
                { icon: <Users />, text: "Team collaboration features" },
                { icon: <Star />, text: "Exclusive premium templates" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  // Mock upgrade - in real app, redirect to Stripe
                  alert('Redirecting to payment...');
                  setShowUpgrade(false);
                }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Upgrade Now - $9.99/month
              </button>

              <button
                onClick={() => setShowUpgrade(false)}
                className="w-full text-slate-400 hover:text-white transition-colors"
              >
                Maybe Later
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              30-day money-back guarantee • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
