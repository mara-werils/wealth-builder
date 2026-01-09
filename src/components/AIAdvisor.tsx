"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Send, Bot, User, Sparkles, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAdvisorProps {
  currentScenario: any;
  isPremium: boolean;
  taxJurisdiction?: string;
}

export default function AIAdvisor({ currentScenario, isPremium, taxJurisdiction = 'USA' }: AIAdvisorProps) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI Wealth Co-Pilot. I can see you've set up a financial plan with a ${currentScenario.careerTrack} career path, ${currentScenario.investRate}% investment rate, and you're planning for the ${taxJurisdiction} tax jurisdiction.

Based on similar users in your career track and tax situation, you're on track to reach $${currentScenario.capital30?.toLocaleString() || '500k'} by age 30. That's ${currentScenario.capital30 > 500000 ? 'excellent' : 'solid'} progress!

I can help you optimize for taxes, find better investment strategies, or explore career opportunities. What would you like to focus on?`,
      timestamp: new Date(),
      suggestions: [
        'How can I increase my investment rate?',
        'What about tax optimization?',
        'Career change opportunities?',
        'Emergency fund strategy'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses based on user input
  const getAIResponse = (userMessage: string): { content: string; suggestions: string[] } => {
    const message = userMessage.toLowerCase();

    if (message.includes('tax') || message.includes('налог')) {
      return {
        content: `Tax optimization is crucial for wealth building! Based on your current scenario:

• **Standard Deductions**: Maximize contributions to retirement accounts (401k/IRA)
• **Capital Gains**: Consider tax-loss harvesting strategies
• **State Taxes**: Your location affects tax burden significantly
• **Investment Vehicles**: Roth vs Traditional accounts have different tax implications

For your income level and career path, you could potentially save $5,000-$15,000 annually in taxes with proper planning. Would you like me to show you specific strategies for your situation?`,
        suggestions: ['Show me Roth vs Traditional', 'State tax comparison', 'Retirement account options']
      };
    }

    if (message.includes('investment') || message.includes('инвестиц') || message.includes('rate')) {
      const maxSafeRate = Math.min(currentScenario.initialSalary * 0.4, 3000);
      return {
        content: `Your current investment rate is ${currentScenario.investRate}%, which puts you at $${Math.round(currentScenario.initialSalary * currentScenario.investRate / 100)}/month.

**Analysis of your investment strategy:**
• Current monthly investment: $${Math.round(currentScenario.initialSalary * currentScenario.investRate / 100)}
• Maximum sustainable rate: $${maxSafeRate}/month (40% of take-home)
• Room for improvement: ${maxSafeRate - Math.round(currentScenario.initialSalary * currentScenario.investRate / 100) > 0 ? '+' + (maxSafeRate - Math.round(currentScenario.initialSalary * currentScenario.investRate / 100)) + '/month' : 'at limit'}

**Recommendations:**
1. **Increase gradually**: Add $50-100/month every 3 months
2. **Automate transfers**: Set up automatic investment deposits
3. **Emergency fund first**: Ensure 3-6 months expenses before increasing

This could accelerate your wealth building by 1-2 years!`,
        suggestions: ['Set up auto-investment', 'Emergency fund strategy', 'Investment portfolio advice']
      };
    }

    if (message.includes('career') || message.includes('работа') || message.includes('change')) {
      return {
        content: `Career optimization can dramatically impact your wealth trajectory! Looking at your current ${currentScenario.careerTrack} path:

**Performance vs Peers:**
• Your salary growth: ${currentScenario.salaryGrowth}% annually
• Industry average: ${currentScenario.careerTrack === 'faang' ? '18' : currentScenario.careerTrack === 'startup' ? '22' : '12'}%
• Your ranking: Top ${Math.floor(Math.random() * 30) + 10}% in your peer group

**High-Impact Opportunities:**
• **Skill Development**: Learning AI/ML could increase salary by 30-50%
• **Location Change**: Moving to high-cost areas could boost earnings
• **Startup Equity**: Joining early-stage startups for equity upside
• **Consulting**: High hourly rates with flexible schedules

**Prediction**: With optimized career moves, you could reach your goals 2-3 years faster than your current trajectory.`,
        suggestions: ['Skill development plan', 'Location salary comparison', 'Startup opportunities']
      };
    }

    if (message.includes('emergency') || message.includes('fund') || message.includes('аварийный')) {
      return {
        content: `Emergency fund strategy is one of the most important aspects of financial planning!

**Your Current Status:**
• Recommended fund size: 3-6 months of expenses
• Current savings: $${Math.min(currentScenario.capital30 * 0.1, 15000).toLocaleString()} (estimated)
• Monthly expenses: $${Math.round(currentScenario.initialSalary * 0.7).toLocaleString()} (estimated)
• Fund completion: ${Math.min((Math.min(currentScenario.capital30 * 0.1, 15000) / (currentScenario.initialSalary * 0.7 * 3)) * 100, 100).toFixed(0)}%

**Smart Strategy:**
1. **Build gradually**: Save 10-15% of income until 3x monthly expenses
2. **High-yield savings**: Keep in 4-5% APY accounts
3. **Separate account**: Don't mix with regular savings
4. **Replenish after use**: Always rebuild after withdrawals

Once your emergency fund is complete, you can significantly increase your investment rate!`,
        suggestions: ['High-yield savings accounts', 'Emergency fund calculator', 'Expense tracking tips']
      };
    }

    // Default response
    return {
      content: `I understand you're asking about "${userMessage}". Based on your financial profile and goals, here's what I recommend:

**Key Insights from Your Data:**
• Current trajectory: $${currentScenario.capital30?.toLocaleString() || '500k'} by age 30
• Investment efficiency: ${currentScenario.investRate > 20 ? 'Excellent' : currentScenario.investRate > 15 ? 'Good' : 'Needs improvement'}
• Risk tolerance: ${currentScenario.careerTrack === 'startup' ? 'High' : currentScenario.careerTrack === 'faang' ? 'Medium-High' : 'Conservative'}

**Personalized Recommendations:**
1. **Optimize tax strategy** - Could save you $5k-10k annually
2. **Increase investment rate gradually** - Room for ${Math.max(0, 25 - currentScenario.investRate)}% more
3. **Consider career acceleration** - Could reach goals 1-2 years faster

What specific aspect would you like me to dive deeper into?`,
      suggestions: ['Tax optimization', 'Investment strategy', 'Career advancement', 'Risk management']
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Wealth Advisor</h3>
            <p className="text-sm text-slate-400">Your personal financial co-pilot</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-slate-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-indigo-400" />
                  )}
                  <span className="text-xs text-slate-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.suggestions && message.role === 'assistant' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-xs rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-400" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-800/50 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {!isPremium && (
          <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-xs text-yellow-300 text-center">
              💡 Upgrade to Premium for unlimited AI conversations and personalized financial insights
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
