import React, { useState } from "react";
import Tooltip from "./Tooltip";

interface HeaderProps {
  useRealData: boolean;
  setUseRealData: (value: boolean) => void;
  beginnerMode: boolean;
  setBeginnerMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  useRealData, 
  setUseRealData,
  beginnerMode,
  setBeginnerMode,
}) => {
  const [showDataModeInfo, setShowDataModeInfo] = useState(false);

  const navLinks = [
    { name: 'Push Model', href: 'https://docs.redstone.finance/docs/dapps/redstone-push/' },
    { name: 'Pull Model', href: 'https://docs.redstone.finance/docs/dapps/redstone-pull/' },
    { name: 'Hybrid', href: 'https://docs.redstone.finance/docs/dapps/redstone-erc7412/' },
    { name: 'Architecture', href: 'https://docs.redstone.finance/docs/architecture/' },
  ];

  return (
    <header className="mb-8">
      {/* Main Header - Original Structure */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-black rounded-lg p-1">
            <img 
              src="/assets/logo.png" 
              alt="RedStone Logo"
              className="w-full h-full object-contain" 
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">RedStone Oracle Playground</h1>
            <p className="text-gray-400 mt-1">Interactive testing environment</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md bg-[#2a2a2a] hover:bg-[#3A3A3A] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-700">
        {/* Beginner Mode Toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={beginnerMode}
                onChange={(e) => setBeginnerMode(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${beginnerMode ? 'bg-green-500' : 'bg-gray-700'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${beginnerMode ? 'translate-x-5' : 'translate-x-0'} shadow-md`} />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-gray-100 transition-colors flex items-center gap-1">
               Beginner Mode
              <Tooltip content="Show detailed explanations, tooltips, and step-by-step guides. Perfect if you're new to oracles or smart contracts!" />
            </span>
          </label>
        </div>

        {/* Data Mode Selection */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDataModeInfo(!showDataModeInfo)}
            className="text-xs text-gray-400 hover:text-gray-300 underline decoration-dotted"
          >
            What's the difference?
          </button>
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={useRealData}
                onChange={(e) => setUseRealData(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${useRealData ? 'bg-red-500' : 'bg-gray-700'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${useRealData ? 'translate-x-5' : 'translate-x-0'} shadow-md`} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-300 group-hover:text-gray-100 transition-colors">
                {useRealData ? '🌐 Use Real Data' : '🧪 Use Mock Data'}
              </span>
              <Tooltip 
                content={
                  useRealData 
                    ? "Fetching live prices from RedStone's oracle network. You'll see actual market data from multiple independent sources!"
                    : "Using simulated data for testing. Perfect for learning and experimenting without making API calls."
                }
              />
            </div>
          </label>
        </div>
      </div>

      {/* Data Mode Explanation Panel */}
      {showDataModeInfo && (
        <div className="mt-4 p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-lg border border-blue-500/30">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-300 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Understanding Data Sources
            </h3>
            <button
              onClick={() => setShowDataModeInfo(false)}
              className="text-gray-400 hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs">
            {/* Mock Data */}
            <div className="bg-black/20 rounded p-3 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🧪</span>
                <span className="font-semibold text-gray-200">Mock Data</span>
              </div>
              <div className="space-y-2 text-gray-400">
                <p><strong className="text-gray-300">What it is:</strong> Simulated prices generated by the app</p>
                <p><strong className="text-gray-300">How it works:</strong> No internet connection needed. Instant results.</p>
                <p><strong className="text-gray-300">Best for:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Learning how oracles work</li>
                  <li>Testing scenarios quickly</li>
                  <li>Understanding the interface</li>
                </ul>
                <div className="mt-2 p-2 bg-green-500/10 border border-green-500/30 rounded">
                  <p className="text-green-400">✅ <strong>Use this if:</strong> You're just getting started or want to experiment</p>
                </div>
              </div>
            </div>

            {/* Real Data */}
            <div className="bg-black/20 rounded p-3 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🌐</span>
                <span className="font-semibold text-gray-200">Real Data (RedStone)</span>
              </div>
              <div className="space-y-2 text-gray-400">
                <p><strong className="text-gray-300">What it is:</strong> Live prices from RedStone's oracle network</p>
                <p><strong className="text-gray-300">How it works:</strong> Fetches actual market data from multiple independent oracle nodes</p>
                <p><strong className="text-gray-300">Best for:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Seeing real market conditions</li>
                  <li>Production-ready testing</li>
                  <li>Understanding actual oracle behavior</li>
                </ul>
                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded">
                  <p className="text-red-400">⚡ <strong>Use this if:</strong> You want to see how oracles work with real market data</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <p className="text-xs text-yellow-400">
              💡 <strong>Pro tip:</strong> Start with Mock Data to understand the concepts, then switch to Real Data to see how it works with actual market prices!
            </p>
          </div>
        </div>
      )}

      {/* Beginner Welcome Message */}
      {beginnerMode && (
        <div className="mt-4 p-4 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-lg border border-green-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-green-300 mb-2">Welcome to Beginner Mode!</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                You'll see detailed explanations, helpful tooltips, and step-by-step guidance throughout the playground. 
                Look for the <span className="inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-700 text-gray-300 mx-1">?</span> icons 
                to learn more about each feature. Don't worry if you don't understand everything at first - that's what this is for!
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;