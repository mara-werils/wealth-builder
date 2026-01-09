"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Save, FolderOpen, Trash2, Star, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface Scenario {
  id: string;
  name: string;
  description: string;
  data: any;
  createdAt: Date;
  isFavorite: boolean;
}

interface ScenarioManagerProps {
  currentScenario: any;
  onLoadScenario: (scenario: any) => void;
}

export default function ScenarioManager({ currentScenario, onLoadScenario }: ScenarioManagerProps) {
  const { data: session } = useSession();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');

  // Load scenarios from localStorage (mock - in real app, from database)
  useEffect(() => {
    const saved = localStorage.getItem('savedScenarios');
    if (saved) {
      setScenarios(JSON.parse(saved));
    }
  }, []);

  // Save scenarios to localStorage
  const saveScenarios = (newScenarios: Scenario[]) => {
    localStorage.setItem('savedScenarios', JSON.stringify(newScenarios));
    setScenarios(newScenarios);
  };

  const handleSaveScenario = () => {
    if (!scenarioName.trim()) return;

    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: scenarioName,
      description: scenarioDescription,
      data: currentScenario,
      createdAt: new Date(),
      isFavorite: false,
    };

    const updatedScenarios = [...scenarios, newScenario];
    saveScenarios(updatedScenarios);

    setScenarioName('');
    setScenarioDescription('');
    setShowSaveDialog(false);
  };

  const handleDeleteScenario = (id: string) => {
    const updatedScenarios = scenarios.filter(s => s.id !== id);
    saveScenarios(updatedScenarios);
  };

  const handleToggleFavorite = (id: string) => {
    const updatedScenarios = scenarios.map(s =>
      s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
    );
    saveScenarios(updatedScenarios);
  };

  const handleExportScenario = (scenario: Scenario) => {
    const dataStr = JSON.stringify(scenario, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${scenario.name}.json`;
    link.click();
  };

  const handleImportScenario = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const scenario: Scenario = JSON.parse(e.target?.result as string);
        const updatedScenarios = [...scenarios, { ...scenario, id: Date.now().toString() }];
        saveScenarios(updatedScenarios);
      } catch (error) {
        alert('Invalid scenario file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          Save Scenario
        </button>

        <button
          onClick={() => setShowLoadDialog(true)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm"
        >
          <FolderOpen className="w-4 h-4" />
          Load Scenario
        </button>

        <label className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm cursor-pointer">
          <Upload className="w-4 h-4" />
          Import
          <input
            type="file"
            accept=".json"
            onChange={handleImportScenario}
            className="hidden"
          />
        </label>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSaveDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Save Scenario</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Scenario Name
                </label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  placeholder="My Investment Plan"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={scenarioDescription}
                  onChange={(e) => setScenarioDescription(e.target.value)}
                  placeholder="Description of this financial scenario..."
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveScenario}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Save Scenario
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Load Dialog */}
      {showLoadDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLoadDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Load Scenario</h3>

            {scenarios.length === 0 ? (
              <p className="text-slate-400 text-center py-8">
                No saved scenarios yet. Create and save your first scenario!
              </p>
            ) : (
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white">{scenario.name}</h4>
                          {scenario.isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                        {scenario.description && (
                          <p className="text-sm text-slate-400 mb-2">{scenario.description}</p>
                        )}
                        <p className="text-xs text-slate-500">
                          Created {new Date(scenario.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleFavorite(scenario.id)}
                          className={`p-1 rounded hover:bg-slate-700 transition-colors ${
                            scenario.isFavorite ? 'text-yellow-400' : 'text-slate-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${scenario.isFavorite ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleExportScenario(scenario)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                          title="Export scenario"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteScenario(scenario.id)}
                          className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
                          title="Delete scenario"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            onLoadScenario(scenario.data);
                            setShowLoadDialog(false);
                          }}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition-colors"
                        >
                          Load
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLoadDialog(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
