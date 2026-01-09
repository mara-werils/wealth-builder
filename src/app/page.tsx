"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine, ReferenceDot
} from 'recharts';
import {
  Calculator, ArrowRightLeft, Target, TrendingUp, DollarSign, BarChart3,
  Shield, Users, Save, Share2, Crown, Lightbulb, Home, Car, CheckCircle2, XCircle, AlertCircle, Sparkles, Briefcase, Wallet, Calendar
} from 'lucide-react';

// Import new components
import PremiumWall from '@/components/PremiumWall';
import ExecutionHub from '@/components/ExecutionHub';
import AIAdvisor from '@/components/AIAdvisor';
import AuthStatus from '@/components/AuthStatus';
import AffiliateWidget from '@/components/AffiliateWidget';
import ViralComponents from '@/components/ViralComponents';
import StructuredData from '@/components/StructuredData';
import DynamicHead from '@/components/DynamicHead';

// --- Types ---
interface DataPoint {
  age: number;
  capital: number;
  salary: number;
  realCapital: number; // Adjusted for inflation
  invested: number; // Total invested
  returns: number; // Returns from market
  isBirthday: boolean;
  requiredInvestment?: number; // Required monthly investment for target goal
  requiredInvestRate?: number; // Required investment rate %
}

type CareerTrack = 'local' | 'global' | 'faang' | 'startup' | 'consulting' | 'finance' | 'healthcare' | 'education';

interface Milestone {
  age: number;
  name: string;
  target: number;
  icon: React.ReactNode;
  color: string;
}

const milestones: Milestone[] = [
  { age: 25, name: 'Первый дом/квартира', target: 150000, icon: <Home />, color: '#6366f1' },
  { age: 27, name: 'Семейный автомобиль', target: 80000, icon: <Car />, color: '#a855f7' },
  { age: 30, name: 'Финансовая свобода', target: 500000, icon: <TrendingUp />, color: '#10b981' },
  { age: 35, name: 'Ранний выход на пенсию', target: 2000000, icon: <Target />, color: '#f59e0b' },
];

const BIRTH_DATE = new Date(2006, 1, 13); // February 13, 2006

// Animated Counter Component
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const motionValue = useMotionValue(value);
  const display = useTransform(motionValue, (latest) =>
    prefix + latest.toFixed(decimals) + suffix
  );

  useEffect(() => {
    animate(motionValue, value, { duration: 0.5, ease: "easeOut" });
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

// Timeline Slider Component
function TimelineSlider({ value, onChange, min, max }: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        style={{
          background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((value - min) / (max - min)) * 100}%, #1e293b ${((value - min) / (max - min)) * 100}%, #1e293b 100%)`
        }}
      />
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((age) => (
          <span key={age} className={age === value ? 'text-indigo-400 font-bold' : ''}>
            {age}
          </span>
        ))}
      </div>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({
  label,
  current,
  target,
  icon,
  color
}: {
  label: string;
  current: number;
  target: number;
  icon: React.ReactNode;
  color: string;
}) {
  const progress = Math.min((current / target) * 100, 100);
  const reached = current >= target;
  const needsMore = current < target;

  const bgColorMap: Record<string, string> = {
    '#6366f1': 'rgba(99, 102, 241, 0.2)',
    '#a855f7': 'rgba(168, 85, 247, 0.2)',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: bgColorMap[color] || 'rgba(99, 102, 241, 0.2)', color }}>
            {icon}
          </div>
          <span className="text-sm font-medium text-slate-300">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            <AnimatedNumber value={current} prefix="$" decimals={0} /> / ${target.toLocaleString()}
          </span>
          {reached ? (
            <CheckCircle2 size={16} className="text-emerald-500" />
          ) : (
            <XCircle size={16} className="text-rose-500" />
          )}
        </div>
      </div>
      <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {needsMore && (
        <p className="text-xs text-amber-400 flex items-center gap-1">
          <AlertCircle size={12} />
          Нужно повысить % инвестиций или сменить трек
        </p>
      )}
    </div>
  );
}

