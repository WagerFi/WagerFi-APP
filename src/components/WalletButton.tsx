import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, ExternalLink, ChevronDown, Settings } from 'lucide-react';
import { useWalletContext } from '../contexts/WalletContext';
import { getDisplayUsername } from '../lib/chat';
import { DEFAULT_USER_IMAGE, FALLBACK_USER_IMAGE } from '../utils/constants';

interface WalletButtonProps {
  className?: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { 
    connected, 
    walletAddress, 
    balance, 
    userProfile,
    connectWallet, 
    disconnectWallet 
  } = useWalletContext();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && 
          buttonRef.current && 
          !dropdownRef.current.contains(event.target as Node) &&
          !buttonRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle wallet connect
  const handleConnectWallet = () => {
    connectWallet();
  };

  // Handle wallet disconnect
  const handleDisconnectWallet = () => {
    disconnectWallet();
    setShowDropdown(false);
  };

  // Open Solana Explorer
  const openExplorer = () => {
    if (walletAddress) {
      window.open(`https://explorer.solana.com/address/${walletAddress}?cluster=devnet`, '_blank');
      setShowDropdown(false);
    }
  };

  // Navigate to dashboard
  const navigateToDashboard = () => {
    navigate('/dashboard');
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      {connected ? (
        <>
          <button 
            ref={buttonRef}
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-dark-850 hover:bg-dark-800 px-3 py-1.5 rounded-full border border-slate-700/40 
                    text-sm font-medium text-gray-300 transition-colors"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-dark-800 border border-slate-700/40">
              {userProfile?.profile_image_url ? (
                <img 
                  src={userProfile.profile_image_url} 
                  alt={userProfile.username || 'Profile'} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_USER_IMAGE;
                    (e.target as HTMLImageElement).onerror = () => {
                      (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                    };
                  }}
                />
              ) : (
                <img 
                  src={DEFAULT_USER_IMAGE} 
                  alt="WagerFi Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                  }}
                />
              )}
            </div>
            <span>{getDisplayUsername(userProfile?.username, walletAddress || '')}</span>
            <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div 
              ref={dropdownRef} 
              className="absolute right-0 mt-2 w-64 bg-dark-850 rounded-lg shadow-lg border border-slate-700/50 py-2 z-[60]"
            >
              <div className="px-4 py-2 border-b border-slate-700/50">
                <p className="text-xs text-gray-400">Connected as</p>
                <p className="text-sm font-medium text-gray-200 truncate">{walletAddress}</p>
              </div>
              
              {balance !== null && (
                <div className="px-4 py-2 border-b border-slate-700/50">
                  <p className="text-xs text-gray-400">Balance</p>
                  <p className="text-sm font-medium text-primary-400">{balance.toFixed(4)} SOL</p>
                  <p className="text-xs text-gray-500">on Solana Devnet</p>
                </div>
              )}
              
              <div className="px-2 py-1">
                <button 
                  onClick={navigateToDashboard}
                  className="w-full text-left px-2 py-1.5 text-sm text-gray-300 hover:bg-dark-800 rounded flex items-center gap-2"
                >
                  <Settings size={14} />
                  User Dashboard
                </button>
                
                <button 
                  onClick={openExplorer}
                  className="w-full text-left px-2 py-1.5 text-sm text-gray-300 hover:bg-dark-800 rounded flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  View on Explorer
                </button>
                
                <button 
                  onClick={handleDisconnectWallet}
                  className="w-full text-left px-2 py-1.5 text-sm text-red-400 hover:bg-dark-800 rounded"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <button 
          onClick={handleConnectWallet}
          className="flex items-center gap-2 bg-gradient-to-r from-secondary-600 to-primary-600 
                   hover:from-secondary-500 hover:to-primary-500 px-3 py-1.5 rounded-full
                   text-sm font-medium text-white transition-all hover:shadow-glow"
        >
          <Wallet size={14} />
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletButton;