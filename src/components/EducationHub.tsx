"use client";
import React, { useState } from 'react';
import { BookOpen, Play, Lightbulb, TrendingUp, Shield, Target, DollarSign, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  type: 'article' | 'video' | 'interactive';
  isPremium: boolean;
}

interface EducationHubProps {
  currentScenario: any;
  isPremium: boolean;
}

export default function EducationHub({ currentScenario, isPremium }: EducationHubProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLesson, setShowLesson] = useState<string | null>(null);

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'The Power of Compound Interest',
      description: 'Why starting early and staying consistent beats trying to time the market.',
      category: 'basics',
      difficulty: 'beginner',
      duration: '5 min read',
      type: 'article',
      isPremium: false,
    },
    {
      id: '2',
      title: 'Choosing Your Career Path',
      description: 'How different career choices impact your wealth-building potential.',
      category: 'career',
      difficulty: 'beginner',
      duration: '8 min read',
      type: 'article',
      isPremium: false,
    },
    {
      id: '3',
      title: 'Emergency Fund & Risk Management',
      description: 'Build a safety net and protect your wealth from unexpected setbacks.',
      category: 'risk',
      difficulty: 'beginner',
      duration: '10 min read',
      type: 'article',
      isPremium: false,
    },
    {
      id: '4',
      title: 'Tax Optimization Strategies',
      description: 'Legal ways to minimize taxes and maximize your take-home pay.',
      category: 'taxes',
      difficulty: 'intermediate',
      duration: '15 min read',
      type: 'article',
      isPremium: true,
    },
    {
      id: '5',
      title: 'Building Multiple Income Streams',
      description: 'From side hustles to passive income: diversifying beyond your main job.',
      category: 'income',
      difficulty: 'intermediate',
      duration: '20 min video',
      type: 'video',
      isPremium: true,
    },
    {
      id: '6',
      title: 'Real Estate Investment Guide',
      description: 'When and how to start investing in property for long-term wealth.',
      category: 'investing',
      difficulty: 'intermediate',
      duration: '18 min video',
      type: 'video',
      isPremium: true,
    },
    {
      id: '7',
      title: 'Retirement Planning 101',
      description: 'Build a nest egg that will support your lifestyle in retirement.',
      category: 'retirement',
      difficulty: 'intermediate',
      duration: '12 min read',
      type: 'article',
      isPremium: false,
    },
    {
      id: '8',
      title: 'Investment Portfolio Construction',
      description: 'How to build a diversified portfolio that matches your risk tolerance.',
      category: 'investing',
      difficulty: 'advanced',
      duration: '25 min video',
      type: 'video',
      isPremium: true,
    },
    {
      id: '9',
      title: 'Debt Management Strategies',
      description: 'Good debt vs bad debt, and how to eliminate high-interest obligations.',
      category: 'debt',
      difficulty: 'beginner',
      duration: '8 min read',
      type: 'article',
      isPremium: false,
    },
    {
      id: '10',
      title: 'Entrepreneurship & Wealth Building',
      description: 'Starting a business while maintaining financial stability.',
      category: 'business',
      difficulty: 'advanced',
      duration: '30 min video',
      type: 'video',
      isPremium: true,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'basics', name: 'Getting Started', icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'career', name: 'Career Planning', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'investing', name: 'Investing', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'debt', name: 'Debt & Saving', icon: <Shield className="w-4 h-4" /> },
    { id: 'income', name: 'Side Income', icon: <Target className="w-4 h-4" /> },
    { id: 'retirement', name: 'Retirement', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'business', name: 'Business', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const filteredLessons = selectedCategory === 'all'
    ? lessons
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'interactive': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const personalizedRecommendations = () => {
    const recommendations = [];

    if (currentScenario.investRate < 20) {
      recommendations.push({
        title: "Increase Your Investment Rate",
        description: "You're investing less than 20% of your salary. Learn why this matters.",
        lessonId: "1",
        priority: "high"
      });
    }

    if (currentScenario.careerTrack === 'local') {
      recommendations.push({
        title: "Consider Global Opportunities",
        description: "Global remote work could significantly boost your career trajectory.",
        lessonId: "2",
        priority: "medium"
      });
    }

    if (currentScenario.capital30 < 200000) {
      recommendations.push({
        title: "Explore Multiple Income Streams",
        description: "Building wealth faster through diversification.",
        lessonId: "5",
        priority: "medium"
      });
    }

    return recommendations;
  };

  return (
    <div className="space-y-6">
      {/* Personalized Recommendations */}
      {personalizedRecommendations().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Personalized Recommendations
          </h3>

          <div className="space-y-3">
            {personalizedRecommendations().map((rec, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{rec.title}</h4>
                  <p className="text-sm text-slate-400">{rec.description}</p>
                </div>
                <button
                  onClick={() => setShowLesson(rec.lessonId)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className={`bg-slate-900/50 border rounded-xl p-4 hover:border-slate-600 transition-colors ${
              lesson.isPremium ? 'border-purple-500/30' : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${lesson.isPremium ? 'bg-purple-500/20' : 'bg-slate-800'}`}>
                {getTypeIcon(lesson.type)}
              </div>
              {lesson.isPremium && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  Premium
                </span>
              )}
            </div>

            <h3 className="font-semibold text-white mb-2 line-clamp-2">{lesson.title}</h3>
            <p className="text-sm text-slate-400 mb-3 line-clamp-3">{lesson.description}</p>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span className={`px-2 py-1 rounded ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
              <span>{lesson.duration}</span>
            </div>

            <button
              onClick={() => {
                if (lesson.isPremium && !isPremium) {
                  // Show upgrade modal
                  alert('This is a premium lesson. Upgrade to access!');
                } else {
                  setShowLesson(lesson.id);
                }
              }}
              className={`w-full py-2 px-4 rounded-lg transition-colors text-sm font-medium ${
                lesson.isPremium && !isPremium
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {lesson.isPremium && !isPremium ? 'Upgrade to Access' : 'Start Learning'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Lesson Modal */}
      {showLesson && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLesson(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {lessons.find(l => l.id === showLesson)?.title}
              </h2>
              <button
                onClick={() => setShowLesson(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-slate-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Lesson Content</h3>
                <p className="text-slate-300 leading-relaxed">
                  This is a placeholder for the actual lesson content. In a real implementation,
                  this would contain comprehensive educational material about financial planning,
                  career development, and wealth building strategies specifically tailored for
                  ML engineers and tech professionals.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Key Takeaways</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Time in the market beats timing the market</li>
                      <li>• Consistent investing compounds over time</li>
                      <li>• Career choices dramatically impact wealth</li>
                    </ul>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Action Items</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Calculate your optimal investment rate</li>
                      <li>• Research career advancement opportunities</li>
                      <li>• Set up automatic investment transfers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-300 mb-2">Apply This Knowledge</h4>
                <p className="text-slate-300 text-sm">
                  Use the insights from this lesson to adjust your financial plan.
                  Consider how these principles apply to your current career trajectory and investment strategy.
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLesson(null)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Complete Lesson
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
