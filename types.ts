
export interface Feed {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
}

export interface ScenarioParams {
  priceShift: number;
  timestampDelay: number;
  corruptSigners: number;
  outlierValue: number;
}

export type SimulationState = 'idle' | 'running' | 'completed' | 'error';

export interface DataPoint {
  id: string;
  value: number;
  timestamp: number;
}

export interface DataPackage {
  dataPoints: DataPoint[];
  signatures: string[];
}

export interface DebugData {
  dataPackage: DataPackage;
  medianPrice: number;
  gasUsed: number;
  transactionHash: string;
  blockNumber: number;
}
