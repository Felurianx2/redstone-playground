import React from 'react';

interface InfoCardProps {
  selectedScenario: string;
  dataPointsCount: number;
  medianPrice: number;
  useRealData: boolean;
  scenarioParams: {
    priceShift: number;
    timestampDelay: number;
    corruptSigners: number;
    outlierValue: number;
  };
}

const InfoCard: React.FC<InfoCardProps> = ({
  selectedScenario,
  dataPointsCount,
  medianPrice,
  useRealData,
  scenarioParams,
}) => {
  const getScenarioExplanation = () => {
    switch (selectedScenario) {
      case 'price_spike':
        return {
          title: '📈 Price Spike Scenario',
          description: `Simulated a sudden ${scenarioParams.priceShift}% price increase to test how your contract handles rapid market movements.`,
          impact: 'This tests oracle resilience during volatile market conditions.',
        };
      case 'delayed_feed':
        return {
          title: '⏰ Delayed Feed Scenario',
          description: `Simulated ${scenarioParams.timestampDelay}s old data to test staleness detection in your contract.`,
          impact: 'Contracts should validate timestamp freshness to avoid using outdated prices.',
        };
      case 'corrupt_signer':
        return {
          title: '⚠️ Corrupt Signer Scenario',
          description: `Simulated ${scenarioParams.corruptSigners} malicious oracle node(s) providing incorrect data.`,
          impact: 'The median calculation filters out corrupted values when using multiple signers.',
        };
      case 'outlier_injection':
        return {
          title: '🎯 Outlier Injection Scenario',
          description: `Injected a ${scenarioParams.outlierValue}% outlier value to test median robustness.`,
          impact: 'Median aggregation method naturally filters extreme outliers.',
        };
      default:
        return {
          title: '✅ Normal Operation',
          description: 'Standard oracle behavior with all nodes providing accurate data.',
          impact: 'This represents ideal conditions with reliable data from all signers.',
        };
    }
  };

  const scenario = getScenarioExplanation();

  return (
    <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-lg border border-red-500/30 p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-300">What's happening?</h3>
          <p className="text-xs text-gray-400 mt-0.5">{scenario.title}</p>
        </div>
      </div>

      {/* Data Summary */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-black/20 rounded p-2 border border-gray-700/50">
          <span className="text-gray-400">Data Source:</span>
          <p className="text-gray-200 font-medium mt-0.5">
            {useRealData ? '🌐 Live RedStone Data' : '🧪 Mock Data'}
          </p>
        </div>
        <div className="bg-black/20 rounded p-2 border border-gray-700/50">
          <span className="text-gray-400">Signers:</span>
          <p className="text-gray-200 font-medium mt-0.5">
            {dataPointsCount} oracle node{dataPointsCount > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Scenario Description */}
      <div className="bg-black/20 rounded p-3 border border-gray-700/50 space-y-2">
        <p className="text-xs text-gray-300 leading-relaxed">
          {scenario.description}
        </p>
        <div className="flex items-start gap-2 pt-2 border-t border-gray-700/50">
          <span className="text-xs text-red-400 font-medium">💡 Why it matters:</span>
          <p className="text-xs text-gray-400 leading-relaxed flex-1">
            {scenario.impact}
          </p>
        </div>
      </div>

      {/* Median Calculation Explanation */}
      <div className="bg-black/20 rounded p-2 border border-gray-700/50">
        <p className="text-xs text-gray-400">
          <span className="text-red-400 font-medium">Median calculation:</span> {dataPointsCount} values sorted → middle value selected → 
          <span className="text-[#FF3333] font-semibold"> ${medianPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
      </div>
    </div>
  );
};

export default InfoCard;