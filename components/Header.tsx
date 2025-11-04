import React from 'react';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Push Model', href: 'https://docs.redstone.finance/docs/dapps/redstone-push/' },
    { name: 'Pull Model', href: 'https://docs.redstone.finance/docs/dapps/redstone-pull/' },
    { name: 'Hybrid', href: 'https://docs.redstone.finance/docs/dapps/redstone-erc7412/' },
    { name: 'Architecture', href: 'https://docs.redstone.finance/docs/architecture/' },
  ];

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-black rounded-lg p-1">
              <img 
                src="/assets/logo.png" 
                alt="RedStone Logo"
                className="w-full h-full object-contain" 
              />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">RedStone Oracle Playground</h1>
            <p className="text-gray-400 mt-1">Interactive testing environment</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md bg-[#2a2a2a] hover:bg-[#3A3A3A] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;