// Motivation Card Component
function MotivationCard({ roadmapData, investmentRate, careerTrack }: {
  roadmapData: DataPoint[];
  investmentRate: number;
  careerTrack: CareerTrack;
}) {
  const capital30 = roadmapData.find(d => d.age === 30)?.capital || 0;
  const homeReached = roadmapData.find(d => d.age === 25)?.capital! >= 150000;
  const carReached = roadmapData.find(d => d.age === 27)?.capital! >= 80000;
  const freedomReached = roadmapData.find(d => d.age === 30)?.capital! >= 500000;

  let message = "";
  let action = "";
  let icon = <Lightbulb className="text-yellow-400" />;
  let borderColor = "rgba(234, 179, 8, 0.2)";
  let bgColor = "rgba(234, 179, 8, 0.1)";

  if (capital30 < 25000) {
    message = "Every journey starts with a single step. Begin by tracking your expenses and creating a budget.";
    action = "Start with a budget tracker";
    icon = <Target className="text-blue-400" />;
    borderColor = "rgba(96, 165, 250, 0.2)";
    bgColor = "rgba(96, 165, 250, 0.1)";
  } else if (capital30 < 75000) {
    message = "Great progress! Focus on building an emergency fund (3-6 months of expenses) before aggressive investing.";
    action = "Build emergency savings";
    icon = <Shield className="text-indigo-400" />;
    borderColor = "rgba(99, 102, 241, 0.2)";
    bgColor = "rgba(99, 102, 241, 0.1)";
  } else if (capital30 < 150000) {
    message = "You're building momentum! Consider increasing your investment rate or exploring higher-growth career opportunities.";
    action = "Optimize investment rate";
    icon = <TrendingUp className="text-emerald-400" />;
    borderColor = "rgba(16, 185, 129, 0.2)";
    bgColor = "rgba(16, 185, 129, 0.1)";
  } else if (!homeReached) {
    message = "Major milestone approaching! Your homeownership goal is within reach with consistent saving.";
    action = "Focus on home savings";
    icon = <Home className="text-purple-400" />;
    borderColor = "rgba(168, 85, 247, 0.2)";
    bgColor = "rgba(168, 85, 247, 0.1)";
  } else if (!carReached) {
    message = "Transportation freedom is next! Keep the momentum going for your vehicle goals.";
    action = "Plan vehicle purchase";
    icon = <Car className="text-orange-400" />;
    borderColor = "rgba(251, 146, 60, 0.2)";
    bgColor = "rgba(251, 146, 60, 0.1)";
  } else if (!freedomReached) {
    message = "Financial independence is closer than you think! Focus on scaling your income and investments.";
    action = "Pursue financial freedom";
    icon = <TrendingUp className="text-green-400" />;
    borderColor = "rgba(34, 197, 94, 0.2)";
    bgColor = "rgba(34, 197, 94, 0.1)";
  } else {
    message = "🎉 Congratulations! You've achieved significant financial milestones. Now focus on maintaining and growing your wealth.";
    action = "Maintain & grow wealth";
    icon = <CheckCircle2 className="text-emerald-400" />;
    borderColor = "rgba(16, 185, 129, 0.2)";
    bgColor = "rgba(16, 185, 129, 0.1)";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl backdrop-blur-sm"
      style={{ border: `1px solid ${borderColor}`, backgroundColor: bgColor }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-200 leading-relaxed mb-2">{message}</p>
          {action && (
            <button className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
              {action} →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Custom Tooltip with Milestone Info
const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as DataPoint;
  const milestone = milestones.find(m => m.age === data.age);

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
      <p className="text-sm font-semibold mb-2">Возраст: {data.age}</p>
      <p className="text-xs text-slate-400 mb-1">
        Капитал: <span className="text-indigo-400 font-mono">${data.capital.toLocaleString()}</span>
      </p>
      <p className="text-xs text-slate-400 mb-1">
        Реальная стоимость: <span className="text-emerald-400 font-mono">${data.realCapital.toLocaleString()}</span>
      </p>
      {data.isBirthday && (
        <div className="mt-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 text-yellow-400">
            <Sparkles size={12} />
            <span className="text-xs font-medium">Level Up! 🎂</span>
          </div>
        </div>
      )}
      {milestone && (
        <div className="mt-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2" style={{ color: milestone.color }}>
            {milestone.icon}
            <span className="text-xs font-medium">{milestone.name}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {data.capital >= milestone.target ? '✅ Достигнуто' : '⏳ В процессе'}
          </p>
        </div>
      )}
    </div>
  );
};

export default function WealthCalculator() {
  // Minimal calculator state
  const [currentAge, setCurrentAge] = useState(25);
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [salaryGrowth, setSalaryGrowth] = useState(8);
  const [investmentRate, setInvestmentRate] = useState(20);
  const [marketReturn, setMarketReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(3);
  const [careerTrack, setCareerTrack] = useState<CareerTrack>('global');
  const [taxJurisdiction, setTaxJurisdiction] = useState('USA');

  // Auth state for premium features
  const { data: session } = useSession();
  const isPremium = session?.user?.email?.includes('premium') || false;

  // Calculate age from birth date
  const getCurrentAge = () => {
    const today = new Date();
    let age = today.getFullYear() - BIRTH_DATE.getFullYear();
    const monthDiff = today.getMonth() - BIRTH_DATE.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < BIRTH_DATE.getDate())) {
      age--;
    }
    return age;
  };

  // Career track salary multipliers - expanded for mass market
  const getCareerMultipliers = (track: CareerTrack, growthPercent: number) => {
    const growth = growthPercent / 100;
    switch (track) {
      case 'local':
        return { base: 1, growth, jumpAge: null, jumpMultiplier: 1, description: 'Традиционная карьера в родной стране' };
      case 'global':
        return { base: 1, growth, jumpAge: 23, jumpMultiplier: 2.5, description: 'Удаленная работа на международные компании' };
      case 'faang':
        return { base: 1.5, growth, jumpAge: 23, jumpMultiplier: 4, description: 'Топовые технологические компании' };
      case 'startup':
        return { base: 0.8, growth: growth * 1.5, jumpAge: 25, jumpMultiplier: 3, description: 'Стартапы с опционами и ростом' };
      case 'consulting':
        return { base: 1.3, growth: growth * 1.2, jumpAge: 28, jumpMultiplier: 2, description: 'Консалтинг и профессиональные услуги' };
      case 'finance':
        return { base: 1.2, growth, jumpAge: 26, jumpMultiplier: 2.2, description: 'Финансы и инвестиционный банкинг' };
      case 'healthcare':
        return { base: 1.1, growth: growth * 0.9, jumpAge: 30, jumpMultiplier: 1.8, description: 'Медицина и здравоохранение' };
      case 'education':
        return { base: 0.9, growth: growth * 0.7, jumpAge: null, jumpMultiplier: 1, description: 'Образование и академическая карьера' };
      default:
        return { base: 1, growth, jumpAge: null, jumpMultiplier: 1, description: 'Стандартная карьера' };
    }
  };

  // Main roadmap calculation
  const roadmapData = useMemo(() => {
    const multipliers = getCareerMultipliers(careerTrack, salaryGrowth);
    let data: DataPoint[] = [];
    let savings = 0;
    let totalInvested = 0;

    for (let age = currentAge; age <= 35; age++) {
      const isBirthday = age === currentAge; // Simplified birthday logic
      const yearsFromStart = age - currentAge;

      // Calculate salary with growth and career jumps
      let monthlySalary = (annualSalary / 12) * multipliers.base;
      if (multipliers.jumpAge && age >= multipliers.jumpAge) {
        monthlySalary *= multipliers.jumpMultiplier;
      }

      // Apply annual growth
      monthlySalary *= Math.pow(1 + multipliers.growth, yearsFromStart);

      // Calculate investment and returns
      const monthlyInvestment = monthlySalary * (investmentRate / 100);
      totalInvested += monthlyInvestment * 12;

      // Compound growth calculation
      for (let month = 0; month < 12; month++) {
        const monthlyReturn = marketReturn / 100 / 12;
        savings = (savings + monthlyInvestment) * (1 + monthlyReturn);
      }

      const realCapital = savings / Math.pow(1 + inflationRate / 100, yearsFromStart);

      data.push({
        age,
        capital: Math.round(savings),
        salary: Math.round(monthlySalary),
        realCapital: Math.round(realCapital),
        invested: Math.round(totalInvested),
        returns: Math.round(savings - totalInvested),
        isBirthday,
      });
    }
    return data;
  }, [currentAge, annualSalary, salaryGrowth, investmentRate, marketReturn, inflationRate, careerTrack, taxJurisdiction]);

  // Comparison data (no investment, just savings)
  const comparisonData = useMemo(() => {
    let data: DataPoint[] = [];
    let savings = 0;
    let monthlySalary = annualSalary;
    const multipliers = getCareerMultipliers(careerTrack, salaryGrowth);
    monthlySalary *= multipliers.base;

    for (let age = currentAge; age <= 35; age++) {
      if (multipliers.jumpAge && age === multipliers.jumpAge) {
        monthlySalary *= multipliers.jumpMultiplier;
      }

      for (let month = 0; month < 12; month++) {
        const saving = monthlySalary * (investmentRate / 100);
        savings += saving; // No compound interest, just stacking
      }

      monthlySalary *= (1 + multipliers.growth);

      const yearsFromStart = age - currentAge;
      const realCapital = savings / Math.pow(1 + inflationRate / 100, yearsFromStart);

      data.push({
        age,
        capital: Math.round(savings),
        salary: Math.round(monthlySalary),
        realCapital: Math.round(realCapital),
        invested: Math.round(savings),
        returns: 0,
        isBirthday: false,
      });
    }
    return data;
  }, [currentAge, annualSalary, salaryGrowth, investmentRate, careerTrack, inflationRate]);

  const capital30 = roadmapData.find(d => d.age === 30)?.capital || 0;
  const capital26 = roadmapData.find(d => d.age === 26)?.capital || 0;
  const capital28 = roadmapData.find(d => d.age === 28)?.capital || 0;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      {/* Dynamic Head Management */}
      <DynamicHead
        careerTrack={careerTrack}
        capital30={capital30}
        investmentRate={investmentRate}
      />

      {/* Structured Data for SEO */}
      <StructuredData
        capital30={capital30}
        careerTrack={careerTrack}
        investmentRate={investmentRate}
        taxJurisdiction={taxJurisdiction}
      />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              WealthBuilder Pro
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-md">
              Build wealth systematically. Plan your career, track investments, and achieve financial freedom.
              <span className="block text-indigo-400 mt-1">For ambitious professionals worldwide.</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg flex items-center gap-2 backdrop-blur-sm">
              <Target size={16} className="text-indigo-400" />
              <span className="text-sm font-medium">Your Wealth Journey</span>
            </div>
            <AuthStatus />
          </div>
        </header>



        {/* Hero Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Plan Your Financial Future
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Calculate your wealth projection based on career growth, investments, and market returns.
          </p>
        </div>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

              <div className="space-y-4">
                {/* Current Age */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Current Age
                  </label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="18"
                    max="65"
                  />
                </div>

                {/* Career Track */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Career Path
                  </label>
                  <select
                    value={careerTrack}
                    onChange={(e) => setCareerTrack(e.target.value as CareerTrack)}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="local">Local Professional</option>
                    <option value="global">Global Remote Worker</option>
                    <option value="faang">Big Tech (FAANG)</option>
                    <option value="startup">Startup Employee</option>
                    <option value="consulting">Management Consultant</option>
                    <option value="finance">Finance Professional</option>
                    <option value="healthcare">Healthcare Worker</option>
                    <option value="education">Academic/Education</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Parameters */}
            <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Financial Parameters</h3>

              <div className="space-y-4">
                {/* Annual Salary */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Annual Salary ($)
                  </label>
                  <input
                    type="number"
                    value={annualSalary}
                    onChange={(e) => setAnnualSalary(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="1000"
                  />
                </div>

                {/* Salary Growth */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Annual Salary Growth (%)
                  </label>
                  <input
                    type="number"
                    value={salaryGrowth}
                    onChange={(e) => setSalaryGrowth(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="50"
                    step="0.5"
                  />
                </div>

                {/* Investment Rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Monthly Investment Rate (%)
                  </label>
                  <input
                    type="number"
                    value={investmentRate}
                    onChange={(e) => setInvestmentRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Market Assumptions */}
            <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Market Assumptions</h3>

              <div className="space-y-4">
                {/* Market Return */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Expected Market Return (%)
                  </label>
                  <input
                    type="number"
                    value={marketReturn}
                    onChange={(e) => setMarketReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="20"
                    step="0.5"
                  />
                </div>

                {/* Inflation Rate */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>

                {/* Tax Jurisdiction */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tax Country
                  </label>
                  <select
                    value={taxJurisdiction}
                    onChange={(e) => setTaxJurisdiction(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-700 placeholder-slate-500 text-white bg-slate-950/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USA">🇺🇸 United States</option>
                    <option value="UK">🇬🇧 United Kingdom</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="UAE">🇦🇪 UAE (Tax-Free)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Restored Sliders Section */}
          <div className="space-y-5 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Стартовая ЗП ($)</span>
                <span className="font-mono text-indigo-400">
                  <AnimatedNumber value={annualSalary} prefix="$" decimals={0} />
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={500000}
                step={1000}
                value={annualSalary}
                onChange={(e) => setAnnualSalary(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Рост ЗП в год (%)</span>
                <span className="font-mono text-indigo-400">
                  <AnimatedNumber value={salaryGrowth} suffix="%" decimals={1} />
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                step={0.5}
                value={salaryGrowth}
                onChange={(e) => setSalaryGrowth(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Доходность S&P 500 (%)</span>
                <span className="font-mono text-indigo-400">
                  <AnimatedNumber value={marketReturn} suffix="%" decimals={1} />
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={marketReturn}
                onChange={(e) => setMarketReturn(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Инфляция (%)</span>
                <span className="font-mono text-slate-500">
                  <AnimatedNumber value={inflationRate} suffix="%" decimals={1} />
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
            </div>
          </div>

          {/* Timeline Slider */}
          <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-slate-300">
              <Calendar size={16} /> Начальный возраст
            </h3>
            <TimelineSlider value={currentAge} onChange={setCurrentAge} min={18} max={60} />
          </div>

          {/* Progress Bars */}
          <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-slate-300">
              <Target size={16} /> Прогресс целей
            </h3>
            <div className="space-y-4">
              <ProgressBar
                label="Квартира (26 лет)"
                current={capital26}
                target={100000}
                icon={<Home size={16} />}
                color="#6366f1"
              />
              <ProgressBar
                label="Lixiang L9 (28 лет)"
                current={capital28}
                target={165000}
                icon={<Car size={16} />}
                color="#a855f7"
              />
            </div>
          </div>

          {/* Motivation Card */}
          <MotivationCard
            roadmapData={roadmapData}
            investmentRate={investmentRate}
            careerTrack={careerTrack}
          />


          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Projected Wealth at Age 35</p>
                    <p className="text-2xl font-bold text-white">
                      ${capital30.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Monthly Passive Income</p>
                    <p className="text-2xl font-bold text-white">
                      ${(Math.round(capital30 * marketReturn / 100 / 12)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Years to $1M</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.max(0, Math.ceil((Math.log(1000000 / (annualSalary * investmentRate / 100 * 12)) / Math.log(1 + marketReturn / 100))))} years
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="bg-slate-900/50 rounded-xl shadow-sm border border-slate-800 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Wealth Projection</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={roadmapData}>
                    <defs>
                      <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="age"
                      stroke="#64748b"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Wealth']}
                      labelFormatter={(label) => `Age ${label}`}
                      contentStyle={{
                        backgroundColor: '#0f172a', /* slate-900 */
                        border: '1px solid #1e293b', /* slate-800 */
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#cbd5e1' /* slate-300 */
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="capital"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorCapital)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Minimal Footer */}
          <footer className="mt-16 pt-8 border-t border-slate-800">
            <div className="text-center text-sm text-slate-500">
              <p>Free wealth calculator. Built for ambitious professionals.</p>
              {!isPremium && (
                <button
                  onClick={() => typeof window !== 'undefined' && (window.location.href = '/auth/signin')}
                  className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Upgrade to Premium →
                </button>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>

  );
}
