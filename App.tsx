import { useState } from "react";
import Header from "./components/Header_UX";
import ConfigurationPanel from "./components/ConfigurationPanel_UX";
import ResultsPanel from "./components/ResultsPanel_UX";
import type { SimulationState, DebugData, ScenarioParams, Feed } from "./types";
import { SUPPORTED_FEEDS } from "./constants";
import { requestDataPackages, getSignersForDataServiceId } from "@redstone-finance/sdk";

function App() {
  // State Management
  const [selectedFeed, setSelectedFeed] = useState<string>("ETH");
  const [selectedScenario, setSelectedScenario] = useState<string>("normal");
  const [scenarioParams, setScenarioParams] = useState<ScenarioParams>({
    priceShift: 0,
    timestampDelay: 0,
    corruptSigners: 0,
    outlierValue: 0,
  });
  const [simulationState, setSimulationState] = useState<SimulationState>("idle");
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [useRealData, setUseRealData] = useState(false);
  const [beginnerMode, setBeginnerMode] = useState(false);

  // Scenario Presets
  const presets: Record<string, ScenarioParams> = {
    normal: { priceShift: 0, timestampDelay: 0, corruptSigners: 0, outlierValue: 0 },
    price_spike: { priceShift: 15, timestampDelay: 0, corruptSigners: 0, outlierValue: 0 },
    delayed_feed: { priceShift: 0, timestampDelay: 30, corruptSigners: 0, outlierValue: 0 },
    corrupt_signer: { priceShift: 0, timestampDelay: 0, corruptSigners: 1, outlierValue: 0 },
    outlier_injection: { priceShift: 0, timestampDelay: 0, corruptSigners: 0, outlierValue: 50 },
  };

  // Apply preset when scenario changes
  const handleScenarioChange = (scenario: string) => {
    setSelectedScenario(scenario);
    if (presets[scenario]) {
      setScenarioParams(presets[scenario]);
    }
  };

  // Fetch Real Data from RedStone using HTTP Cache API
  const fetchRealData = async () => {
    try {
      console.log(`🔍 Fetching real data for ${selectedFeed}...`);
      
      // Use RedStone public API endpoint
      const apiUrl = `https://api.redstone.finance/prices?symbol=${selectedFeed}&provider=redstone&limit=3`;
      
      console.log("📡 Fetching from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log("📦 Raw response:", data);

      if (!data || data.length === 0) {
        throw new Error(`No data found for ${selectedFeed}`);
      }

      console.log(`✅ Got ${data.length} price data points`);

      // Parse price data
      const dataPoints = data.slice(0, 3).map((item: any, index: number) => {
        const value = item.value || 0;
        let timestamp = item.timestamp || Date.now();
        
        // Convert timestamp to milliseconds if it's in seconds
        // Timestamps in seconds are typically < 10^12, milliseconds are > 10^12
        if (timestamp < 10000000000) {
          timestamp = timestamp * 1000;
        }
        
        console.log(`💰 Data point ${index + 1} - Price: $${value.toFixed(2)}, Timestamp: ${new Date(timestamp).toLocaleString()}`);

        return {
          id: `signer_${index + 1}`,
          value: value,
          timestamp: timestamp,
        };
      });

      // Generate mock signatures for display purposes
      const signatures = dataPoints.map((_, i) => 
        `0x${Math.random().toString(16).slice(2, 66)}`
      );

      console.log("✅ Successfully parsed real data");

      return { dataPoints, signatures };
    } catch (error) {
      console.error("❌ Error fetching real data:", error);
      
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      
      throw error;
    }
  };

  // Generate Mock Data
  const generateMockData = () => {
    const feed = SUPPORTED_FEEDS.find((f) => f.id === selectedFeed);
    if (!feed) throw new Error("Feed not found");

    const basePrice = feed.currentPrice;
    const dataPoints = [
      {
        id: "signer_1",
        value: basePrice * (1 + (Math.random() * 0.002 - 0.001)),
        timestamp: Date.now(),
      },
      {
        id: "signer_2",
        value: basePrice * (1 + (Math.random() * 0.002 - 0.001)),
        timestamp: Date.now(),
      },
      {
        id: "signer_3",
        value: basePrice * (1 + (Math.random() * 0.002 - 0.001)),
        timestamp: Date.now(),
      },
    ];

    const signatures = dataPoints.map((_, i) => `0x${Math.random().toString(16).slice(2, 66)}`);

    return { dataPoints, signatures };
  };

  // Apply Scenario Modifications
  const applyScenarioModifications = (dataPoints: any[], params: ScenarioParams) => {
    const modified = [...dataPoints];

    // Apply price shift
    if (params.priceShift !== 0) {
      const shiftFactor = 1 + params.priceShift / 100;
      modified.forEach((point) => {
        point.value *= shiftFactor;
      });
    }

    // Apply timestamp delay
    if (params.timestampDelay > 0) {
      modified.forEach((point) => {
        point.timestamp -= params.timestampDelay * 1000;
      });
    }

    // Apply corrupt signers
    if (params.corruptSigners > 0) {
      for (let i = 0; i < Math.min(params.corruptSigners, modified.length); i++) {
        modified[i].value *= 0.5; // Corrupt signer provides 50% of real value
      }
    }

    // Apply outlier injection
    if (params.outlierValue > 0) {
      if (modified.length > 0) {
        modified[0].value *= 1 + params.outlierValue / 100;
      }
    }

    return modified;
  };

  // Calculate Median Price
  const calculateMedian = (values: number[]): number => {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  };

  // Run Simulation
  const runSimulation = async () => {
    setSimulationState("running");

    try {
      // Fetch data
      let rawData;
      if (useRealData) {
        rawData = await fetchRealData();
      } else {
        rawData = generateMockData();
      }

      // Apply scenario modifications
      const modifiedDataPoints = applyScenarioModifications(rawData.dataPoints, scenarioParams);

      // Calculate median
      const values = modifiedDataPoints.map((dp) => dp.value);
      const medianPrice = calculateMedian(values);

      // Generate debug data
      const debugInfo: DebugData = {
        dataPackage: {
          dataPoints: modifiedDataPoints,
          signatures: rawData.signatures,
        },
        medianPrice,
        transactionHash: `0xbc${Math.random().toString(16).slice(2, 66)}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 2234644,
        gasUsed: 75000 + Math.floor(Math.random() * 25000),
      };

      setDebugData(debugInfo);
      setSimulationState("completed");
    } catch (error) {
      console.error("Simulation error:", error);
      setSimulationState("error");
    }
  };

  // Reset Simulation
  const resetSimulation = () => {
    setSimulationState("idle");
    setDebugData(null);
  };

  const selectedFeedData = SUPPORTED_FEEDS.find((f) => f.id === selectedFeed) || SUPPORTED_FEEDS[0];
  const contractAddress = `0x742d35Cc6635C0532${Math.random().toString(16).slice(2, 18)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header 
          useRealData={useRealData} 
          setUseRealData={setUseRealData}
          beginnerMode={beginnerMode}
          setBeginnerMode={setBeginnerMode}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <ConfigurationPanel
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
            selectedScenario={selectedScenario}
            setSelectedScenario={handleScenarioChange}
            scenarioParams={scenarioParams}
            setScenarioParams={(params) => setScenarioParams({ ...scenarioParams, ...params })}
            simulationState={simulationState}
            runSimulation={runSimulation}
            resetSimulation={resetSimulation}
            beginnerMode={beginnerMode}
          />

          {/* Results Panel */}
          <ResultsPanel
            simulationState={simulationState}
            debugData={debugData}
            contractAddress={contractAddress}
            selectedFeed={selectedFeedData}
            selectedScenario={selectedScenario}
            scenarioParams={scenarioParams}
            useRealData={useRealData}
            beginnerMode={beginnerMode}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Built using{" "}
            <a
              href="https://redstone.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              RedStone Finance
            </a>
          </p>
          <p className="mt-2">
            <a
              href="https://docs.redstone.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors underline"
            >
              Documentation
            </a>
            {" · "}
            <a
              href="https://github.com/redstone-finance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors underline"
            >
              GitHub
            </a>
            {" · "}
            <a
              href="https://discord.gg/redstone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors underline"
            >
              Discord
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;