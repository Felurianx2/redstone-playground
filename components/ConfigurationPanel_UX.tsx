import React from "react";
import type { ScenarioParams, SimulationState } from "../types";
import { SUPPORTED_FEEDS } from "../constants";
import Tooltip from "./Tooltip";

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
  beginnerMode: boolean;
}

const FEED_DESCRIPTIONS: Record<string, { description: string }> = {
  ETH: { 
    description: "Most popular cryptocurrency for DeFi applications" 
  },
  BTC: { 
    description: "First and largest cryptocurrency by market cap" 
  },
  SOL: { 
    description: "Fast, low-cost blockchain platform" 
  },
};

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
  beginnerMode,
}) => {
  const isRunning = simulationState === "running";

  return (
    <div className="space-y-6">
      {/* Feed Selection */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-lg font-bold text-gray-100">Feed Selection</h2>
          <Tooltip content="Choose which cryptocurrency price you want to test. Each feed provides real-time price data from RedStone's oracle network." />
        </div>

        {beginnerMode && (
          <p className="text-xs text-gray-400 mb-4 bg-blue-500/10 border border-blue-500/30 rounded p-2">
            👉 <strong>What to do:</strong> Pick a cryptocurrency to test. Don't worry about getting it "right" - you can try different ones!
          </p>
        )}

        <div className="space-y-2">
          {SUPPORTED_FEEDS.map((feed) => {
            const info = FEED_DESCRIPTIONS[feed.id];
            return (
              <button
                key={feed.id}
                onClick={() => setSelectedFeed(feed.id)}
                disabled={isRunning}
                className={`
                  w-full text-left p-4 rounded-lg transition-all duration-200
                  ${
                    selectedFeed === feed.id
                      ? "bg-red-500/20 border-2 border-red-500 shadow-lg shadow-red-500/20"
                      : "bg-black/20 border border-gray-700 hover:border-gray-600 hover:bg-black/30"
                  }
                  ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-100">{feed.name}</span>
                      <span className="text-xs text-gray-500">({feed.symbol})</span>
                    </div>
                    {beginnerMode && (
                      <p className="text-xs text-gray-400 mt-1">{info.description}</p>
                    )}
                  </div>
                  {selectedFeed === feed.id && (
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-lg font-bold text-gray-100">Scenario & Parameters</h2>
          <Tooltip content="Test scenarios simulate different real-world conditions - from normal operation to edge cases like price spikes or corrupt data." />
        </div>

        {beginnerMode && (
          <p className="text-xs text-gray-400 mb-4 bg-blue-500/10 border border-blue-500/30 rounded p-2">
            👉 <strong>What to do:</strong> Choose a scenario to see how your system handles different situations. Start with "Normal Operation" to see how it works in ideal conditions.
          </p>
        )}

        <div className="space-y-2">
          {/* Normal Operation */}
          <button
            onClick={() => setSelectedScenario("normal")}
            disabled={isRunning}
            className={`
              w-full text-left p-4 rounded-lg transition-all
              ${
                selectedScenario === "normal"
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-black/20 border border-gray-700 hover:border-gray-600"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-100">✅ Normal Operation</span>
                  {!beginnerMode && (
                    <Tooltip 
                      type="click"
                      content="This is what you want 99% of the time! All oracle nodes are working correctly, providing fresh, accurate data. Use this to see how everything works in ideal conditions."
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Everything working perfectly</p>
                {beginnerMode && (
                  <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p><strong>👉 Use this to:</strong> See how it works in ideal conditions</p>
                    <p><strong>⚠️ In real life:</strong> This is what you want 99% of the time</p>
                  </div>
                )}
              </div>
            </div>
          </button>

          {/* Price Spike */}
          <button
            onClick={() => setSelectedScenario("price_spike")}
            disabled={isRunning}
            className={`
              w-full text-left p-4 rounded-lg transition-all
              ${
                selectedScenario === "price_spike"
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-black/20 border border-gray-700 hover:border-gray-600"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-100">📈 Price Spike</span>
                  {!beginnerMode && (
                    <Tooltip 
                      type="click"
                      content="Simulates a sudden 15% price increase. In real markets, this happens during high volatility. Tests if your system can handle rapid price movements without failing or causing losses."
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">15% sudden price increase</p>
                {beginnerMode && (
                  <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p><strong>👉 Use this to:</strong> Test circuit breakers and slippage protection</p>
                    <p><strong>⚠️ In real life:</strong> Prevents users from getting liquidated during volatile markets</p>
                  </div>
                )}
              </div>
            </div>
          </button>

          {/* Delayed Feed */}
          <button
            onClick={() => setSelectedScenario("delayed_feed")}
            disabled={isRunning}
            className={`
              w-full text-left p-4 rounded-lg transition-all
              ${
                selectedScenario === "delayed_feed"
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-black/20 border border-gray-700 hover:border-gray-600"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-100">⏰ Delayed Feed</span>
                  {!beginnerMode && (
                    <Tooltip 
                      type="click"
                      content="Data is 30 seconds old. Your smart contract should detect this and reject stale data to prevent using outdated prices that could cause losses."
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">30s timestamp delay</p>
                {beginnerMode && (
                  <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p><strong>👉 Use this to:</strong> Validate timestamp freshness checks</p>
                    <p><strong>⚠️ In real life:</strong> Old data = wrong prices = potential losses</p>
                  </div>
                )}
              </div>
            </div>
          </button>

          {/* Corrupt Signer */}
          <button
            onClick={() => setSelectedScenario("corrupt_signer")}
            disabled={isRunning}
            className={`
              w-full text-left p-4 rounded-lg transition-all
              ${
                selectedScenario === "corrupt_signer"
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-black/20 border border-gray-700 hover:border-gray-600"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-100">⚠️ Corrupt Signer</span>
                  {!beginnerMode && (
                    <Tooltip 
                      type="click"
                      content="One oracle node provides wrong data (malicious or hacked). With 3+ signers, the median calculation automatically filters out the bad data. This is why using multiple signers is critical!"
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">1 malicious signer</p>
                {beginnerMode && (
                  <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p><strong>👉 Use this to:</strong> Test median calculation resilience</p>
                    <p><strong>⚠️ In real life:</strong> Protects against hacked or malicious oracle nodes</p>
                  </div>
                )}
              </div>
            </div>
          </button>

          {/* Outlier Injection */}
          <button
            onClick={() => setSelectedScenario("outlier_injection")}
            disabled={isRunning}
            className={`
              w-full text-left p-4 rounded-lg transition-all
              ${
                selectedScenario === "outlier_injection"
                  ? "bg-red-500/20 border-2 border-red-500"
                  : "bg-black/20 border border-gray-700 hover:border-gray-600"
              }
              ${isRunning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-100">🎯 Outlier Injection</span>
                  {!beginnerMode && (
                    <Tooltip 
                      type="click"
                      content="One value is extremely high (50% above real price). Tests if your system can filter extreme outliers. The median calculation ignores outliers automatically."
                    />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">Extreme price values</p>
                {beginnerMode && (
                  <div className="text-xs text-gray-400 mt-2 space-y-1">
                    <p><strong>👉 Use this to:</strong> Verify data validation logic</p>
                    <p><strong>⚠️ In real life:</strong> Prevents flash crashes from affecting your system</p>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Custom Parameters */}
        {selectedScenario === "custom" && (
          <div className="mt-6 space-y-4 p-4 bg-black/20 rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
              Custom Parameters
              <Tooltip content="Advanced mode: Adjust individual parameters to create your own test scenario." />
            </h3>
            
            {/* Price Shift */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                Price Shift: {scenarioParams.priceShift}%
                <Tooltip content="How much to change the price. Positive = increase, Negative = decrease" />
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={scenarioParams.priceShift}
                onChange={(e) => setScenarioParams({ priceShift: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </div>

            {/* Timestamp Delay */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                Timestamp Delay: {scenarioParams.timestampDelay}s
                <Tooltip content="How old the data is. Higher = more stale data" />
              </label>
              <input
                type="range"
                min="0"
                max="300"
                value={scenarioParams.timestampDelay}
                onChange={(e) => setScenarioParams({ timestampDelay: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </div>

            {/* Corrupt Signers */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                Corrupt Signers: {scenarioParams.corruptSigners}
                <Tooltip content="Number of oracle nodes providing bad data" />
              </label>
              <input
                type="range"
                min="0"
                max="2"
                value={scenarioParams.corruptSigners}
                onChange={(e) => setScenarioParams({ corruptSigners: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </div>

            {/* Outlier Value */}
            <div>
              <label className="text-xs text-gray-400 flex items-center gap-2">
                Outlier Value: {scenarioParams.outlierValue}%
                <Tooltip content="How extreme the outlier value is" />
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={scenarioParams.outlierValue}
                onChange={(e) => setScenarioParams({ outlierValue: Number(e.target.value) })}
                className="w-full mt-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-red-500/50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isRunning ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Running...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Simulation
            </>
          )}
        </button>
        
        <button
          onClick={resetSimulation}
          disabled={simulationState === "idle"}
          className="px-6 py-4 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 text-gray-300 disabled:text-gray-600 rounded-lg transition-all border border-gray-700 disabled:border-gray-800 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>

      {beginnerMode && simulationState === "idle" && (
        <div className="text-xs text-gray-400 bg-green-500/10 border border-green-500/30 rounded p-3">
          <p className="font-semibold text-green-400 mb-1">💡 Quick Start Guide:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Pick a cryptocurrency (try Ethereum first!)</li>
            <li>Keep "Normal Operation" selected</li>
            <li>Click "Run Simulation"</li>
            <li>See the results and learn what they mean!</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ConfigurationPanel;