"use client";
import React, { useState } from 'react';
import { Share2, TrendingUp, Users, Target, Download, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViralComponentsProps {
  capital30: number;
  careerTrack: string;
  investRate: number;
}

export default function ViralComponents({ capital30, careerTrack, investRate }: ViralComponentsProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  // Calculate comparison metrics
  const averageAmericanSavings = 65000; // Average retirement savings for 25-34 age group
  const percentile = Math.min(95, Math.max(5, (capital30 / 200000) * 100)); // Rough percentile calculation

  const shareMessage = `🚀 I just calculated my wealth projection using WealthBuilder Pro!

📊 Projected wealth at age 30: $${capital30.toLocaleString()}
💼 Career track: ${careerTrack.charAt(0).toUpperCase() + careerTrack.slice(1)}
📈 Investment rate: ${investRate}%

I'm in the top ${percentile.toFixed(0)}% of wealth builders in my peer group!

Check out your financial future: ${typeof window !== 'undefined' ? window.location.href : 'https://wealthbuilder.pro'}`;

  const handleShare = (platform: string) => {
    let url = '';
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://wealthbuilder.pro');

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      default:
        navigator.clipboard.writeText(shareMessage);
        alert('Link copied to clipboard!');
        return;
    }

    typeof window !== 'undefined' && window.open(url, '_blank', 'width=600,height=400');
  };

  const generateSocialPreview = () => {
    // In a real app, this would generate an OpenGraph image
    return `https://wealthbuilder.pro/api/og?wealth=${capital30}&career=${careerTrack}&rate=${investRate}`;
  };

  return (
    <div className="space-y-4">
      {/* FOMO Comparison Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">How You Compare</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">${capital30.toLocaleString()}</div>
            <div className="text-sm text-slate-400">Your Projection</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-400">${averageAmericanSavings.toLocaleString()}</div>
            <div className="text-sm text-slate-500">Average American</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">Top {percentile.toFixed(0)}%</div>
            <div className="text-sm text-slate-400">Your Percentile</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-sm text-orange-300 text-center">
            💡 You're ahead of {percentile.toFixed(0)}% of your peers. Share your success story!
          </p>
        </div>
      </motion.div>

      {/* Share Growth Plan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Share Your Growth Plan</h3>
          </div>
          <Award className="w-5 h-5 text-yellow-400" />
        </div>

        <p className="text-slate-300 mb-4">
          Generate a beautiful social preview of your wealth projection and inspire your network!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <span className="text-sm">Twitter</span>
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
          >
            <span className="text-sm">LinkedIn</span>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <span className="text-sm">Facebook</span>
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <span className="text-sm">Copy Link</span>
          </button>
        </div>

        {/* Achievement Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {capital30 > 100000 && (
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
              💰 $100k+ Achiever
            </span>
          )}
          {investRate > 20 && (
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
              📈 High Saver
            </span>
          )}
          {percentile > 80 && (
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
              🏆 Top Performer
            </span>
          )}
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 text-center"
      >
        <Users className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Join 50,000+ Wealth Builders</h3>
        <p className="text-slate-400 mb-4">
          See how you stack up against others in your career path and get inspired by success stories.
        </p>
        <button
          onClick={() => typeof window !== 'undefined' && (window.location.href = '/auth/signin')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Join Community
        </button>
      </motion.div>
    </div>
  );
}
