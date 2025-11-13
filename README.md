# RedStone Oracle Playground

> Interactive testing environment for the RedStone Pull Model - Test oracle integrations with real-time data feeds

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![RedStone](https://img.shields.io/badge/RedStone-FF3333?logo=redstone&logoColor=white)](https://redstone.finance/)

## 📖 Overview

RedStone Oracle Playground is an educational tool designed for developers to understand, test, and experiment with RedStone's Pull Model oracle integration. Whether you're building DeFi protocols, NFT marketplaces, or any dApp requiring reliable price feeds, this playground helps you:

- 🧪 **Test oracle behavior** under different scenarios
- 🌐 **Fetch real-time data** from RedStone's decentralized network
- 🎓 **Learn best practices** for oracle integration
- 💻 **Generate Solidity code** for your contracts
- 🔍 **Debug data packages** with visual inspection tools

## ✨ Features

### 🎯 Core Functionality

- **Real-Time Price Feeds**: Fetch live data for ETH, BTC, SOL and more from RedStone's oracle network
- **Mock Data Simulation**: Test without API calls using realistic mock data
- **Interactive Code Editor**: Edit and customize Solidity contracts with Monaco Editor (VSCode-like experience)
- **Visual Debugging**: Inspect data packages, signatures, timestamps, and median calculations
- **Educational Info Cards**: Context-aware explanations for each scenario
- **Beginner Mode**: Toggle detailed explanations, tooltips, and step-by-step guidance for newcomers
- **Smart Tooltips**: Inline help system with hover and click tooltips throughout the interface

### 🎮 Scenario Testing

Test your oracle integration under 5 different scenarios:

| Scenario | Description | Use Case |
|----------|-------------|----------|
| **Normal Operation** | Standard oracle behavior with reliable data | Baseline testing |
| **Price Spike** | Simulates 15% sudden price increase | Test circuit breakers and slippage protection |
| **Delayed Feed** | 30-second old data timestamps | Validate timestamp freshness checks |
| **Corrupt Signer** | Malicious oracle node providing bad data | Test median aggregation resilience |
| **Outlier Injection** | Extreme outlier values | Verify data validation logic |

### 🛠️ Technical Features

- **RedStone SDK Integration**: Official SDK for production-ready oracle data
- **TypeScript**: Full type safety throughout the codebase
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Live data fetching with configurable parameters
- **Custom Scenarios**: Adjust parameters manually for advanced testing
- **Beginner-Friendly UI**: Progressive disclosure with toggleable expert features
- **Inline Help System**: Contextual tooltips and explanations throughout
- **Accessibility**: Keyboard navigation, ARIA labels, and screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Basic understanding of Solidity and oracles
- (Optional) Wallet for on-chain testing

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/redstone-oracle-playground.git
cd redstone-oracle-playground

# Install dependencies
npm install

# Start development server
npm run dev
```

The playground will be available at `http://localhost:3000`

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📚 How to Use

### 🎓 New to Oracles? Start Here!

1. **Enable Beginner Mode** (toggle in header)
   - Shows detailed explanations for every feature
   - Provides inline tooltips on technical terms
   - Guides you step-by-step through the process

2. **Understand Data Sources** (click "What's the difference?" in header)
   - Learn when to use Mock Data vs Real Data
   - See practical examples and use cases

3. **Follow the Quick Start Guide** (appears when Beginner Mode is on)
   - Pick a cryptocurrency
   - Run a simple simulation
   - Learn what the results mean

### 1️⃣ Select a Price Feed

Choose from available feeds:
- **Ethereum (ETH)**: Most popular cryptocurrency for DeFi applications
- **Bitcoin (BTC)**: First and largest cryptocurrency by market cap
- **Solana (SOL)**: Fast, low-cost blockchain platform

Each feed card includes:
- Cryptocurrency icon and name
- Brief description of the asset
- In Beginner Mode: Extended educational context

**Note:** Price values are shown only in simulation results, not during selection. This avoids confusion and lets you focus on learning oracle behavior rather than tracking live prices.

### 2️⃣ Choose Data Source

**Beginner Mode Toggle** 👶

Enable Beginner Mode in the header to see:
- Detailed step-by-step explanations
- Inline tooltips on every feature
- "What could go wrong?" sections
- "How to protect yourself" guidance
- Quick start guides and learning tips

Perfect for newcomers to oracles and smart contracts!

**Mock Data Mode** (Default)
- Uses realistic simulated data
- No API calls required
- Perfect for learning and testing scenarios
- Instant response time

**Real Data Mode** (Toggle checkbox)
- Fetches live data from RedStone's oracle network
- Multiple signers (typically 3-5) provide price data
- Real signatures and timestamps
- Median aggregation applied automatically

**Understanding the difference:**
Click "What's the difference?" in the header to see a detailed comparison between Mock Data and Real Data modes. This helps you understand when to use each mode and what benefits each provides.

### 3️⃣ Select a Scenario

Choose a pre-configured scenario or use **Custom Parameters**:

#### Normal Operation ✅
Standard oracle behavior - all nodes provide accurate, fresh data.

**When to use:**
- Baseline testing
- Integration validation
- Performance benchmarking

#### Price Spike 📈
Simulates a sudden 15% price increase from real values.

**When to use:**
- Test circuit breakers
- Validate slippage protection
- Stress-test liquidation logic

**Example:** ETH at $3,500 → Simulated at $4,025 (+15%)

#### Delayed Feed ⏰
Timestamps are 30 seconds old.

**When to use:**
- Validate `isTimestampValid()` checks
- Test staleness detection
- Ensure your contract rejects old data

**Best practice:** Most contracts should reject data older than 1-5 minutes depending on the use case.

#### Corrupt Signer ⚠️
One signer provides intentionally bad data (50% of real value).

**When to use:**
- Test median calculation resilience
- Verify multi-signer requirements
- Validate byzantine fault tolerance

**Key insight:** With 3+ signers, one corrupt signer won't affect the median significantly.

#### Outlier Injection 🎯
One value is 50% higher than the real price.

**When to use:**
- Test extreme outlier filtering
- Verify aggregation logic
- Validate data sanity checks

### 4️⃣ Run Simulation

Click **"Run Simulation"** to execute the test.

**What happens:**
1. Data is fetched (real or mock)
2. Scenario modifications are applied
3. Median price is calculated
4. Data package is assembled
5. Results are displayed with explanations

### 5️⃣ Inspect Results

**Median Price**
- Final aggregated price from all signers
- Uses median (not mean) for outlier resistance

**Data Points Table**
- Individual values from each signer
- Timestamps (check freshness!)
- Cryptographic signatures

**Transaction Details**
- Simulated contract address
- Mock transaction hash
- Estimated gas usage
- Block number

**What's Happening? Card**
- Scenario explanation
- Educational context
- "Why it matters" insights
- **What could go wrong?** - Real-world consequences
- **How to protect yourself** - Security best practices
- Median calculation breakdown

**In Beginner Mode:**
- Additional tooltips on every data field
- Glossary definitions (hover over ? icons)
- Plain language explanations
- Learning tips and next steps

### 6️⃣ Generate & Edit Contract

**View Generated Contract:**
- Scroll to the "Generated Consumer Contract" section
- See Solidity code customized for your selected feed

**Edit Contract:**
- Click **"✏️ Edit"** button
- Use Monaco Editor (VSCode-like)
- Make modifications in real-time
- Click **"✓ Done"** when finished

**Copy Contract:**
- Click **"📋 Copy"** to copy to clipboard
- Paste into Remix, Hardhat, or Foundry
- Deploy and test on-chain

## Architecture

### Project Structure

```
redstone-oracle-playground/
├── components/
│   ├── Header.tsx              # App header with branding & Beginner Mode toggle
│   ├── ConfigurationPanel.tsx  # Feed selection & scenarios (UX improved)
│   ├── ResultsPanel.tsx        # Simulation results with detailed feedback
│   ├── CodeEditor.tsx          # Monaco-based code editor with beginner help
│   ├── InfoCard.tsx            # Educational explanations with consequences
│   └── Tooltip.tsx             # Reusable tooltip component (hover & click)
├── types.ts                     # TypeScript type definitions
├── constants.ts                 # Supported feeds configuration
├── scenarioDescriptions.ts      # Scenario metadata
├── App.tsx                      # Main application logic with beginnerMode state
└── index.tsx                    # App entry point
```

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **@redstone-finance/sdk** | Oracle data fetching |
| **@monaco-editor/react** | Code editor |
| **Lucide React** | Icons |

### Data Flow

```
User Input → Scenario Selection → Data Fetch (Real/Mock)
    ↓
Scenario Modifications Applied
    ↓
Median Calculation
    ↓
Results Display + Educational Context
    ↓
Solidity Contract Generation
```

## 🔧 Configuration

### Supported Price Feeds

Add or modify feeds in `constants.ts`:

```typescript
export const SUPPORTED_FEEDS = [
  {
    id: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    currentPrice: 3732.76,
  },
  // Add more feeds here
];
```

### Scenario Parameters

Customize in `App.tsx`:

```typescript
const presets: Record<string, ScenarioParams> = {
  price_spike: { 
    priceShift: 15,        // Percentage increase
    timestampDelay: 0,     // Seconds
    corruptSigners: 0,     // Number of corrupt nodes
    outlierValue: 0        // Percentage outlier
  },
  // Modify or add scenarios
};
```

### RedStone Configuration

Adjust data fetching in `App.tsx`:

```typescript
const response = await requestDataPackages({
  dataServiceId: "redstone-primary-prod",  // Production data service
  uniqueSignersCount: 3,                   // Number of signers (2-5 recommended)
  dataPackagesIds: [selectedFeed],         // Feed IDs to fetch
  authorizedSigners: authorizedSigners,    // Authorized signer addresses
  urls: ["https://oracle-gateway-1.a.redstone.finance"], // Gateway URLs
});
```

**Understanding `uniqueSignersCount`:**

This parameter controls the security vs cost trade-off:

| Signers | Gas Cost | Security | Use Case |
|---------|----------|----------|----------|
| 1 | ~50k | ⚠️ Low | ❌ Never in production |
| 2 | ~65k | ⚡ Minimal | Development/Testnet |
| 3 | ~80k | ✅ Good | **Recommended for most dApps** |
| 5 | ~110k | 🛡️ High | Critical DeFi protocols |
| 10+ | ~200k+ | 🏰 Maximum | Special cases only |

**Why more signers cost more gas:**
- Each signer provides data that must be processed on-chain
- More data = more calldata = more gas fees
- However, more signers = better protection against corrupt/malicious data

**Median calculation resilience:**
- With 3 signers: 1 corrupt signer won't affect the median
- With 2 signers: 1 corrupt signer corrupts 50% of the data
- With 5 signers: 2 corrupt signers still filtered out by median

**Our recommendation:** Use 3 signers as the minimum for production. It offers the best balance between security and cost.

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Mock Data**: All scenarios work with mock data
- [ ] **Real Data**: Successfully fetches live prices for ETH, BTC, SOL
- [ ] **Scenarios**: Each scenario applies modifications correctly
- [ ] **Code Editor**: Can edit and copy generated contracts
- [ ] **Responsive**: Works on mobile and desktop
- [ ] **Performance**: Simulations complete in < 3 seconds

### Test Scenarios

```bash
# Test 1: Mock Normal Operation
1. Select ETH
2. Keep "Use Real Data" unchecked
3. Select "Normal Operation"
4. Run → Should show mock ETH price (~$3,700)

# Test 2: Real Data Fetching
1. Select BTC
2. Check "Use Real Data"
3. Run → Should show live BTC price (~$106,000)

# Test 3: Price Spike with Real Data
1. Select SOL
2. Check "Use Real Data"
3. Select "Price Spike"
4. Run → Should show SOL price + 15%
```

## 🎨 User Experience Features

### Beginner Mode 👶

Toggle Beginner Mode in the header to unlock:

- **Step-by-step guidance**: Clear instructions for every action
- **Inline tooltips**: Hover over ? icons to learn technical terms
- **Extended explanations**: Understand not just what happens, but why it matters
- **Quick start guide**: Get up and running in minutes
- **Learning tips**: Context-aware suggestions throughout your journey
- **Plain language**: Technical concepts explained without jargon

### Smart Help System

- **Hover tooltips**: For terms with enough space
- **Click tooltips (?)**: For compact areas like table headers
- **Info panels**: Expandable sections with detailed explanations
- **Data mode comparison**: Understand Mock vs Real Data at a glance

### Consequence-Aware Learning

Every scenario now includes:
- **What could go wrong?** Real-world risks and consequences
- **How to protect yourself?** Practical security best practices
- **Why it matters** Educational context for each feature

### Improved Feedback

After running simulations, see:
- **Results summary**: Clear success/failure indicators
- **Data freshness**: Visual indication of how recent the data is
- **What this means**: Plain language explanation of results
- **Next steps**: Suggestions for what to try next

## 🐛 Troubleshooting

### Issue: "Simulation failed" error

**Cause:** Network request to RedStone failed

**Solution:**
1. Check internet connection
2. Try with "Mock Data" mode first
3. Check browser console for detailed error messages
4. Verify RedStone gateway is accessible

### Issue: Values showing as $0.00 or $NaN

**Cause:** Data parsing error or decimals misconfiguration

**Solution:**
1. Check browser console logs
2. Verify feed ID matches RedStone's supported feeds
3. Try a different feed (ETH, BTC, or SOL)

### Issue: Code editor not loading

**Cause:** Monaco Editor CDN issue

**Solution:**
1. Check internet connection
2. Clear browser cache
3. Try a different browser

### Issue: "Authorized signers array cannot be empty"

**Cause:** RedStone SDK configuration issue

**Solution:**
- Already handled in code via `getSignersForDataServiceId()`
- If persists, check SDK version: `npm list @redstone-finance/sdk`

## 📖 Learning Resources

### RedStone Documentation
- [RedStone Docs](https://docs.redstone.finance/)
- [Pull Model Guide](https://docs.redstone.finance/docs/dapps/redstone-pull/)
- [SDK Reference](https://www.npmjs.com/package/@redstone-finance/sdk)

### Oracle Best Practices
- Always validate timestamp freshness
- Use median (not mean) for aggregation
- Require multiple signers (3+ recommended)
- Implement circuit breakers for extreme values
- Test with various scenarios before mainnet

### Example Integration

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract MyDeFiProtocol is MainDemoConsumerBase {
    uint256 public constant MAX_TIMESTAMP_DELAY = 3 minutes;
    uint256 public constant MAX_PRICE_DEVIATION = 10; // 10%
    
    function executeWithOraclePrice() public {
        // Fetch ETH price
        uint256 ethPrice = getOracleNumericValueFromTxMsg(bytes32("ETH"));
        
        // Validate price is reasonable (example: between $1k and $10k)
        require(ethPrice > 1000e8 && ethPrice < 10000e8, "Price out of range");
        
        // Your business logic here
        // ...
    }
    
    // Override to customize timestamp validation
    function isTimestampValid(uint256 receivedTimestamp) 
        public 
        view 
        override 
        returns (bool) 
    {
        return block.timestamp - receivedTimestamp <= MAX_TIMESTAMP_DELAY;
    }
}
```

## 🗺️ Roadmap

### Phase 1: MVP ✅ (Completed)
- [x] Real-time price feeds (ETH, BTC, SOL)
- [x] Mock data simulation
- [x] 5 scenario testing modes
- [x] Interactive code editor
- [x] Educational info cards
- [x] Visual debugging tools
- [x] **Beginner Mode with progressive disclosure**
- [x] **Smart tooltip system (hover + click)**
- [x] **Consequence-aware scenario explanations**
- [x] **Improved feedback and results display**
- [x] **Data mode comparison (Mock vs Real)**

### Phase 2: Enhanced Learning 🔄 (In Progress)
- [ ] Interactive tutorial (step-by-step guided walkthrough)
- [ ] More price feeds (50+ assets)
- [ ] Historical data playback
- [ ] Saved scenarios/workspaces
- [ ] Contract testing framework integration
- [ ] Multi-language support (i18n)

### Phase 3: Advanced Features 🔮 (Future)
- [ ] Multi-chain support (Ethereum, Arbitrum, Base, etc.)
- [ ] On-chain contract deployment
- [ ] Gas estimation tools
- [ ] Scenario sharing (import/export)
- [ ] Custom data service configuration
- [ ] WebSocket real-time updates

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow existing code style (Prettier + ESLint)
- Add comments for complex logic
- Test scenarios before committing
- Update README for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **RedStone Finance** for the excellent oracle infrastructure
- **Monaco Editor** for the VSCode-like code editing experience
- **Tailwind CSS** for the beautiful UI components
- The Ethereum developer community for feedback and inspiration

---

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

---

<div align="center">

**Built for the Web3 developer community**

**Isamar Suarez 🦈**

[![Twitter](https://img.shields.io/twitter/follow/isasuarezx2?style=social)](https://twitter.com/isasuarezx2)
[![GitHub](https://img.shields.io/github/followers/Felurianx2?style=social)](https://github.com/Felurianx2)

*Last updated: November 2025*
</div>
