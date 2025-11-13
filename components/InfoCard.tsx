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
  beginnerMode?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  selectedScenario,
  dataPointsCount,
  medianPrice,
  useRealData,
  scenarioParams,
  beginnerMode = false,
}) => {
  const getScenarioInfo = () => {
    switch (selectedScenario) {
      case 'price_spike':
        return {
          title: '📈 Price Spike Scenario',
          description: `Simulated a sudden ${scenarioParams.priceShift}% price increase to test how your contract handles rapid market movements.`,
          impact: 'This tests oracle resilience during volatile market conditions.',
          consequences: [
            'Users with leveraged positions could get liquidated',
            'Large slippage on trades without proper protection',
            'Circuit breakers should pause trading to protect users',
            'Arbitrageurs might exploit price discrepancies'
          ],
          protection: [
            'Set maximum price deviation limits (e.g., reject if price moves > 10% in 1 block)',
            'Implement circuit breakers that pause trading during extreme volatility',
            'Use time-weighted average prices (TWAP) instead of spot prices',
            'Add price impact warnings for large trades'
          ]
        };
      case 'delayed_feed':
        return {
          title: '⏰ Delayed Feed Scenario',
          description: `Simulated ${scenarioParams.timestampDelay}s old data to test staleness detection in your contract.`,
          impact: 'Contracts should validate timestamp freshness to avoid using outdated prices.',
          consequences: [
            'Trading at outdated prices could cause losses',
            'Arbitrage bots could exploit stale prices',
            'Liquidations based on old prices would be unfair',
            'Users might pay more/less than market price'
          ],
          protection: [
            'Always check `block.timestamp - dataTimestamp < MAX_DELAY` (usually 1-5 minutes)',
            'Reject transactions if data is too old',
            'Display data freshness to users',
            'Use multiple data sources and compare timestamps'
          ]
        };
      case 'corrupt_signer':
        return {
          title: '⚠️ Corrupt Signer Scenario',
          description: `Simulated ${scenarioParams.corruptSigners} malicious oracle node(s) providing incorrect data.`,
          impact: 'The median calculation filters out corrupted values when using multiple signers.',
          consequences: [
            'Single corrupt signer could manipulate prices if only using 2 signers',
            'With 3+ signers, one corrupt node is filtered out by median',
            'Attackers could profit from manipulated prices',
            'System-wide losses if enough signers are compromised'
          ],
          protection: [
            'Use at least 3 signers (5+ for critical applications)',
            'Verify signer signatures on-chain',
            'Monitor signer behavior and reputation',
            'Implement price sanity checks (e.g., reject if > 50% different from TWAP)'
          ]
        };
      case 'outlier_injection':
        return {
          title: '🎯 Outlier Injection Scenario',
          description: `Injected a ${scenarioParams.outlierValue}% outlier value to test median robustness.`,
          impact: 'Median aggregation method naturally filters extreme outliers.',
          consequences: [
            'Using average instead of median would be vulnerable',
            'Flash crashes could trigger unintended liquidations',
            'Extreme outliers could indicate data source problems',
            'Market manipulation attempts could exploit outliers'
          ],
          protection: [
            'Always use median (not mean/average) for price aggregation',
            'Set minimum and maximum price bounds',
            'Compare multiple data sources',
            'Implement gradual price update mechanisms'
          ]
        };
      default:
        return {
          title: '✅ Normal Operation',
          description: 'Standard oracle behavior with all nodes providing accurate data.',
          impact: 'This represents ideal conditions with reliable data from all signers.',
          consequences: [
            'All signers are honest and online',
            'Data is fresh and accurate',
            'No manipulation attempts',
            'System operates as designed'
          ],
          protection: [
            'Even in normal operation, always validate timestamps',
            'Monitor for unusual patterns',
            'Keep multiple data sources',
            'Have fallback mechanisms ready'
          ]
        };
    }
  };

  const scenario = getScenarioInfo();

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

      {/* Consequences Section */}
      <div className="bg-black/20 rounded p-3 border border-gray-700/50 space-y-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h4 className="text-xs font-semibold text-yellow-400">⚠️ What could go wrong in real life?</h4>
        </div>
        <ul className="space-y-1 text-xs text-gray-400 ml-6">
          {scenario.consequences.map((consequence, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">•</span>
              <span className="flex-1">{consequence}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Protection Section */}
      <div className="bg-black/20 rounded p-3 border border-gray-700/50 space-y-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h4 className="text-xs font-semibold text-green-400">🛡️ How to protect yourself:</h4>
        </div>
        <ul className="space-y-1 text-xs text-gray-400 ml-6">
          {scenario.protection.map((protection, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">✓</span>
              <span className="flex-1">{protection}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Median Calculation Explanation */}
      <div className="bg-black/20 rounded p-2 border border-gray-700/50">
        <p className="text-xs text-gray-400">
          <span className="text-red-400 font-medium">Median calculation:</span> {dataPointsCount} values sorted → middle value selected → 
          <span className="text-[#FF3333] font-semibold"> ${medianPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </p>
        {beginnerMode && (
          <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-700">
            <strong>Why median?</strong> It's more reliable than average because it ignores extreme outliers. For example: [100, 105, 1000] → median is 105 (good!), average is 401 (terrible!).
          </p>
        )}
      </div>

      {/* Beginner Mode Extra Help */}
      {beginnerMode && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
          <div className="flex items-start gap-2">
            <span className="text-lg">🎓</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-300 mb-1">Learning Tip:</p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Try running this same scenario multiple times - first with Mock Data, then with Real Data. Notice how the protection mechanisms work the same way regardless of the data source!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCard;