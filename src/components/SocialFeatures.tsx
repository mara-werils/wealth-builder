"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Trophy, Users, TrendingUp, Target, Share2, MessageCircle, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserScenario {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  scenarioName: string;
  finalCapital: number;
  years: number;
  likes: number;
  views: number;
  createdAt: Date;
  isPublic: boolean;
}

interface SocialFeaturesProps {
  currentScenario: {
    capital30: number;
    years: number;
    scenarioName: string;
  };
  onShareScenario: () => void;
}

export default function SocialFeatures({ currentScenario, onShareScenario }: SocialFeaturesProps) {
  const { data: session } = useSession();
  const [leaderboard, setLeaderboard] = useState<UserScenario[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showComparisons, setShowComparisons] = useState(false);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockLeaderboard: UserScenario[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Alex Chen',
        scenarioName: 'FAANG Path to $500k',
        finalCapital: 487000,
        years: 10,
        likes: 24,
        views: 156,
        createdAt: new Date('2024-01-15'),
        isPublic: true,
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Sarah Kim',
        scenarioName: 'Global Remote Journey',
        finalCapital: 342000,
        years: 8,
        likes: 18,
        views: 92,
        createdAt: new Date('2024-01-12'),
        isPublic: true,
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Mike Johnson',
        scenarioName: 'Local to FAANG',
        finalCapital: 298000,
        years: 9,
        likes: 15,
        views: 78,
        createdAt: new Date('2024-01-10'),
        isPublic: true,
      },
    ];
    setLeaderboard(mockLeaderboard);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRankBadge = (index: number) => {
    const badges = ['🥇', '🥈', '🥉'];
    return index < 3 ? badges[index] : `#${index + 1}`;
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowLeaderboard(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
        >
          <Trophy className="w-4 h-4" />
          Leaderboard
        </button>

        <button
          onClick={() => setShowComparisons(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
        >
          <Users className="w-4 h-4" />
          Compare Scenarios
        </button>

        <button
          onClick={onShareScenario}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share My Scenario
        </button>
      </div>

      {/* Current Scenario Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
      >
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Your Current Scenario
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-400">
              {formatCurrency(currentScenario.capital30)}
            </p>
            <p className="text-xs text-slate-400">Capital at 30</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {currentScenario.years}
            </p>
            <p className="text-xs text-slate-400">Years</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {(currentScenario.capital30 / currentScenario.years / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-slate-400">Avg/Year</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">
              #{leaderboard.filter(s => s.finalCapital > currentScenario.capital30).length + 1}
            </p>
            <p className="text-xs text-slate-400">Rank</p>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLeaderboard(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Global Leaderboard
              </h2>
              <span className="text-sm text-slate-400">Top Wealth Builders</span>
            </div>

            <div className="space-y-3">
              {leaderboard.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-slate-800 border rounded-lg p-4 hover:border-slate-600 transition-colors ${
                    index < 3 ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl ${index < 3 ? 'animate-bounce' : ''}`}>
                        {getRankBadge(index)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">{scenario.scenarioName}</h3>
                        <p className="text-sm text-slate-400">by {scenario.userName}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-indigo-400">
                        {formatCurrency(scenario.finalCapital)}
                      </p>
                      <p className="text-xs text-slate-500">in {scenario.years} years</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {scenario.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {scenario.views}
                      </span>
                      <span>{new Date(scenario.createdAt).toLocaleDateString()}</span>
                    </div>

                    <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <p className="text-sm text-indigo-300 text-center">
                Share your scenario to climb the leaderboard! 🏆
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLeaderboard(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Comparisons Modal */}
      {showComparisons && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowComparisons(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Scenario Comparisons
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...leaderboard.slice(0, 5), {
                id: 'current',
                userId: session?.user?.email || 'current',
                userName: session?.user?.name || 'You',
                scenarioName: currentScenario.scenarioName || 'Your Scenario',
                finalCapital: currentScenario.capital30,
                years: currentScenario.years,
                likes: 0,
                views: 0,
                createdAt: new Date(),
                isPublic: false,
              }].map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-slate-800 border rounded-lg p-4 ${
                    scenario.id === 'current' ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white truncate">{scenario.scenarioName}</h3>
                    {scenario.id === 'current' && (
                      <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded">Yours</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Final Capital:</span>
                      <span className="text-indigo-400 font-semibold">
                        {formatCurrency(scenario.finalCapital)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Years:</span>
                      <span className="text-white">{scenario.years}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg/Year:</span>
                      <span className="text-emerald-400">
                        {formatCurrency(scenario.finalCapital / scenario.years)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-xs text-slate-500">by {scenario.userName}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-800 rounded-lg">
              <h3 className="font-semibold text-white mb-3">Insights</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Top performers focus on FAANG career tracks</li>
                <li>• Consistent 20-25% investment rates yield best results</li>
                <li>• Early career jumps significantly impact long-term wealth</li>
                <li>• Your scenario ranks #{leaderboard.filter(s => s.finalCapital > currentScenario.capital30).length + 1} globally</li>
              </ul>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowComparisons(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
