import React from "react";
import type { SimulationState, DebugData, Feed } from "../types";
import CodeEditor from "./CodeEditor";
import InfoCard from "./InfoCard";
import Tooltip from "./Tooltip";

interface ResultsPanelProps {
  simulationState: SimulationState;
  debugData: DebugData | null;
  contractAddress: string;
  selectedFeed: Feed;
  selectedScenario?: string;
  scenarioParams?: {
    priceShift: number;
    timestampDelay: number;
    corruptSigners: number;
    outlierValue: number;
  };
  useRealData?: boolean;
  beginnerMode?: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  simulationState,
  debugData,
  contractAddress,
  selectedFeed,
  selectedScenario = 'normal',
  scenarioParams = { priceShift: 0, timestampDelay: 0, corruptSigners: 0, outlierValue: 0 },
  useRealData = false,
  beginnerMode = false,
}) => {
  const getDataFreshness = () => {
    if (!debugData) return null;
    const now = Date.now();
    const oldestTimestamp = Math.min(...debugData.dataPackage.dataPoints.map(dp => dp.timestamp));
    const ageSeconds = Math.floor((now - oldestTimestamp) / 1000);
    
    // Adjusted thresholds for public API data
    if (ageSeconds < 60) return { status: 'excellent', color: 'green', text: 'Very Fresh' };
    if (ageSeconds < 180) return { status: 'good', color: 'blue', text: 'Fresh' };
    if (ageSeconds < 300) return { status: 'ok', color: 'yellow', text: 'Acceptable' };
    return { status: 'stale', color: 'red', text: 'Stale' };
  };

  const freshness = getDataFreshness();

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Simulation Status */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-gray-100">Simulation Results</h2>
          <Tooltip content="This shows the results of your test, including price data, data freshness, and how the oracle system performed." />
        </div>

        {beginnerMode && simulationState === "idle" && (
          <p className="text-xs text-gray-400 mb-4 bg-blue-500/10 border border-blue-500/30 rounded p-2">
            👉 <strong>What you'll see here:</strong> After running a simulation, you'll see the price that was calculated, how many oracle nodes responded, and whether the data is trustworthy.
          </p>
        )}

        {simulationState === "idle" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <p className="text-gray-400">Configure parameters and run simulation</p>
            {beginnerMode && (
              <p className="text-xs text-gray-500 mt-2">
                👈 Select a cryptocurrency and scenario on the left, then click "Run Simulation"
              </p>
            )}
          </div>
        )}

        {simulationState === "running" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-red-500 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-gray-300 font-medium">Running simulation...</p>
            <p className="text-gray-500 text-sm mt-1">
              {useRealData ? 'Fetching live data from RedStone...' : 'Processing oracle data...'}
            </p>
          </div>
        )}

        {simulationState === "error" && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-400 font-medium mb-2">Simulation failed</p>
            <p className="text-xs text-gray-400">Check console for details, or try switching to Mock Data mode</p>
            {beginnerMode && (
              <div className="mt-4 text-xs text-gray-400 bg-yellow-500/10 border border-yellow-500/30 rounded p-3 max-w-md mx-auto">
                <p className="font-semibold text-yellow-400 mb-1">💡 Troubleshooting tips:</p>
                <ul className="list-disc list-inside text-left space-y-1">
                  <li>Try switching to Mock Data mode</li>
                  <li>Check your internet connection</li>
                  <li>Try a different cryptocurrency</li>
                  <li>Wait a moment and try again</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {simulationState === "completed" && debugData && (
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-lg border border-green-500/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-300 mb-2">🎉 Simulation Successful!</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-400">✅ Oracle nodes responded:</span>
                      <p className="text-gray-200 font-medium">{debugData.dataPackage.dataPoints.length} signers</p>
                    </div>
                    <div>
                      <span className="text-gray-400">✅ Final price calculated:</span>
                      <p className="text-gray-200 font-medium">${debugData.medianPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    {freshness && (
                      <div>
                        <span className="text-gray-400">✅ Data freshness:</span>
                        <p className={`font-medium text-${freshness.color}-400`}>{freshness.text}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">✅ Data source:</span>
                      <p className="text-gray-200 font-medium">{useRealData ? '🌐 Live RedStone' : '🧪 Mock Data'}</p>
                    </div>
                  </div>
                  {beginnerMode && (
                    <div className="mt-3 p-2 bg-black/20 rounded text-xs text-gray-400">
                      <p><strong className="text-gray-300">👉 What this means:</strong> Your system successfully received reliable price data from {debugData.dataPackage.dataPoints.length} independent source{debugData.dataPackage.dataPoints.length > 1 ? 's' : ''}. The median calculation filtered out any outliers to give you the most trustworthy price.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Median Price */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Median Price</span>
                  <Tooltip content="The middle value from all oracle nodes. Using median (not average) makes the system resistant to outliers and corrupt data." />
                </div>
                <span className="text-2xl font-bold text-[#FF3333]">
                  ${debugData.medianPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              {beginnerMode && (
                <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-700">
                  <strong>What is median?</strong> If you have values [100, 105, 200], the median is 105 (the middle value). This is better than average (135) because it ignores the outlier (200).
                </p>
              )}
            </div>

            {/* Data Points Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-200">Oracle Data Points</h3>
                <Tooltip content="Each row shows data from one oracle node (signer). Multiple nodes ensure reliability - if one is wrong, the median calculation filters it out." />
              </div>
              <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="w-full">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          Signer
                          {beginnerMode && <Tooltip type="click" content="Each 'signer' is an independent oracle node providing price data. More signers = more security!" />}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          Value
                          {beginnerMode && <Tooltip type="click" content="The price reported by this oracle node. Values should be similar - big differences might indicate problems." />}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          Timestamp
                          {beginnerMode && <Tooltip type="click" content="When this price was recorded. Recent timestamps (< 1 minute) are good. Old timestamps might mean stale data." />}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          Signature
                          {beginnerMode && <Tooltip type="click" content="Cryptographic proof that this data came from a trusted oracle node. This prevents fake or tampered data." />}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {debugData.dataPackage.dataPoints.map((point, idx) => {
                      const signature = debugData.dataPackage.signatures[idx];
                      const signatureStr = typeof signature === 'string' 
                        ? signature 
                        : signature?.toString?.() || "0x" + Math.random().toString(16).slice(2, 12);
                      
                      return (
                        <tr key={point.id} className="bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-300 font-medium">{point.id}</td>
                          <td className="px-4 py-3 text-sm font-mono text-gray-300">
                            ${point.value.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-gray-400">
                            {new Date(point.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="px-4 py-3 text-sm font-mono text-red-400">
                            {signatureStr.substring(0, 10)}...
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700 space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-gray-200">Transaction Details</h3>
                <Tooltip content="Simulated blockchain transaction information. In a real deployment, this would be an actual on-chain transaction." />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Contract Address:</span>
                    {beginnerMode && <Tooltip type="click" content="The smart contract address that received this oracle data. On mainnet, this would be your actual contract." />}
                  </div>
                  <span className="font-mono text-red-400 text-xs">{contractAddress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Transaction Hash:</span>
                    {beginnerMode && <Tooltip type="click" content="Unique identifier for this transaction. You could use this to look up the transaction on a block explorer." />}
                  </div>
                  <span className="font-mono text-red-400 text-xs">
                    {debugData.transactionHash.substring(0, 20)}...
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Block Number:</span>
                    {beginnerMode && <Tooltip type="click" content="The blockchain block where this transaction was included. Higher = more recent." />}
                  </div>
                  <span className="font-mono text-gray-300">{debugData.blockNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Gas Used:</span>
                    {beginnerMode && <Tooltip type="click" content="Computational cost of this transaction. More signers = more gas. On mainnet, this costs real money!" />}
                  </div>
                  <span className="font-mono text-gray-300">{debugData.gasUsed.toLocaleString()} gas</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Info Card */}
      {simulationState === "completed" && (
        <InfoCard
          selectedScenario={selectedScenario}
          dataPointsCount={debugData?.dataPackage.dataPoints.length || 0}
          medianPrice={debugData?.medianPrice || 0}
          useRealData={useRealData}
          scenarioParams={scenarioParams}
          beginnerMode={beginnerMode}
        />
      )}

      {/* Code Editor - Only visible after simulation completes */}
      {simulationState === "completed" && (
        <CodeEditor selectedFeed={selectedFeed} beginnerMode={beginnerMode} />
      )}
    </div>
  );
};

export default ResultsPanel;