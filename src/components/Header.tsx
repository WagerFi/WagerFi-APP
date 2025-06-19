import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WalletButton from './WalletButton';
import NotificationBell from './NotificationBell';

const Header: React.FC = () => {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full py-0.2 px-4 sm:px-6 flex justify-between items-center bg-dark-800/95 backdrop-blur-sm border-b border-slate-700/40 z-40 h-[85px]">
      <Link to="/" className="flex items-center gap-2 text-secondary-400 hover:text-secondary-300 transition-colors">
        {!imageLoadError ? (
          <img 
            src="https://raw.githubusercontent.com/WagerFi/WagerFi/refs/heads/main/Logo.png" 
            alt="WagerFi Logo" 
            className="w-24 h-24"
            onError={() => setImageLoadError(true)}
          />
        ) : (
          <div className="w-24 h-24 bg-secondary-900/50 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">W</span>
          </div>
        )}
      </Link>
      
      <div className="flex items-center gap-3">
        <NotificationBell />
        <WalletButton />
      </div>
    </header>
  );
};

export default Header;