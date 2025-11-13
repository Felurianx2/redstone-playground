import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import type { Feed } from "../types";
import Tooltip from "./Tooltip";

interface CodeEditorProps {
  selectedFeed: Feed;
  beginnerMode?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ selectedFeed, beginnerMode = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateContract = () => {
    return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

/**
 * @title ${selectedFeed.name}PriceConsumer
 * @notice Consumer contract for ${selectedFeed.name} price feed from RedStone Oracle
 * @dev Inherits from MainDemoConsumerBase to access RedStone oracle data
 */
contract ${selectedFeed.name}PriceConsumer is MainDemoConsumerBase {
    
    // Maximum allowed data age in seconds (3 minutes)
    uint256 public constant MAX_TIMESTAMP_DELAY = 3 minutes;
    
    // Maximum allowed price deviation percentage (10%)
    uint256 public constant MAX_PRICE_DEVIATION = 10;
    
    // Last known price for comparison
    uint256 public lastPrice;
    
    // Event emitted when price is updated
    event PriceUpdated(uint256 newPrice, uint256 timestamp);
    
    /**
     * @notice Get the current ${selectedFeed.symbol} price from RedStone oracle
     * @dev This function extracts the price from the transaction calldata
     * @return price The current ${selectedFeed.symbol} price (8 decimals)
     */
    function get${selectedFeed.symbol}Price() public view returns (uint256) {
        // Fetch ${selectedFeed.symbol} price from RedStone oracle
        // The data is passed in the transaction calldata
        bytes32 dataFeedId = bytes32("${selectedFeed.symbol}");
        uint256 price = getOracleNumericValueFromTxMsg(dataFeedId);
        
        return price;
    }
    
    /**
     * @notice Execute transaction with oracle price validation
     * @dev Includes price sanity checks and freshness validation
     */
    function executeWithOraclePrice() public {
        uint256 currentPrice = get${selectedFeed.symbol}Price();
        
        // Validate price is within reasonable bounds
        // Adjust these bounds based on your use case
        require(currentPrice > 0, "Invalid price: must be positive");
        
        // Check price deviation if we have a previous price
        if (lastPrice > 0) {
            uint256 priceDiff = currentPrice > lastPrice 
                ? currentPrice - lastPrice 
                : lastPrice - currentPrice;
            uint256 deviationPercent = (priceDiff * 100) / lastPrice;
            
            require(
                deviationPercent <= MAX_PRICE_DEVIATION,
                "Price deviation too high"
            );
        }
        
        // Update last known price
        lastPrice = currentPrice;
        
        // Emit event
        emit PriceUpdated(currentPrice, block.timestamp);
        
        // Your business logic here
        // Example: update positions, execute trades, etc.
    }
    
    /**
     * @notice Override timestamp validation to enforce freshness
     * @dev Rejects data older than MAX_TIMESTAMP_DELAY
     * @param receivedTimestamp The timestamp from the oracle data
     * @return bool True if timestamp is valid (fresh enough)
     */
    function isTimestampValid(uint256 receivedTimestamp) 
        public 
        view 
        override 
        returns (bool) 
    {
        return block.timestamp - receivedTimestamp <= MAX_TIMESTAMP_DELAY;
    }
    
    /**
     * @notice Get price with automatic validation
     * @dev Convenience function that validates and returns price
     * @return price The validated ${selectedFeed.symbol} price
     */
    function getValidated${selectedFeed.symbol}Price() public view returns (uint256) {
        uint256 price = get${selectedFeed.symbol}Price();
        require(price > 0, "Invalid price");
        return price;
    }
}`;
  };

  const [code, setCode] = useState(generateContract());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDone = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-gray-100">Generated Consumer Contract</h3>
          <Tooltip content="This is production-ready Solidity code that you can deploy to interact with RedStone oracles. It includes price validation, freshness checks, and best practices." />
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-all text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                  isCopied
                    ? "bg-green-500 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {isCopied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={handleDone}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Done
            </button>
          )}
        </div>
      </div>

      {beginnerMode && !isEditing && (
        <div className="mb-4 text-xs text-gray-400 bg-blue-500/10 border border-blue-500/30 rounded p-3">
          <p className="font-semibold text-blue-400 mb-2">📝 About this code:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Ready to deploy:</strong> This is real Solidity code you can use in production</li>
            <li><strong>Safety checks:</strong> Includes timestamp validation and price deviation limits</li>
            <li><strong>Customizable:</strong> Click "Edit" to modify it for your needs</li>
            <li><strong>Next steps:</strong> Copy this code to Remix, Hardhat, or Foundry to deploy</li>
          </ul>
        </div>
      )}

      <div className="rounded-lg overflow-hidden border border-gray-700">
        {isEditing ? (
          <Editor
            height="500px"
            defaultLanguage="sol"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
            }}
          />
        ) : (
          <pre className="bg-gray-950 text-gray-300 p-4 text-xs overflow-x-auto font-mono leading-relaxed">
            {code}
          </pre>
        )}
      </div>

      {beginnerMode && (
        <div className="mt-4 text-xs text-gray-400 bg-green-500/10 border border-green-500/30 rounded p-3">
          <p className="font-semibold text-green-400 mb-2">🎓 Learning Resources:</p>
          <ul className="space-y-1">
            <li>
              <a href="https://docs.redstone.finance/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">
                RedStone Documentation
              </a> - Learn more about oracle integration
            </li>
            <li>
              <a href="https://remix.ethereum.org/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">
                Remix IDE
              </a> - Deploy and test your contract online
            </li>
            <li>
              <a href="https://docs.soliditylang.org/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">
                Solidity Docs
              </a> - Learn the Solidity programming language
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;