import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Trophy, TrendingDown, DollarSign, Target, Flame, Snowflake } from 'lucide-react';
import { UserProfile, getProfile } from '../lib/supabase';
import { getDisplayUsername } from '../lib/chat';

interface UserStatsTooltipProps {
  userAddress: string;
  username: string;
  profileImageUrl?: string | null;
  position: { x: number; y: number };
  onClose: () => void;
}

const UserStatsTooltip: React.FC<UserStatsTooltipProps> = ({
  userAddress,
  username,
  profileImageUrl,
  position,
  onClose
}) => {
  // Add CSS animation keyframes
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const profile = await getProfile(userAddress);
        setUserProfile(profile);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userAddress]);

  // Calculate win rate
  const calculateWinRate = (): string => {
    const wins = userProfile?.wins ?? 0;
    const losses = userProfile?.losses ?? 0;
    const totalGames = wins + losses;
    
    if (totalGames === 0) return '0%';
    
    const winRate = (wins / totalGames) * 100;
    return `${winRate.toFixed(0)}%`;
  };

  // Format profit amount
  const formatProfit = (amount: number): string => {
    if (amount >= 0) {
      return `+${amount.toFixed(2)} SOL`;
    } else {
      return `${amount.toFixed(2)} SOL`;
    }
  };

  // Get profit color
  const getProfitColor = (amount: number): string => {
    if (amount > 0) return 'text-green-400';
    if (amount < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  // Calculate tooltip position to keep it on screen
  const getTooltipStyle = () => {
    const tooltipWidth = 280;
    const tooltipHeight = 200;
    const padding = 10;
    
    let x = position.x + 20; // Offset from cursor
    let y = position.y - 20;
    
    // Adjust if tooltip would go off right edge
    if (x + tooltipWidth > window.innerWidth - padding) {
      x = position.x - tooltipWidth - 20;
    }
    
    // Adjust if tooltip would go off bottom edge
    if (y + tooltipHeight > window.innerHeight - padding) {
      y = position.y - tooltipHeight - 20;
    }
    
    // Adjust if tooltip would go off top edge
    if (y < padding) {
      y = padding;
    }
    
    // Adjust if tooltip would go off left edge
    if (x < padding) {
      x = padding;
    }
    
    return {
      position: 'fixed' as const,
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 9999,
    };
  };

  const tooltipContent = (
    <div
      style={{
        ...getTooltipStyle(),
        opacity: 0,
        animation: 'fadeIn 0.2s ease-out forwards'
      }}
      className="bg-dark-850 border border-slate-700/40 rounded-lg shadow-xl p-4 w-70"
      onMouseEnter={() => {
        // Keep tooltip open when hovering over it
      }}
      onMouseLeave={() => {
        // Close tooltip when leaving it
        onClose();
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-24">
          <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Header with user info */}
          <div className="flex items-center gap-3 pb-2 border-b border-slate-700/40">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-800 border border-slate-700/40">
              {profileImageUrl ? (
                <img 
                  src={profileImageUrl} 
                  alt={username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-avatar.png';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-900/40 text-primary-300 text-sm font-medium">
                  {username.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-200 truncate">
                {userProfile ? getDisplayUsername(userProfile.username, userAddress) : getDisplayUsername(null, userAddress)}
              </p>
              <p className="text-xs text-gray-400">
                {userAddress.slice(0, 4)}...{userAddress.slice(-4)}
              </p>
              {userProfile?.created_at && (
                <p className="text-xs text-gray-500">
                  Joined {new Date(userProfile.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

                      {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Wins */}
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Wins</p>
                <p className="text-sm font-medium text-green-400">{userProfile?.wins ?? 0}</p>
              </div>
            </div>

            {/* Losses */}
            <div className="flex items-center gap-2">
              <TrendingDown size={14} className="text-red-400" />
              <div>
                <p className="text-xs text-gray-400">Losses</p>
                <p className="text-sm font-medium text-red-400">{userProfile?.losses ?? 0}</p>
              </div>
            </div>

            {/* Win Rate */}
            <div className="flex items-center gap-2">
              <Target size={14} className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Win Rate</p>
                <p className="text-sm font-medium text-blue-400">{calculateWinRate()}</p>
              </div>
            </div>

            {/* Profit */}
            <div className="flex items-center gap-2">
              <DollarSign size={14} className={getProfitColor(userProfile?.profit_amount ?? 0)} />
              <div>
                <p className="text-xs text-gray-400">Profit</p>
                <p className={`text-sm font-medium ${getProfitColor(userProfile?.profit_amount ?? 0)}`}>
                  {formatProfit(userProfile?.profit_amount ?? 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Streaks */}
          {((userProfile?.win_streak ?? 0) > 0 || (userProfile?.loss_streak ?? 0) > 0) && (
            <div className="pt-2 border-t border-slate-700/40">
              <div className="flex items-center justify-between">
                {(userProfile?.win_streak ?? 0) > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Flame size={12} className="text-orange-400" />
                    <span className="text-xs text-orange-400 font-medium">
                      {userProfile?.win_streak} win streak
                    </span>
                  </div>
                )}
                
                {(userProfile?.loss_streak ?? 0) > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Snowflake size={12} className="text-blue-300" />
                    <span className="text-xs text-blue-300 font-medium">
                      {userProfile?.loss_streak} loss streak
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Show message for new users */}
          {!userProfile && (
            <div className="pt-2 border-t border-slate-700/40">
              <p className="text-xs text-gray-500 text-center">
                New user - no wager history yet
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Render tooltip using portal to ensure it's above everything
  return createPortal(tooltipContent, document.body);
};

export default UserStatsTooltip; 