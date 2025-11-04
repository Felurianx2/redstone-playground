import React from 'react';
import { Play, Settings, AlertTriangle, RefreshCw } from 'lucide-react';
import Card from './common/Card';
import { SUPPORTED_FEEDS, SCENARIO_PRESETS } from '../constants';
import type { ScenarioParams, SimulationState } from '../types';

interface ConfigurationPanelProps {
  selectedFeed: string;
  setSelectedFeed: (feed: string) => void;
  selectedScenario: string;
  setSelectedScenario: (scenario: string) => void;
  scenarioParams: ScenarioParams;
  setScenarioParams: (params: Partial<ScenarioParams>) => void;
  simulationState: SimulationState;
  runSimulation: () => void;
  resetSimulation: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  selectedFeed,
  setSelectedFeed,
  selectedScenario,
  setSelectedScenario,
  scenarioParams,
  setScenarioParams,
  simulationState,
  runSimulation,
  resetSimulation,
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
          Feed Selection
        </h3>
        <div className="space-y-3">
          {SUPPORTED_FEEDS.map((feed) => (
            <div
              key={feed.id}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFeed === feed.id
                  ? 'border-[#FF3333] bg-[#FF3333]/10'
                  : 'border-[#3A3A3A] hover:border-[#FF3333]'
              }`}
              onClick={() => setSelectedFeed(feed.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-100">{feed.name}</div>
                  <div className="text-sm text-gray-400">{feed.symbol}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg font-semibold text-gray-100">
                    ${feed.currentPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-gray-400" />
          Scenario & Parameters
        </h3>
        <div className="space-y-2 mb-4">
          {SCENARIO_PRESETS.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedScenario === scenario.id
                  ? 'border-[#FF3333] bg-[#FF3333]/10'
                  : 'border-[#3A3A3A] hover:border-[#FF3333]'
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <div className="font-medium text-gray-100">{scenario.name}</div>
              <div className="text-sm text-gray-400">{scenario.description}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4 pt-4 border-t border-[#3A3A3A]">
          <h4 className="font-medium text-gray-100">Custom Parameters</h4>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Price Shift: {scenarioParams.priceShift}%</label>
            <input type="range" min="-50" max="50" value={scenarioParams.priceShift} onChange={(e) => setScenarioParams({ priceShift: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Timestamp Delay: {scenarioParams.timestampDelay}s</label>
            <input type="range" min="0" max="300" value={scenarioParams.timestampDelay} onChange={(e) => setScenarioParams({ timestampDelay: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Corrupt Signers: {scenarioParams.corruptSigners}</label>
            <input type="range" min="0" max="2" value={scenarioParams.corruptSigners} onChange={(e) => setScenarioParams({ corruptSigners: Number(e.target.value) })} />
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="space-y-3">
          <button
            onClick={runSimulation}
            disabled={simulationState === 'running'}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all text-white bg-[#FF3333] hover:bg-red-500 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            {simulationState === 'running' ? 'Running Simulation...' : 'Run Simulation'}
          </button>
          {simulationState !== 'idle' && (
            <button
              onClick={resetSimulation}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium bg-[#3A3A3A] hover:bg-[#4A4A4A] text-gray-200 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ConfigurationPanel;