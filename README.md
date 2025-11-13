# RedStone Oracle Playground

> Interactive testing environment for RedStone oracles - Learn, test, and deploy oracle integrations with confidence

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![RedStone](https://img.shields.io/badge/RedStone-FF3333?logo=redstone&logoColor=white)](https://redstone.finance/)

---

## 📖 Overview

**RedStone Oracle Playground** is an interactive, educational platform that bridges the gap between complex oracle documentation and practical developer understanding. Built for the RedStone Finance ecosystem, it transforms oracle integration from a daunting technical challenge into an intuitive, visual learning experience.

### 🎯 Mission

Make blockchain oracles accessible to everyone - from curious beginners to experienced developers - through hands-on experimentation, real-time feedback, and consequence-aware learning.

---

## ✨ Key Features

### 🎓 **Beginner-Friendly Learning**

- **Beginner Mode Toggle**: Progressive disclosure system that shows/hides detailed explanations
- **Smart Tooltips**: Contextual help on hover and click throughout the entire interface
- **Educational Info Cards**: Learn not just *what* happens, but *why it matters* and *how to protect yourself*
- **Quick Start Guide**: Step-by-step onboarding for complete beginners
- **Plain Language**: Complex concepts explained without jargon

### 🧪 **Interactive Testing**

Test oracle behavior under real-world conditions:

| Scenario | What It Tests | Real-World Risk |
|----------|---------------|-----------------|
| **✅ Normal Operation** | Standard oracle behavior | Baseline - everything working correctly |
| **📈 Price Spike** | 15% sudden price increase | User liquidations, slippage, flash crashes |
| **⏰ Delayed Feed** | 30-second stale timestamps | Trading at outdated prices, arbitrage exploitation |
| **⚠️ Corrupt Signer** | 1 malicious oracle node | Price manipulation, system compromise |
| **🎯 Outlier Injection** | Extreme price outliers | Flash crashes, cascading liquidations |

### **Dual Data Sources**

**🧪 Mock Data Mode:**
- Simulated prices for fast learning
- No API calls required
- Perfect for understanding concepts
- Instant response time

**🌐 Real Data Mode:**
- Live prices from RedStone's public API
- 3 independent signers
- Actual market conditions
- Real timestamps and signatures

### 💻 **Code Generation**

- **Monaco Editor Integration**: VS Code-like editing experience
- **Production-Ready Solidity**: Generated contracts include:
  - Timestamp validation
  - Price deviation limits
  - Signer verification
  - Comprehensive comments
- **Copy & Deploy**: One-click copy for Remix, Hardhat, or Foundry

### 🔍 **Visual Debugging**

- **Data Points Table**: Inspect values from each oracle signer
- **Median Calculation**: See how outliers are filtered
- **Timestamp Analysis**: Data freshness indicators
- **Transaction Simulation**: Gas estimates and contract addresses
- **Signature Verification**: Cryptographic proof display

### 🛡️ **Consequence-Aware Design**

Every scenario includes:
- **⚠️ What Could Go Wrong**: Real-world consequences and risks
- **🛡️ How to Protect Yourself**: Actionable security recommendations
- **💡 Why It Matters**: Educational context for each feature

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+ 
npm or yarn
Modern browser (Chrome, Firefox, Safari, Edge)
```

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/redstone-oracle-playground.git
cd redstone-oracle-playground

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📚 How to Use

### 🎓 For Beginners

1. **Enable Beginner Mode** (top left toggle)
   - Activates detailed explanations
   - Shows helpful tooltips everywhere
   - Displays step-by-step guidance

2. **Understand Data Sources**
   - Click "What's the difference?" in header
   - Learn when to use Mock vs Real Data
   - See practical examples

3. **Run Your First Simulation**
   - Select **Ethereum**
   - Keep **Normal Operation** selected
   - Click **"Run Simulation"**
   - Explore the results!

4. **Learn from Each Scenario**
   - Try different scenarios
   - Read "What could go wrong?"
   - Apply "How to protect yourself" tips

### 👨‍💻 For Experienced Developers

1. **Test Edge Cases**
   - Run all 5 scenarios with Real Data
   - Validate your assumptions
   - Identify potential vulnerabilities

2. **Generate Production Code**
   - Copy generated Solidity contracts
   - Customize for your use case
   - Deploy with confidence

3. **Debug Oracle Integration**
   - Inspect data packages
   - Verify signatures
   - Validate timestamp freshness

---

## 🎮 Interface Guide

### Header Section

```
┌─────────────────────────────────────────────────┐
│ [RedStone Logo] RedStone Oracle Playground      │
│                                                 │
│ [Push Model] [Pull Model] [Hybrid] [Architecture]│
├─────────────────────────────────────────────────┤
│ [Beginner Mode ?]    [What's the difference?]│
│                          [🧪 Use Mock Data ?]   │
└─────────────────────────────────────────────────┘
```

**Controls:**
- **Beginner Mode**: Toggle explanations on/off
- **Data Mode**: Switch between Mock and Real Data
- **What's the difference?**: Compare data sources

### Feed Selection

Choose your cryptocurrency:
- **Ethereum (ETH)**: Most popular for DeFi
- **Bitcoin (BTC)**: Largest by market cap
- **Solana (SOL)**: Fast, low-cost platform

### Scenario Selection

Pick a test scenario or use **Normal Operation** for baseline testing.

### Results Panel

After running simulation:
- ✅ **Success Summary**: Key metrics at a glance
- 📊 **Median Price**: Calculated from all signers
- 📋 **Data Points Table**: Individual signer data
- 🔍 **Transaction Details**: Simulated on-chain data
- 📝 **What's Happening Card**: Educational context
- 💻 **Generated Code**: Production-ready Solidity

---

## Architecture

### Technology Stack

```
Frontend:
├── React 18.3
├── TypeScript 5.6
├── Vite 5.4
└── Tailwind CSS 3.4

Oracle Integration:
├── RedStone Public API
└── Fetch API (native browser)

Code Editor:
└── Monaco Editor (VS Code engine)

Deployment:
└── Vercel (recommended)
```

### Project Structure

```
redstone-oracle-playground/
├── src/
│   ├── components/
│   │   ├── Header_UX.tsx          # Main header with toggles
│   │   ├── ConfigurationPanel_UX.tsx # Feed & scenario selection
│   │   ├── ResultsPanel_UX.tsx    # Simulation results
│   │   ├── InfoCard.tsx           # Educational context
│   │   ├── CodeEditor.tsx         # Monaco editor
│   │   └── Tooltip.tsx            # Reusable tooltip
│   ├── types.ts                   # TypeScript definitions
│   ├── constants.ts               # Feed configurations
│   ├── App.tsx                    # Main application
│   └── main.tsx                   # Entry point
├── public/
│   └── assets/
│       └── logo.png               # RedStone logo
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Data Flow

```
User Action → Component State → API Call (if Real Data)
     ↓                              ↓
Scenario Params → Apply Modifications → Calculate Median
     ↓                              ↓
Generate Code ← Update UI ← Format Results
```

---

## 🔧 Configuration

### Supported Feeds

Currently supported cryptocurrencies:

```typescript
const SUPPORTED_FEEDS = [
  { id: "ETH", name: "Ethereum", symbol: "ETH", currentPrice: 3418.58 },
  { id: "BTC", name: "Bitcoin", symbol: "BTC", currentPrice: 96842.50 },
  { id: "SOL", name: "Solana", symbol: "SOL", currentPrice: 238.42 }
];
```

### Scenario Parameters

```typescript
interface ScenarioParams {
  priceShift: number;        // Percentage price change
  timestampDelay: number;    // Seconds of delay
  corruptSigners: number;    // Number of malicious signers
  outlierValue: number;      // Outlier percentage
}
```

### Data Freshness Criteria

| Age | Status | Color |
|-----|--------|-------|
| < 1 min | Very Fresh | 🟢 Green |
| 1-3 min | Fresh | 🔵 Blue |
| 3-5 min | Acceptable | 🟡 Yellow |
| > 5 min | Stale | 🔴 Red |

---

## 🧪 Testing

### Manual Testing

Use the comprehensive checklist:

```bash
# See TESTING_CHECKLIST.md for full testing guide
./docs/TESTING_CHECKLIST.md
```

### Test Coverage

60+ manual tests covering:
- ✅ All UI components
- ✅ Mock Data scenarios
- ✅ Real Data integration
- ✅ Error handling
- ✅ Responsiveness
- ✅ Cross-browser compatibility
- ✅ Accessibility

---

## 📖 Educational Resources

### In-App Learning

- **Beginner Mode**: Toggle for progressive disclosure
- **Tooltips**: Hover over (?) icons for explanations
- **Info Cards**: Context-aware educational content
- **Consequences**: "What could go wrong?" sections
- **Protections**: "How to protect yourself" guides

### External Resources

- [RedStone Documentation](https://docs.redstone.finance/)
- [RedStone Blog](https://blog.redstone.finance/)
- [Solidity Docs](https://docs.soliditylang.org/)
- [Remix IDE](https://remix.ethereum.org/)

---

## 🐛 Troubleshooting

### Common Issues

**Q: Simulation fails with Real Data**
```
A: Check your internet connection. Try switching to Mock Data mode.
   Verify the RedStone API is accessible from your network.
```

**Q: Data shows as "Stale"**
```
A: This is normal for public APIs. Data 1-3 minutes old is still reliable.
   The playground shows freshness status for educational purposes.
```

**Q: Code editor not loading**
```
A: Ensure JavaScript is enabled. Clear browser cache.
   Try a different browser (Chrome recommended).
```

**Q: Tooltips not appearing**
```
A: Enable Beginner Mode first. Some tooltips only appear in this mode.
   Try clicking the (?) icons for click-based tooltips.
```

### Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Completed - v2.0.0)
- [x] Real-time price feeds (ETH, BTC, SOL)
- [x] Mock data simulation
- [x] 5 scenario testing modes
- [x] Interactive code editor
- [x] Educational info cards
- [x] Visual debugging tools
- [x] Beginner Mode with progressive disclosure
- [x] Smart tooltip system (hover + click)
- [x] Consequence-aware scenario explanations
- [x] Improved feedback and results display
- [x] Data mode comparison (Mock vs Real)

### 🔄 Phase 2: Enhanced Learning (Q1 2026)
- [ ] Interactive tutorial (guided walkthrough)
- [ ] 50+ price feeds
- [ ] Historical data playback
- [ ] Saved scenarios/workspaces
- [ ] Contract testing framework integration
- [ ] Multi-language support (i18n)
- [ ] Video tutorials
- [ ] Gamification (achievements, progress tracking)

### 🚀 Phase 3: Advanced Features (Q2 2026)
- [ ] Multi-oracle comparison (Chainlink, Pyth, etc.)
- [ ] Custom feed creation
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] API access for automated testing
- [ ] Hardhat/Foundry plugins
- [ ] CI/CD integration
- [ ] Multi-chain support (Arbitrum, Polygon, Base)

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Commit with conventional commits
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Open a Pull Request
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Follow provided configuration
- **Prettier**: Auto-formatting on save
- **Components**: Functional components with hooks
- **CSS**: Tailwind utility classes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **RedStone Finance** - For the oracle infrastructure and API
- **Monaco Editor** - For the excellent code editor
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the blazing fast build tool
- **React Team** - For the amazing framework

---

## 📞 Support & Community

- **Documentation**: [docs.redstone.finance](https://docs.redstone.finance)
- **Discord**: [discord.gg/redstone](https://discord.gg/redstone)
- **Twitter**: [@redstone_defi](https://twitter.com/redstone_defi)
- **GitHub Issues**: [Report bugs](https://github.com/yourusername/redstone-oracle-playground/issues)
- **Email**: support@redstone.finance

---

## 🎬 Demo & Pitch

**Video Pitch**: [Watch on YouTube](#)  
**Live Demo**: [playground.redstone.finance](#)  
**Pitch Deck**: [View Slides](#)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/redstone-oracle-playground?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/redstone-oracle-playground?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/redstone-oracle-playground?style=social)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/redstone-oracle-playground&type=Date)](https://star-history.com/#yourusername/redstone-oracle-playground&Date)

---

<div align="center">

**Built for the RedStone Community**

[Website](https://redstone.finance) • [Docs](https://docs.redstone.finance) • [Blog](https://blog.redstone.finance) • [Twitter](https://twitter.com/redstone_defi)

</div>

3. **Follow the Quick Start Guide** (appears when Beginner Mode is on)
   - Pick a cryptocurrency
   - Run a simple simulation
   - Learn what the results mean

### 1️⃣ Select a Price Feed

Choose from available feeds:
- **🟣 Ethereum (ETH)**: Most popular cryptocurrency for DeFi applications
- **🟠 Bitcoin (BTC)**: First and largest cryptocurrency by market cap
- **🟢 Solana (SOL)**: Fast, low-cost blockchain platform

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

## 🏗️ Architecture

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

### Beginner Mode

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
