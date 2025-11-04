# RedStone Oracle Playground

> Interactive testing environment for RedStone Oracle - Test oracle integrations with real-time data feeds

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![RedStone](https://img.shields.io/badge/RedStone-FF3333?logo=redstone&logoColor=white)](https://redstone.finance/)

> Demo: https://redstone-playground.vercel.app/

## 📖 Overview

RedStone Oracle Playground is an educational tool designed for developers to understand, test, and experiment with RedStone's Models oracle integration. Whether you're building DeFi protocols, NFT marketplaces, or any dApp requiring reliable price feeds, this playground helps you:

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

### 1️⃣ Select a Price Feed

Choose from available feeds:
- **Ethereum (ETH)**: Real-time ETH/USD price
- **Bitcoin (BTC)**: Real-time BTC/USD price
- **Solana (SOL)**: Real-time SOL/USD price

### 2️⃣ Choose Data Source

**Mock Data Mode** (Default)
- Uses realistic simulated data
- No API calls required
- Perfect for learning and testing scenarios
- Instant response time

**Real Data Mode** (Toggle checkbox)
- Fetches live data from RedStone's oracle network
- Multiple signers (typically 2-5) provide price data
- Real signatures and timestamps
- Median aggregation applied automatically

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
- Median calculation breakdown

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
│   ├── Header.tsx              # App header with branding
│   ├── ConfigurationPanel.tsx  # Feed selection & scenarios
│   ├── ResultsPanel.tsx        # Simulation results display
│   ├── CodeEditor.tsx          # Monaco-based code editor
│   └── InfoCard.tsx            # Educational explanations
├── types.ts                     # TypeScript type definitions
├── constants.ts                 # Supported feeds configuration
├── scenarioDescriptions.ts      # Scenario metadata
├── App.tsx                      # Main application logic
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
  uniqueSignersCount: 2,                   // Minimum signers required
  dataPackagesIds: [selectedFeed],         // Feed IDs to fetch
  authorizedSigners: authorizedSigners,    // Authorized signer addresses
  urls: ["https://oracle-gateway-1.a.redstone.finance"], // Gateway URLs
});
```

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

### Phase 1: MVP ✅ (Current)
- [x] Real-time price feeds (ETH, BTC, SOL)
- [x] Mock data simulation
- [x] 5 scenario testing modes
- [x] Interactive code editor
- [x] Educational info cards
- [x] Visual debugging tools

### Phase 2: Enhanced Learning 🔄 (Next)
- [ ] Interactive tutorial (step-by-step guide)
- [ ] More price feeds (50+ assets)
- [ ] Historical data playback
- [ ] Saved scenarios/workspaces
- [ ] Contract testing framework integration

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

## 🌟 Star History

If you find this project helpful, please consider giving it a star ⭐

---

<div align="center">

**Built with ❤️ for the Web3 developer community**

**Isamar Suarez 🦈**

[![Twitter](https://img.shields.io/twitter/follow/isasuarezx2?style=social)](https://twitter.com/isasuarezx2)
[![GitHub](https://img.shields.io/github/followers/Felurianx2?style=social)](https://github.com/Felurianx2)

*Last updated: November 2025*
</div>
