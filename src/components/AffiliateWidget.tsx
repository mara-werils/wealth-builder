"use client";
import React from 'react';
import { TrendingUp, Shield, DollarSign, Target, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface AffiliateWidgetProps {
  marketReturn: number;
  yearsToGoal: number;
  investRate: number;
}

export default function AffiliateWidget({ marketReturn, yearsToGoal, investRate }: AffiliateWidgetProps) {
  // Dynamic recommendations based on calculation results
  const getRecommendations = () => {
    const recommendations = [];

    // High return strategy - recommend brokerages
    if (marketReturn > 7) {
      recommendations.push({
        title: "Best Brokerages for High Returns",
        description: "Low-fee platforms for active traders",
        type: "brokerage",
        items: [
          { name: "Interactive Brokers", fee: "$0 commissions", affiliate: "Get $500 bonus" },
          { name: "TradeStation", fee: "$0.50/trade", affiliate: "Free research tools" },
          { name: "Thinkorswim (TD Ameritrade)", fee: "$0 commissions", affiliate: "Advanced charting" }
        ],
        icon: <TrendingUp className="w-5 h-5" />,
        color: "emerald"
      });
    }

    // Conservative strategy - recommend savings/bonds
    if (marketReturn < 6) {
      recommendations.push({
        title: "High-Yield Savings Accounts",
        description: "Safe places for your emergency fund",
        type: "savings",
        items: [
          { name: "Marcus by Goldman Sachs", rate: "4.5% APY", affiliate: "No fees" },
          { name: "Ally Bank", rate: "4.25% APY", affiliate: "Online banking" },
          { name: "Capital One 360", rate: "4.1% APY", affiliate: "Mobile app" }
        ],
        icon: <Shield className="w-5 h-5" />,
        color: "blue"
      });
    }

    // Quick goal achievement - recommend tax strategies
    if (yearsToGoal < 10) {
      recommendations.push({
        title: "Tax Optimization Services",
        description: "Maximize your investment returns",
        type: "tax",
        items: [
          { name: "TurboTax", service: "Tax filing software", affiliate: "Save up to $15" },
          { name: "Taxfyle", service: "Tax professional network", affiliate: "Certified CPAs" },
          { name: "Bench Accounting", service: "Bookkeeping & tax prep", affiliate: "For freelancers" }
        ],
        icon: <DollarSign className="w-5 h-5" />,
        color: "purple"
      });
    }

    // High investment rate - recommend financial planning
    if (investRate > 30) {
      recommendations.push({
        title: "Professional Financial Advisors",
        description: "Expert guidance for serious investors",
        type: "advisor",
        items: [
          { name: "Betterment", service: "Robo-advisor", affiliate: "Low fees, no minimums" },
          { name: "Wealthfront", service: "Automated investing", affiliate: "Tax-loss harvesting" },
          { name: "Personal Capital", service: "Free financial dashboard", affiliate: "Portfolio tracking" }
        ],
        icon: <Target className="w-5 h-5" />,
        color: "indigo"
      });
    }

    return recommendations;
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 bg-${rec.color}-500/20 rounded-lg`}>
              <div className={`text-${rec.color}-400`}>{rec.icon}</div>
            </div>
            <div>
              <h3 className="font-semibold text-white">{rec.title}</h3>
              <p className="text-sm text-slate-400">{rec.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            {rec.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div>
                  <div className="font-medium text-white text-sm">{item.name}</div>
                  <div className="text-xs text-slate-400">
                    {'rate' in item && `${item.rate}`}
                    {'fee' in item && `${item.fee}`}
                    {'service' in item && item.service}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-400 font-medium">{item.affiliate}</div>
                  <button className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors flex items-center gap-1">
                    Learn More
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Google AdSense Sidebar Slot */}
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-slate-500 text-xs text-center mb-2">Sponsored</div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-slate-400 text-center">
              [Google AdSense - 300x250]
            </div>
          </div>
        </motion.div>
      ))}

      {/* AdSense Results Card Slot */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
        <div className="text-slate-500 text-xs text-center mb-2">Advertisement</div>
        <div className="bg-slate-800/50 rounded-lg p-6 text-slate-400 text-center">
          [Google AdSense - Results Card]
          <br />
          <span className="text-xs">Targeted financial ads based on your calculations</span>
        </div>
      </div>
    </div>
  );
}
