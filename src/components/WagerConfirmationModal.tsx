import React from 'react';
import { X, Check, User } from 'lucide-react';
import { SportsWager, CryptoWager } from '../lib/wagers';
import { getDisplayUsername } from '../lib/chat';
import { DEFAULT_USER_IMAGE, FALLBACK_USER_IMAGE } from '../utils/constants';

interface WagerConfirmationModalProps {
  wager: SportsWager;
  onClose: () => void;
  onConfirm: (wagerId: string) => void;
  isConfirming: boolean;
}

const WagerConfirmationModal: React.FC<WagerConfirmationModalProps> = ({
  wager,
  onClose,
  onConfirm,
  isConfirming
}) => {
  // Get team name and logo from snapshot data
  const getTeamName = (isCreator: boolean): string => {
    if (isCreator) {
      return wager.creator_team_snapshot?.name || wager.creator_team_name || 'Team';
    } else {
      return wager.opponent_team_snapshot?.name || wager.opponent_team_name || 'Team';
    }
  };

  const getTeamLogo = (isCreator: boolean): string | undefined => {
    if (isCreator) {
      return wager.creator_team_snapshot?.logo || wager.creator_team_logo;
    } else {
      return wager.opponent_team_snapshot?.logo || wager.opponent_team_logo;
    }
  };

  // Check if this is an MMA event
  const isMMA = wager.sport_type === 'mma';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-850 rounded-lg shadow-xl w-full max-w-md border border-slate-700/40 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-4 text-white flex justify-between items-center">
          <h3 className="text-xl font-semibold">Confirm Wager</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Creator vs You */}
          <div className="bg-dark-800/60 rounded-lg p-4 border border-slate-700/40 space-y-4">
            <h4 className="text-lg font-medium text-center text-gray-200">Wager Details</h4>
            
            {/* Teams */}
            <div className="flex items-center justify-between">
              {/* Creator Side */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-dark-800 overflow-hidden">
                    {wager.creator_profile?.profile_image_url ? (
                      <img 
                        src={wager.creator_profile.profile_image_url} 
                        alt="Creator" 
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
                </div>
                <span className="text-xs font-medium text-gray-400">
                  {getDisplayUsername(wager.creator_profile?.username, wager.creator_address)}
                </span>
                <div className={isMMA ? "w-20 h-20" : "w-14 h-14"}>
                  {getTeamLogo(true) ? (
                    <img 
                      src={getTeamLogo(true)} 
                      alt={getTeamName(true)}
                      className={`${isMMA ? "w-20 h-20" : "w-14 h-14"} object-contain`}
                    />
                  ) : (
                    <div className={`${isMMA ? "w-20 h-20" : "w-14 h-14"} flex items-center justify-center bg-dark-800 rounded-full text-gray-400`}>
                      <span className="text-sm font-bold">T</span>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-200 text-center max-w-[120px]">{getTeamName(true)}</p>
              </div>
              
              {/* VS */}
              <div className="flex flex-col items-center">
                <span className="px-3 py-1 bg-dark-800 rounded-full text-primary-400 font-bold border border-slate-700/40">
                  VS
                </span>
              </div>
              
              {/* Your Side (Opponent) */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-dark-800 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-secondary-900/50 text-secondary-300">
                      <User size={16} />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-400">You</span>
                <div className={isMMA ? "w-20 h-20" : "w-14 h-14"}>
                  {getTeamLogo(false) ? (
                    <img 
                      src={getTeamLogo(false)} 
                      alt={getTeamName(false)}
                      className={`${isMMA ? "w-20 h-20" : "w-14 h-14"} object-contain`}
                    />
                  ) : (
                    <div className={`${isMMA ? "w-20 h-20" : "w-14 h-14"} flex items-center justify-center bg-dark-800 rounded-full text-gray-400`}>
                      <span className="text-sm font-bold">T</span>
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-200 text-center max-w-[120px]">{getTeamName(false)}</p>
              </div>
            </div>
          </div>
          
          {/* Wager Amount */}
          <div className="bg-dark-800/60 rounded-lg p-4 border border-slate-700/40">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Wager Amount</span>
              <div className="bg-dark-850 border border-slate-700/40 px-3 py-1 rounded-full flex items-center gap-2">
                <img 
                  src="https://solana.com/src/img/branding/solanaLogoMark.svg" 
                  alt="Solana Logo" 
                  className="w-4 h-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="font-bold text-primary-400">{wager.sol_amount.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              By confirming this wager, you agree to bet {wager.sol_amount.toFixed(2)} SOL on {getTeamName(false)} to win against {getTeamName(true)}.
            </p>
          </div>
          
          {/* Warning */}
          <div className="bg-dark-800/60 rounded-lg p-4 border border-yellow-700/30">
            <p className="text-sm text-yellow-400">
              <span className="font-medium">Important:</span> This wager will be executed on-chain and cannot be revoked once confirmed. Please ensure you want to proceed.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-dark-800/60 hover:bg-dark-800 border border-slate-700/40 rounded-lg text-gray-300 font-medium transition-colors"
              disabled={isConfirming}
            >
              Cancel
            </button>
            
            <button 
              onClick={() => onConfirm(wager.id)}
              disabled={isConfirming}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-glow transition-all flex items-center gap-2"
            >
              {isConfirming ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check size={18} />
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

export default WagerConfirmationModal;