import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import type { Feed } from '../types';

interface CodeEditorProps {
  selectedFeed: Feed;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ selectedFeed }) => {
  const defaultCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@redstone-finance/evm-connector/contracts/core/MainDemoConsumerBase.sol";

contract ${selectedFeed.id}PriceConsumer is MainDemoConsumerBase {
    function getLatest${selectedFeed.id}Price() public view returns (uint256) {
        return getOracleNumericValueFromTxMsg(bytes32("${selectedFeed.id}"));
    }
    
    function get${selectedFeed.id}PriceSecurely() public view returns (uint256) {
        return getOracleNumericValuesFromTxMsg(getDataFeedIdsArray())[0];
    }
    
    function getDataFeedIdsArray() public pure override returns (bytes32[] memory) {
        bytes32[] memory dataFeedIds = new bytes32[](1);
        dataFeedIds[0] = bytes32("${selectedFeed.id}");
        return dataFeedIds;
    }
}`;

  const [code, setCode] = useState(defaultCode);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const resetCode = () => {
    setCode(defaultCode);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-black/30">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h3 className="text-sm font-semibold text-gray-200">
            {isEditing ? 'Edit Contract' : 'Generated Consumer Contract'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors border ${
              isEditing 
                ? 'text-red-300 bg-red-500/20 border-red-500 hover:bg-red-500/30' 
                : 'text-gray-300 bg-gray-800/50 border-gray-700 hover:bg-gray-700'
            }`}
          >
            {isEditing ? '✓ Done' : '✏️ Edit'}
          </button>
          {isEditing && (
            <button
              onClick={resetCode}
              className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 rounded transition-colors border border-gray-700"
              title="Reset to default"
            >
              ↺ Reset
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 rounded transition-colors border border-gray-700"
            title="Copy to clipboard"
          >
            📋 Copy
          </button>
        </div>
      </div>
      
      {/* Editor / Code Display */}
      <div className="relative bg-black/20">
        {isEditing ? (
          <Editor
            height="400px"
            defaultLanguage="sol"
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <pre className="p-4 text-xs text-gray-300 font-mono overflow-x-auto max-h-96 overflow-y-auto">
            <code className="language-solidity">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;