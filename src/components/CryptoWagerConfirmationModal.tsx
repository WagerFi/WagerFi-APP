import React from 'react';
import { X, Check, User, ArrowRight } from 'lucide-react';
import { CryptoWager } from '../lib/wagers';
import { formatDateString } from '../utils/DateUtils';
import { getDisplayUsername } from '../lib/chat';

interface CryptoWagerConfirmationModalProps {
  wager: CryptoWager;
  onClose: () => void;
  onConfirm: (wagerId: string) => void;
  isConfirming: boolean;
}

const CryptoWagerConfirmationModal: React.FC<CryptoWagerConfirmationModalProps> = ({
  wager,
  onClose,
  onConfirm,
  isConfirming
}) => {
  // Format deadline date
  const formatDeadline = (dateString: string) => {
    return formatDateString(dateString, 'MMM d, yyyy');
  };
  
  // Get token logo URL
  const getTokenLogo = () => {
    // Always use official Solana logo for SOL
    const tokenSymbol = (wager.token_snapshot?.symbol || wager.token_symbol || '').toLowerCase();
    if (tokenSymbol === 'sol') {
      return 'https://solana.com/src/img/branding/solanaLogoMark.svg';
    }
    
    if (wager.token_snapshot?.logo) {
      return wager.token_snapshot.logo;
    }
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${wager.token_id}.png`;
  };
  
  // Format price with appropriate precision
  const formatPrice = (price?: number): string => {
    if (!price) return 'unknown price';
    
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else if (price >= 0.01) {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
    } else {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-850 rounded-lg shadow-xl w-full max-w-lg border border-slate-700/40 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-3 text-white flex justify-between items-center">
          <h3 className="text-lg font-semibold">Confirm Crypto Wager</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Token & Wager Info Combined */}
          <div className="bg-dark-800/60 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-dark-800 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src={getTokenLogo()} 
                alt={wager.token_symbol || 'Token'}
                  className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = 
                      '<div class="w-8 h-8 flex items-center justify-center text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 5.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg></div>';
                }}
              />
            </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-100">{wager.token_snapshot?.name || wager.token_name || 'Cryptocurrency'}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{wager.token_snapshot?.symbol || wager.token_symbol}</span>
            {wager.token_snapshot?.current_price && (
                    <>
                      <span>•</span>
                      <span>Current: {formatPrice(wager.token_snapshot.current_price)}</span>
                    </>
            )}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-1">{wager.description}</p>
            <p className="text-xs text-gray-400">Deadline: {formatDeadline(wager.expires_at)}</p>
          </div>

          {/* Resolution Type - Prominent Display */}
          <div className="bg-primary-900/10 border border-primary-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              <h4 className="font-semibold text-primary-300 text-sm uppercase tracking-wide">Resolution Method</h4>
            </div>
            <div className="bg-dark-900/40 border border-slate-700/30 rounded p-2">
              <p className="text-sm text-gray-300 font-medium">
                {(wager.wager_type || 'reach_target') === 'reach_target' 
                  ? '⚡ Instant Settlement: Resolves immediately when target price is hit'
                  : '⏰ Deadline Only: Resolves only at deadline using exact price at that time'
                }
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {(wager.wager_type || 'reach_target') === 'reach_target' 
                  ? 'Even if price changes later, wager is settled when target is first reached.'
                  : 'Price fluctuations during the period don\'t matter - only final price counts.'
                }
              </p>
            </div>
          </div>
          
          {/* Creator vs You - Compact */}
          <div className="bg-dark-800/60 rounded-lg p-3 border border-slate-700/40">
            <div className="flex items-center justify-between">
              {/* Creator Side */}
              <div className="flex flex-col items-center space-y-1">
                <div className="w-6 h-6 rounded-full bg-dark-800 overflow-hidden">
                    {wager.creator_profile?.profile_image_url ? (
                      <img 
                        src={wager.creator_profile.profile_image_url} 
                        alt="Creator" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-avatar.png';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-900/50 text-primary-300">
                      <User size={12} />
                      </div>
                    )}
                </div>
                <span className="text-xs text-gray-400">
                  {getDisplayUsername(wager.creator_profile?.username, wager.creator_address)}
                </span>
                <div className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-xs font-medium">
                    YES
                </div>
              </div>
              
              {/* VS */}
              <div className="flex flex-col items-center text-center">
                <ArrowRight size={16} className="text-gray-500 mb-1" />
                <span className="text-xs text-gray-500">vs</span>
              </div>
              
              {/* Your Side */}
              <div className="flex flex-col items-center space-y-1">
                <div className="w-6 h-6 rounded-full bg-secondary-900/50 flex items-center justify-center">
                  <User size={12} className="text-secondary-300" />
                </div>
                <span className="text-xs text-gray-400">You</span>
                <div className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded text-xs font-medium">
                    NO
                </div>
              </div>
            </div>
          </div>
          
          {/* Target Price & Amount Combined */}
          <div className="bg-dark-800/60 rounded-lg p-3 border border-slate-700/40 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Target Price</span>
                <span className="font-bold text-primary-400">{formatPrice(wager.target_price)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Wager Amount</span>
              <div className="flex items-center gap-1">
                <img 
                  src="https://solana.com/src/img/branding/solanaLogoMark.svg" 
                  alt="SOL" 
                  className="w-4 h-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="font-bold text-primary-400">{wager.sol_amount.toFixed(2)} SOL</span>
              </div>
            </div>
            {wager.token_snapshot?.current_price && wager.target_price && (
              <p className="text-xs text-gray-500 pt-1 border-t border-slate-700/30">
                Price needs to {wager.creator_position === '>=' ? 'rise' : 'fall'} by{' '}
                {wager.creator_position === '>=' 
                  ? ((wager.target_price / wager.token_snapshot.current_price - 1) * 100).toFixed(1)
                  : ((1 - wager.target_price / wager.token_snapshot.current_price) * 100).toFixed(1)
                }% to reach target
              </p>
            )}
          </div>
          
          {/* Warning - Compact */}
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-2">
            <p className="text-xs text-yellow-400">
              <span className="font-medium">Warning:</span> This wager cannot be revoked once confirmed.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button 
              onClick={onClose}
              className="flex-1 py-2 bg-dark-800/60 hover:bg-dark-800 border border-slate-700/40 rounded-lg text-gray-300 font-medium transition-colors text-sm"
              disabled={isConfirming}
            >
              Cancel
            </button>
            
            <button 
              onClick={() => onConfirm(wager.id)}
              disabled={isConfirming}
              className="flex-1 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2 text-sm"
            >
              {isConfirming ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Confirm Wager</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoWagerConfirmationModal;