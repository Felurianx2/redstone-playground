import type { Feed, ScenarioPreset } from './types';

export const SUPPORTED_FEEDS: Feed[] = [
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH', currentPrice: 3732.76 },
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', currentPrice: 105180.73 },
  { id: 'SOL', name: 'Solana', symbol: 'SOL', currentPrice: 176.98 }
];

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  { id: 'normal', name: 'Normal Operation', description: 'Standard oracle behavior' },
  { id: 'price_spike', name: 'Price Spike', description: '15% sudden price increase' },
  { id: 'delayed_feed', name: 'Delayed Feed', description: '30s timestamp delay' },
  { id: 'corrupt_signer', name: 'Corrupt Signer', description: '1 malicious signer' },
  { id: 'outlier_injection', name: 'Outlier Injection', description: 'Extreme price values' }
];