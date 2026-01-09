"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Banknote, CreditCard, TrendingUp, Shield, Zap, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExecutionHubProps {
  currentScenario: any;
  isPremium: boolean;
}

interface BankAccount {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'investment';
  connected: boolean;
}

interface InvestmentAccount {
  id: string;
  name: string;
  broker: string;
  balance: number;
  connected: boolean;
  autoInvest: boolean;
}

export default function ExecutionHub({ currentScenario, isPremium }: ExecutionHubProps) {
  const { data: session } = useSession();
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { id: '1', name: 'Main Checking', balance: 2850, type: 'checking', connected: true },
    { id: '2', name: 'Emergency Fund', balance: 12000, type: 'savings', connected: true },
  ]);

  const [investmentAccounts, setInvestmentAccounts] = useState<InvestmentAccount[]>([
    { id: '1', name: 'Robinhood Account', broker: 'Robinhood', balance: 15420, connected: false, autoInvest: false },
    { id: '2', name: 'Vanguard IRA', broker: 'Vanguard', balance: 45680, connected: false, autoInvest: true },
  ]);

  const [showConnectBank, setShowConnectBank] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const executionStrategies = [
    {
      id: 'conservative',
      name: 'Conservative Growth',
      description: 'Bonds & stable ETFs',
      risk: 'Low',
      expectedReturn: '4-6%',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 'balanced',
      name: 'Balanced Portfolio',
      description: '60% stocks, 40% bonds',
      risk: 'Medium',
      expectedReturn: '6-8%',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: 'growth',
      name: 'Growth Focus',
      description: 'Tech & growth stocks',
      risk: 'High',
      expectedReturn: '8-12%',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: 'aggressive',
      name: 'Aggressive Tech',
      description: 'FAANG & AI companies',
      risk: 'Very High',
      expectedReturn: '12-18%',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const handleConnectBank = (accountId: string) => {
    setBankAccounts(accounts =>
      accounts.map(acc =>
        acc.id === accountId ? { ...acc, connected: true } : acc
      )
    );
    setShowConnectBank(false);
  };

  const handleConnectBroker = (accountId: string) => {
    setInvestmentAccounts(accounts =>
      accounts.map(acc =>
        acc.id === accountId ? { ...acc, connected: true } : acc
      )
    );
  };

  const handleAutoInvest = (strategyId: string, amount: number) => {
    if (!isPremium) {
      alert('Auto-invest requires Premium subscription');
      return;
    }

    // Mock auto-invest execution
    alert(`Setting up auto-investment of $${amount}/month into ${strategyId} strategy`);
    setSelectedStrategy(strategyId);
  };

  const totalBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalInvestments = investmentAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const recommendedMonthlyInvest = Math.round(currentScenario.investRate * currentScenario.initialSalary / 100);

  return (
    <div className="space-y-6">
      {/* Header with Balance Overview */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Banknote className="w-5 h-5" />
          Your Money Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-400">Bank Accounts</span>
            </div>
            <p className="text-2xl font-bold text-white">${totalBalance.toLocaleString()}</p>
            <p className="text-xs text-slate-500">{bankAccounts.filter(a => a.connected).length} connected</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-slate-400">Investments</span>
            </div>
            <p className="text-2xl font-bold text-white">${totalInvestments.toLocaleString()}</p>
            <p className="text-xs text-slate-500">{investmentAccounts.filter(a => a.connected).length} connected</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-400">Auto-Invest</span>
            </div>
            <p className="text-2xl font-bold text-white">${recommendedMonthlyInvest}/mo</p>
            <p className="text-xs text-slate-500">Recommended</p>
          </div>
        </div>
      </div>

      {/* Bank Account Connections */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Bank Accounts</h3>
          <button
            onClick={() => setShowConnectBank(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
          >
            Connect Bank
          </button>
        </div>

        <div className="space-y-3">
          {bankAccounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${account.connected ? 'bg-green-400' : 'bg-red-400'}`} />
                <div>
                  <p className="font-medium text-white">{account.name}</p>
                  <p className="text-sm text-slate-400 capitalize">{account.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">${account.balance.toLocaleString()}</p>
                <p className="text-xs text-slate-500">
                  {account.connected ? 'Connected' : 'Not Connected'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {!isPremium && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Bank connections require Premium subscription
            </p>
          </div>
        )}
      </div>

      {/* Investment Strategies */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Auto-Invest Strategies</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {executionStrategies.map((strategy) => (
            <motion.div
              key={strategy.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedStrategy === strategy.id
                  ? 'bg-indigo-600/20 border-indigo-500'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => setSelectedStrategy(strategy.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-indigo-400">{strategy.icon}</div>
                <div>
                  <h4 className="font-medium text-white">{strategy.name}</h4>
                  <p className="text-xs text-slate-400">{strategy.risk} Risk</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-2">{strategy.description}</p>
              <p className="text-sm font-semibold text-green-400">Expected: {strategy.expectedReturn}</p>
            </motion.div>
          ))}
        </div>

        {selectedStrategy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4"
          >
            <h4 className="font-medium text-white mb-3">Execute Auto-Investment</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm text-slate-300 mb-2">
                  Monthly Investment Amount
                </label>
                <input
                  type="number"
                  defaultValue={recommendedMonthlyInvest}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={() => handleAutoInvest(selectedStrategy, recommendedMonthlyInvest)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Start Auto-Invest
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Broker Connections */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Investment Accounts</h3>

        <div className="space-y-3">
          {investmentAccounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${account.connected ? 'bg-green-400' : 'bg-red-400'}`} />
                <div>
                  <p className="font-medium text-white">{account.name}</p>
                  <p className="text-sm text-slate-400">{account.broker}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-white">${account.balance.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">
                    {account.connected ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
                {!account.connected && (
                  <button
                    onClick={() => handleConnectBroker(account.id)}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                  >
                    Connect
                  </button>
                )}
                {account.autoInvest && (
                  <div title="Auto-invest enabled">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 Connect your brokerage accounts to enable one-click investing and real-time portfolio tracking
          </p>
        </div>
      </div>

      {/* Connect Bank Modal */}
      {showConnectBank && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowConnectBank(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Connect Bank Account</h3>

            <div className="space-y-3">
              {['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'Capital One'].map((bank) => (
                <button
                  key={bank}
                  onClick={() => handleConnectBank('new')}
                  className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left"
                >
                  <p className="font-medium text-white">{bank}</p>
                  <p className="text-sm text-slate-400">Secure connection via Plaid</p>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-400">
                🔒 Your data is encrypted and secure. We use bank-level security standards.
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowConnectBank(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
