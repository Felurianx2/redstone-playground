import React from "react";
import type { SimulationState, DebugData, Feed } from "../types";
import CodeEditor from "./CodeEditor";
import InfoCard from "./InfoCard";

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
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  simulationState,
  debugData,
  contractAddress,
  selectedFeed,
  selectedScenario = 'normal',
  scenarioParams = { priceShift: 0, timestampDelay: 0, corruptSigners: 0, outlierValue: 0 },
  useRealData = false,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Simulation Status */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Simulation Results</h2>

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
            <p className="text-gray-500 text-sm mt-1">Processing oracle data</p>
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
            <p className="text-red-400 font-medium">❌ Simulation failed. Check console for details.</p>
          </div>
        )}

        {simulationState === "completed" && debugData && (
          <div className="space-y-6">
            {/* Median Price - FIXED COLORS */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Median Price</span>
                <span className="text-2xl font-bold text-[#FF3333]">
                  ${debugData.medianPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Data Points Table */}
            <div className="overflow-hidden rounded-lg border border-gray-700">
              <table className="w-full">
                <thead className="bg-black/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Signer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Signature
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {debugData.dataPackage.dataPoints.map((point, idx) => {
                    // Handle different signature formats
                    const signature = debugData.dataPackage.signatures[idx];
                    const signatureStr = typeof signature === 'string' 
                      ? signature 
                      : signature?.toString?.() || "0x" + Math.random().toString(16).slice(2, 12);
                    
                    return (
                      <tr key={point.id} className="bg-gray-800/50">
                        <td className="px-4 py-3 text-sm text-gray-300">{point.id}</td>
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

            {/* Transaction Details */}
            <div className="bg-black/30 rounded-lg p-4 border border-gray-700 space-y-2">
              <h3 className="text-sm font-semibold text-gray-200 mb-3">Transaction Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Contract Address:</span>
                  <span className="font-mono text-red-400">{contractAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction Hash:</span>
                  <span className="font-mono text-red-400">
                    {debugData.transactionHash.substring(0, 20)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Block Number:</span>
                  <span className="font-mono text-gray-300">{debugData.blockNumber}</span>
                </div>
              </div>
            </div>

            {/* Educational Info Card */}
            <InfoCard
              selectedScenario={selectedScenario}
              dataPointsCount={debugData.dataPackage.dataPoints.length}
              medianPrice={debugData.medianPrice}
              useRealData={useRealData}
              scenarioParams={scenarioParams}
            />
          </div>
        )}
      </div>

      {/* Code Editor - Only visible after simulation completes */}
      {simulationState === "completed" && (
        <CodeEditor selectedFeed={selectedFeed} />
      )}
    </div>
  );
};

export default ResultsPanel;