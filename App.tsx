import React, { useState, useEffect, useCallback } from "react";
import type { DebugData, ScenarioParams, SimulationState } from "./types";
import { SUPPORTED_FEEDS } from "./constants";
import ConfigurationPanel from "./components/ConfigurationPanel";
import ResultsPanel from "./components/ResultsPanel";
import Header from "./components/Header";
import { requestDataPackages, getSignersForDataServiceId } from "@redstone-finance/sdk";

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full py-4 bg-black/20 border-t border-gray-700/50 mt-auto">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-400 px-4 sm:px-6 lg:px-8">
        <span className="font-mono">v1.0.0 - MVP</span>
        <span className="font-mono">
          {currentTime.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
        <a
          href="https://redstone.finance"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#FF3333] hover:text-red-400 transition-colors"
        >
          Powered by RedStone
        </a>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedFeed, setSelectedFeed] = useState("ETH");
  const [selectedScenario, setSelectedScenario] = useState("normal");
  const [useRealData, setUseRealData] = useState(false);

  const [scenarioParams, setScenarioParams] = useState<ScenarioParams>({
    priceShift: 0,
    timestampDelay: 0,
    corruptSigners: 0,
    outlierValue: 0,
  });

  const [simulationState, setSimulationState] = useState<SimulationState>("idle");
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [contractAddress, setContractAddress] = useState("");

  const currentFeed =
    SUPPORTED_FEEDS.find((feed) => feed.id === selectedFeed) || SUPPORTED_FEEDS[0];

  useEffect(() => {
    const presets: Record<string, ScenarioParams> = {
      price_spike: { priceShift: 15, timestampDelay: 0, corruptSigners: 0, outlierValue: 0 },
      delayed_feed: { priceShift: 0, timestampDelay: 30, corruptSigners: 0, outlierValue: 0 },
      corrupt_signer: { priceShift: 0, timestampDelay: 0, corruptSigners: 1, outlierValue: 0 },
      outlier_injection: { priceShift: 0, timestampDelay: 0, corruptSigners: 0, outlierValue: 50 },
      normal: { priceShift: 0, timestampDelay: 0, corruptSigners: 0, outlierValue: 0 },
    };
    setScenarioParams(presets[selectedScenario] || presets.normal);
  }, [selectedScenario]);

  const runSimulation = useCallback(async () => {
    setSimulationState("running");
    setDebugData(null);
    setContractAddress("");

    try {
      let debug: DebugData;

      if (useRealData) {
        // ✅ REAL DATA - RedStone Integration (OFFICIAL DOCUMENTATION METHOD)
        try {
          console.log("=== STARTING REAL DATA FETCH ===");
          console.log("Selected Feed:", selectedFeed);
          console.log("Current Feed Object:", currentFeed);
          
          // Get authorized signers for the data service
          const authorizedSigners = getSignersForDataServiceId("redstone-primary-prod");
          
          console.log("Authorized Signers:", authorizedSigners);

          const requestConfig = {
            dataServiceId: "redstone-primary-prod",
            uniqueSignersCount: 2,
            dataPackagesIds: [selectedFeed], // Make sure this is the correct feed
            authorizedSigners: authorizedSigners,
            urls: ["https://oracle-gateway-1.a.redstone.finance"],
          };
          
          console.log("Request Config:", requestConfig);

          const response = await requestDataPackages(requestConfig);

          console.log("=== RedStone Response ===");
          console.log("Response:", response);
          console.log("Full Response Structure:", JSON.stringify(response, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
          , 2));
          
          const feedData = response[selectedFeed];
          if (!feedData || !Array.isArray(feedData) || feedData.length === 0) {
            throw new Error(`Feed ${selectedFeed} not found or empty in response`);
          }

          console.log("Feed Data:", feedData);

          // Process all signed packages (multiple signers)
          const processedDataPoints = feedData.map((signedPackage: any, idx: number) => {
            if (!signedPackage || !signedPackage.dataPackage) {
              console.warn(`Invalid signed package at index ${idx}`);
              return null;
            }

            const dataPackage = signedPackage.dataPackage;
            const dataPoints = dataPackage.dataPoints;
            
            if (!Array.isArray(dataPoints) || dataPoints.length === 0) {
              console.warn(`No data points in package ${idx}`);
              return null;
            }

            // Get the first data point (should be the selected feed)
            const dataPoint = dataPoints[0];
            
            console.log(`Processing signer ${idx + 1}:`, dataPoint);
            console.log(`Value type:`, typeof dataPoint.value);
            console.log(`Value:`, dataPoint.value);
            
            // Parse the value correctly - handle Uint8Array, BigInt, Number, String
            let parsedValue = 0;
            
            if (dataPoint.value instanceof Uint8Array) {
              // Convert Uint8Array to BigInt
              let hex = '0x';
              for (let i = 0; i < dataPoint.value.length; i++) {
                hex += dataPoint.value[i].toString(16).padStart(2, '0');
              }
              parsedValue = Number(BigInt(hex));
              console.log(`Converted Uint8Array to hex: ${hex}, BigInt: ${BigInt(hex)}, Number: ${parsedValue}`);
            } else if (typeof dataPoint.value === 'bigint') {
              parsedValue = Number(dataPoint.value);
            } else if (typeof dataPoint.value === 'number') {
              parsedValue = dataPoint.value;
            } else if (typeof dataPoint.value === 'string') {
              parsedValue = parseFloat(dataPoint.value);
            } else {
              console.warn(`Unknown value type for signer ${idx + 1}:`, typeof dataPoint.value);
            }

            // Apply decimals if present (RedStone typically uses 8 decimals)
            const decimals = dataPoint.decimals || 8;
            const finalValue = parsedValue / Math.pow(10, decimals);

            console.log(`Signer ${idx + 1}: Raw=${parsedValue}, Decimals=${decimals}, Final=${finalValue}`);

            return {
              id: `signer_${idx + 1}`,
              value: finalValue,
              timestamp: dataPackage.timestampMilliseconds,
              signature: signedPackage.signature,
            };
          }).filter(Boolean); // Remove nulls

          if (processedDataPoints.length === 0) {
            throw new Error("No valid data points found");
          }

          // Calculate median
          const values = processedDataPoints.map((dp: any) => dp.value);
          values.sort((a, b) => a - b);
          const median = values[Math.floor(values.length / 2)];

          console.log("Processed Values:", values);
          console.log("Median:", median);

          // ✅ APPLY SCENARIO MODIFICATIONS to Real Data (for educational simulation)
          const modifiedDataPoints = processedDataPoints.map((dp: any, idx: number) => {
            let modifiedValue = dp.value;
            let modifiedTimestamp = dp.timestamp;

            // Apply Price Shift
            if (scenarioParams.priceShift !== 0) {
              modifiedValue = dp.value * (1 + scenarioParams.priceShift / 100);
            }

            // Apply Timestamp Delay
            if (scenarioParams.timestampDelay !== 0) {
              modifiedTimestamp = dp.timestamp - (scenarioParams.timestampDelay * 1000);
            }

            // Apply Outlier to specific signer (if configured)
            if (scenarioParams.outlierValue !== 0 && idx === 0) {
              modifiedValue = dp.value * (1 + scenarioParams.outlierValue / 100);
            }

            // Corrupt specific signer (if configured)
            if (scenarioParams.corruptSigners > 0 && idx < scenarioParams.corruptSigners) {
              modifiedValue = dp.value * 0.5; // Corrupt by making it 50% of real value
            }

            return {
              id: dp.id,
              value: modifiedValue,
              timestamp: modifiedTimestamp,
              signature: dp.signature,
            };
          });

          // Recalculate median with modified values
          const modifiedValues = modifiedDataPoints.map((dp: any) => dp.value);
          modifiedValues.sort((a, b) => a - b);
          const modifiedMedian = modifiedValues[Math.floor(modifiedValues.length / 2)];

          console.log("Modified Values (after scenarios):", modifiedValues);
          console.log("Modified Median:", modifiedMedian);

          debug = {
            dataPackage: {
              dataPoints: modifiedDataPoints.map((dp: any) => ({
                id: dp.id,
                value: dp.value,
                timestamp: dp.timestamp,
              })),
              signatures: modifiedDataPoints.map((dp: any) => {
                const sig = dp.signature;
                // Handle different signature formats
                if (typeof sig === 'string') return sig;
                if (sig && typeof sig === 'object' && sig.r && sig.s) {
                  // Signature is an object with r, s, v components
                  return `${sig.r}${sig.s}${sig.v || ''}`.substring(0, 42);
                }
                return "0x" + Math.random().toString(16).slice(2, 42);
              }),
            },
            medianPrice: modifiedMedian, // Use modified median after scenarios
            gasUsed: Math.floor(Math.random() * 50000) + 40000,
            transactionHash: "0x" + Math.random().toString(16).slice(2).padEnd(64, "0"),
            blockNumber: Math.floor(Math.random() * 10000000),
          };
        } catch (redstoneError) {
          console.error("RedStone API Error:", redstoneError);
          throw new Error(
            `RedStone fetch failed: ${redstoneError instanceof Error ? redstoneError.message : 'Unknown error'}`
          );
        }
      } else {
        // ✅ MOCK DATA - For testing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        debug = {
          dataPackage: {
            dataPoints: [
              {
                id: "signer_1",
                value: currentFeed.currentPrice * (1 + scenarioParams.priceShift / 100),
                timestamp: Date.now() - scenarioParams.timestampDelay * 1000,
              },
              {
                id: "signer_2",
                value: currentFeed.currentPrice * (1 + (scenarioParams.priceShift + 0.2) / 100),
                timestamp: Date.now() - scenarioParams.timestampDelay * 1000,
              },
              {
                id: "signer_3",
                value: currentFeed.currentPrice * (1 + (scenarioParams.priceShift - 0.1) / 100),
                timestamp: Date.now() - scenarioParams.timestampDelay * 1000,
              },
            ],
            signatures: [
              "0x1234567890abcdef1234567890abcdef12345678",
              "0xabcdef1234567890abcdef1234567890abcdef12",
              "0x90abcdef1234567890abcdef1234567890abcdef",
            ],
          },
          medianPrice: currentFeed.currentPrice * (1 + scenarioParams.priceShift / 100),
          gasUsed: 78542,
          transactionHash:
            "0xdef456c6a2e4b3f8861d8f813a4059733c7a7605e45c45053644265d3a50789a",
          blockNumber: 18950234,
        };
      }

      setDebugData(debug);
      setContractAddress("0x742d35Cc6635C0532925a3b8D40Ec8c2C2c3C7B1");
      setSimulationState("completed");
    } catch (error) {
      console.error("Simulation failed:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      setSimulationState("error");
    }
  }, [useRealData, selectedFeed, currentFeed, scenarioParams]);

  const resetSimulation = useCallback(() => {
    setSimulationState("idle");
    setDebugData(null);
    setContractAddress("");
  }, []);

  return (
    <div className="min-h-screen text-gray-200 flex flex-col">
      <div className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Header />

          {/* Toggle Real Data */}
          <div className="flex justify-end mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={useRealData}
                onChange={(e) => setUseRealData(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
              Use Real Data (RedStone)
            </label>
          </div>

          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ConfigurationPanel
              selectedFeed={selectedFeed}
              setSelectedFeed={setSelectedFeed}
              selectedScenario={selectedScenario}
              setSelectedScenario={setSelectedScenario}
              scenarioParams={scenarioParams}
              setScenarioParams={(params) => {
                setScenarioParams((prev) => ({ ...prev, ...params }));
                setSelectedScenario("custom");
              }}
              simulationState={simulationState}
              runSimulation={runSimulation}
              resetSimulation={resetSimulation}
            />
            <ResultsPanel
              simulationState={simulationState}
              debugData={debugData}
              contractAddress={contractAddress}
              selectedFeed={currentFeed}
              selectedScenario={selectedScenario}
              scenarioParams={scenarioParams}
              useRealData={useRealData}
            />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}