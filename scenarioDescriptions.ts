export const SCENARIO_DESCRIPTIONS = {
  normal: {
    title: "Normal Operation",
    description: "Standard oracle behavior with all nodes providing accurate data",
    icon: "✅",
  },
  price_spike: {
    title: "Price Spike",
    description: "Simulates sudden 15% price increase to test contract resilience during volatile markets",
    icon: "📈",
  },
  delayed_feed: {
    title: "Delayed Feed",
    description: "Tests contract behavior with 30s old data to validate timestamp freshness checks",
    icon: "⏰",
  },
  corrupt_signer: {
    title: "Corrupt Signer",
    description: "Simulates 1 malicious oracle node to test median calculation's ability to filter bad data",
    icon: "⚠️",
  },
  outlier_injection: {
    title: "Outlier Injection",
    description: "Injects extreme outlier value to test median aggregation robustness",
    icon: "🎯",
  },
  custom: {
    title: "Custom Parameters",
    description: "Manually adjust parameters to create your own test scenarios",
    icon: "⚙️",
  },
} as const;

export type ScenarioKey = keyof typeof SCENARIO_DESCRIPTIONS;