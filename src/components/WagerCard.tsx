import React, { useState } from 'react';
import { Calendar, Clock, Tag, User, X, Lock, ExternalLink, Award, AlertTriangle, TrendingUp, TrendingDown, Check, Share2 } from 'lucide-react';
import { SportsWager, isCryptoWager, isSportsWager, settleSportsWager, getGameDetails, resolveCryptoWager, CryptoWager, getCurrentTokenPrice } from '../lib/wagers';
import { useCachedTeam, useCachedEvent } from '../hooks/useCacheHooks';
import { formatDateString, formatTimeString, formatDateStringMMA } from '../utils/DateUtils';
import { fetchSportsApi } from '../hooks/useSportSearch';
import { getDisplayUsername } from '../lib/chat';
import { DEFAULT_USER_IMAGE, FALLBACK_USER_IMAGE } from '../utils/constants';
import UserStatsTooltip from './UserStatsTooltip';
import CountdownTimer from './CountdownTimer';

interface WagerCardProps {
  wager: SportsWager | CryptoWager;
  onAcceptWager?: (wagerId: string) => void;
  onCancelWager?: (wagerId: string) => void;
  onResolveWager?: () => void;
  userWalletAddress?: string | null;
  isAccepting?: boolean;
  isCancelling?: boolean;
  isResolving?: boolean;
  onConfirmWager?: (wager: SportsWager | CryptoWager) => void;
  onShareWager?: (wager: SportsWager | CryptoWager) => void;
}

const WagerCard: React.FC<WagerCardProps> = ({ 
  wager,
  onAcceptWager,
  onCancelWager,
  onResolveWager,
  userWalletAddress,
  isAccepting = false,
  isCancelling = false,
  isResolving = false,
  onConfirmWager,
  onShareWager
}) => {
  // State for reserved address tooltip
  const [showReservedTooltip, setShowReservedTooltip] = useState(false);
  const [isResolvingWager, setIsResolvingWager] = useState(false);
  const [resolveError, setResolveError] = useState<string | null>(null);
  const [isCheckingPrice, setIsCheckingPrice] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [isPriceTargetMet, setIsPriceTargetMet] = useState<boolean | null>(null);
  
  // Tooltip state for user stats
  const [hoveredUser, setHoveredUser] = useState<{
    userAddress: string;
    username: string;
    profileImageUrl?: string | null;
    position: { x: number; y: number };
  } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Use cached data hooks for legacy wagers that don't have snapshot data
  const { team: creatorTeam } = useCachedTeam(
    // Only call the hook if we don't have snapshot data
    !isSportsWager(wager) || wager.creator_team_snapshot ? null : wager.creator_team_id, 
    isSportsWager(wager) ? wager.sport_type : ''
  );
  
  const { team: opponentTeam } = useCachedTeam(
    // Only call the hook if we don't have snapshot data and we have an opponent team ID
    !isSportsWager(wager) || wager.opponent_team_snapshot || !wager.opponent_team_id ? null : wager.opponent_team_id, 
    isSportsWager(wager) ? wager.sport_type : ''
  );
  
  const { event } = useCachedEvent(
    // Only call the hook if we don't have snapshot data
    !isSportsWager(wager) || wager.event_snapshot ? null : wager.event_id, 
    isSportsWager(wager) ? wager.sport_type : ''
  );

  // Format date string
  const formatDate = (dateString: string) => {
    // Use MM/DD/YYYY format for MMA events
    if (isSportsWager(wager) && wager.sport_type === 'mma') {
      return formatDateStringMMA(dateString);
    }
    
    // Use default format for other sports
    return formatDateString(dateString);
  };

  // Format time string
  const formatTime = (timeString: string | null) => {
    return formatTimeString(timeString);
  };

  // Get appropriate status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-900/40 text-green-400 border border-green-700/30';
      case 'matched':
      case 'live':
        return 'bg-blue-900/40 text-blue-400 border border-blue-700/30';
      case 'settled':
        return 'bg-purple-900/40 text-purple-400 border border-purple-700/30';
      case 'cancelled':
        return 'bg-gray-800/40 text-gray-400 border border-gray-700/30';
      default:
        return 'bg-gray-800/40 text-gray-400 border border-gray-700/30';
    }
  };

  // Get team name using snapshot data or cached data
  const getTeamName = (isCreator: boolean): string => {
    if (!isSportsWager(wager)) return '';
    
    if (isCreator) {
      // Priority: 1. snapshot data, 2. cached data, 3. existing property, 4. fallback
      return wager.creator_team_snapshot?.name || 
             creatorTeam?.name || 
             wager.creator_team_name || 
             'Team';
    } else {
      return wager.opponent_team_snapshot?.name || 
             opponentTeam?.name || 
             wager.opponent_team_name || 
             'Opponent';
    }
  };

  // Get team logo using snapshot data or cached data
  const getTeamLogo = (isCreator: boolean): string | undefined => {
    if (!isSportsWager(wager)) return undefined;
    
    if (isCreator) {
      return wager.creator_team_snapshot?.logo || 
             creatorTeam?.logo || 
             wager.creator_team_logo;
    } else {
      return wager.opponent_team_snapshot?.logo || 
             opponentTeam?.logo || 
             wager.opponent_team_logo;
    }
  };

  // Get league name using snapshot data or cached data
  const getLeagueName = (): string => {
    if (!isSportsWager(wager)) return '';
    
    return wager.event_snapshot?.league?.name || 
           event?.league?.name || 
           wager.league_name || 
           wager.sport_type.toUpperCase();
  };

  // Get league logo using snapshot data or cached data
  const getLeagueLogo = (): string | undefined => {
    if (!isSportsWager(wager)) return undefined;
    
    return wager.event_snapshot?.league?.logo || 
           event?.league?.logo || 
           wager.league_logo;
  };

  // Get event date
  const getEventDate = (): string => {
    if (!isSportsWager(wager)) return '';
    
    return wager.event_snapshot?.date || 
           event?.date || 
           wager.event_date;
  };

  // Get event time
  const getEventTime = (): string | null => {
    if (!isSportsWager(wager)) return null;
    
    return wager.event_snapshot?.time || 
           event?.time || 
           wager.event_time;
  };

  // Get event timezone
  const getEventTimezone = (): string | undefined => {
    if (!isSportsWager(wager)) return undefined;
    
    return wager.event_snapshot?.timezone || 
           event?.timezone || 
           wager.event_timezone || undefined;
  };

  // Format currency with appropriate precision
  const formatPrice = (value: number | undefined): string => {
    if (!value) return '$0.00';
    
    if (value >= 1) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else if (value >= 0.01) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
    } else {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
    }
  };

  // Determine if this is an MMA wager
  const isMMA = isSportsWager(wager) && wager.sport_type === 'mma';
  
  // Determine if wager is reserved for a specific address other than current user
  const isReservedForOthers = wager.reserved_address && 
                              wager.reserved_address !== userWalletAddress && 
                              wager.status === 'open';
  
  // Show the reserved tooltip and hide it after 3 seconds
  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReservedTooltip(true);
    
    // Hide tooltip after 3 seconds
    setTimeout(() => {
      setShowReservedTooltip(false);
    }, 3000);
  };

  // Handle click on Take Wager button
  const handleTakeWagerClick = () => {
    // Signal the parent to open confirmation modal for this wager
    if (onConfirmWager) {
      onConfirmWager(wager);
    }
  };

  // Determine if the current user is a participant in this wager
  const isUserParticipant = userWalletAddress && 
    (wager.creator_address === userWalletAddress || wager.opponent_address === userWalletAddress);

  // Handle username hover for tooltip
  const handleUsernameHover = (
    event: React.MouseEvent,
    userAddress: string,
    username: string,
    profileImageUrl?: string | null
  ) => {
    // Clear any existing timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    
    // Capture the position immediately
    const clientX = event.clientX;
    const clientY = event.clientY;
    
    // Set a delay before showing tooltip
    const timeout = setTimeout(() => {
      setHoveredUser({
        userAddress,
        username,
        profileImageUrl,
        position: {
          x: clientX,
          y: clientY
        }
      });
    }, 200); // 200ms delay
    
    setHoverTimeout(timeout);
  };

  // Handle username hover leave
  const handleUsernameHoverLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    // Close tooltip after a longer delay to prevent flashing
    const timeout = setTimeout(() => {
      setHoveredUser(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  // Close tooltip
  const closeTooltip = () => {
    setHoveredUser(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [hoverTimeout, closeTimeout]);

  // Handle resolving the sports wager
  const handleResolveSportsWager = async () => {
    if (!userWalletAddress || !isSportsWager(wager)) {
      setResolveError('Please connect your wallet to resolve this wager');
      return;
    }
    
    if (wager.status !== 'live') {
      setResolveError('Only live wagers can be resolved');
      return;
    }
    
    if (!isUserParticipant) {
      setResolveError('Only participants can resolve this wager');
      return;
    }
    
    setIsResolvingWager(true);
    setResolveError(null);
    
    try {
      // Fetch the game details
      const gameDetails = await getGameDetails(wager.event_id, wager.sport_type);
      
      if (!gameDetails) {
        throw new Error('Could not fetch game details');
      }
      
      console.log(`Game details for ${wager.sport_type} event ${wager.event_id}:`, gameDetails);
      
      // Determine if game has finished
      let gameFinished = false;
      let winningTeamId: number | null = null;
      
      // Different logic based on sport type
      if (wager.sport_type === 'soccer') {
        // Soccer: Check if status is FT (full time), AET (after extra time), or PEN (penalties)
        const status = gameDetails.fixture?.status?.short;
        gameFinished = status === 'FT' || status === 'AET' || status === 'PEN';
        
        if (gameFinished) {
          // Winner is determined by final score
          const homeScore = gameDetails.goals.home;
          const awayScore = gameDetails.goals.away;
          
          if (homeScore > awayScore) {
            winningTeamId = gameDetails.teams.home.id;
          } else if (awayScore > homeScore) {
            winningTeamId = gameDetails.teams.away.id;
          } else {
            throw new Error('The game ended in a tie and cannot be resolved automatically');
          }
        }
      } else if (wager.sport_type === 'basketball' || wager.sport_type === 'hockey' || wager.sport_type === 'baseball' || wager.sport_type === 'american-football') {
        // These sports: Check if status is FT (full time) or final
        const status = gameDetails.status?.short;
        gameFinished = status === 'FT' || status === 'Final' || status === 'AOT' || status === 'APS';
        
        if (gameFinished) {
          // Winner is determined by final score
          const homeScore = gameDetails.scores?.home?.total;
          const awayScore = gameDetails.scores?.away?.total;
          
          if (homeScore > awayScore) {
            winningTeamId = gameDetails.teams.home.id;
          } else if (awayScore > homeScore) {
            winningTeamId = gameDetails.teams.away.id;
          } else {
            throw new Error('The game ended in a tie and cannot be resolved automatically');
          }
        }
      } else if (wager.sport_type === 'mma') {
        // MMA: Check if fight has a winner
        const status = gameDetails.status?.short;
        gameFinished = status === 'Final' || status === 'Ended';
        
        // For MMA, the winner is typically marked directly
        if (gameFinished) {
          if (gameDetails.fighters?.first?.winner === true) {
            winningTeamId = gameDetails.fighters.first.id;
          } else if (gameDetails.fighters?.second?.winner === true) {
            winningTeamId = gameDetails.fighters.second.id;
          } else if (gameDetails.winner_id) {
            winningTeamId = gameDetails.winner_id;
          } else {
            throw new Error('Could not determine the winner of the fight');
          }
        }
      } else {
        throw new Error(`Unsupported sport type: ${wager.sport_type}`);
      }
      
      if (!gameFinished) {
        throw new Error('The game has not finished yet and cannot be resolved');
      }
      
      if (!winningTeamId) {
        throw new Error('Could not determine the winner');
      }
      
      // Determine the winner address
      let winnerAddress: string;
      if (winningTeamId === wager.creator_team_id) {
        winnerAddress = wager.creator_address;
      } else if (winningTeamId === wager.opponent_team_id) {
        if (!wager.opponent_address) {
          throw new Error('No opponent address found');
        }
        winnerAddress = wager.opponent_address;
      } else {
        throw new Error('The winning team does not match either participant\'s team');
      }
      
      // Settle the wager
      const settled = await settleSportsWager(wager.id, winnerAddress);
      
      if (!settled) {
        throw new Error('Failed to settle the wager');
      }
      
      // Notify parent component to refresh wagers
      if (onResolveWager) {
        onResolveWager();
      }
    } catch (error) {
      console.error('Error resolving wager:', error);
      setResolveError(error instanceof Error ? error.message : 'Failed to resolve wager');
    } finally {
      setIsResolvingWager(false);
    }
  };

  // Handle checking current price for crypto wagers
  const handleCheckPrice = async () => {
    if (!isCryptoWager(wager) || !wager.token_id) {
      setResolveError('Invalid crypto wager');
      return;
    }

    setIsCheckingPrice(true);
    setResolveError(null);

    try {
      const price = await getCurrentTokenPrice(wager.token_id);
      if (price === null) {
        throw new Error('Failed to fetch current price');
      }

      setCurrentPrice(price);

      // Determine if target is met
      if (wager.target_price) {
        const isTargetMet = wager.creator_position === '>=' 
          ? price >= wager.target_price 
          : price <= wager.target_price;
        
        setIsPriceTargetMet(isTargetMet);
      } else {
        throw new Error('No target price defined for this wager');
      }
    } catch (error) {
      console.error('Error checking price:', error);
      setResolveError(error instanceof Error ? error.message : 'Failed to check current price');
    } finally {
      setIsCheckingPrice(false);
    }
  };

  // Handle resolving crypto wager
  const handleResolveCryptoWager = async () => {
    if (!userWalletAddress || !isCryptoWager(wager)) {
      setResolveError('Please connect your wallet to resolve this wager');
      return;
    }
    
    if (wager.status !== 'matched') {
      setResolveError('Only matched wagers can be resolved');
      return;
    }
    
    if (!isUserParticipant) {
      setResolveError('Only participants can resolve this wager');
      return;
    }
    
    // Check if the deadline has passed
    const now = new Date();
    const expiresAt = new Date(wager.expires_at);
    const wagerType = wager.wager_type ?? 'reach_target'; // Default to reach_target for backward compatibility
    
    if (wagerType === 'price_at_deadline') {
      // For "price at deadline" wagers, only allow resolution at or after the deadline
      if (now < expiresAt) {
        setResolveError(`This wager can only be resolved at the deadline (${formatDate(wager.expires_at)})`);
        return;
      }
    } else {
      // For "reach target" wagers, allow early resolution if target is met
      if (now < expiresAt) {
        // Get fresh price and check if target is met for early settlement
        try {
          const price = await getCurrentTokenPrice(wager.token_id);
          if (price === null) {
            setResolveError('Failed to fetch current price. Please try again.');
            return;
          }
          
          // Determine if target is met
          const isTargetMet = wager.target_price && wager.creator_position
            ? wager.creator_position === '>=' 
              ? price >= wager.target_price 
              : price <= wager.target_price
            : false;
          
          if (!isTargetMet) {
            setResolveError(`Price target not yet met. Current price: ${formatPrice(price)}`);
            return;
          }
          
          // Continue with settlement if target is met
        } catch (error) {
          console.error('Error checking price for early resolution:', error);
          setResolveError('Could not determine if price target is met');
          return;
        }
      }
    }
    
    setIsResolvingWager(true);
    setResolveError(null);
    
    try {
      // Call the resolveCryptoWager function to settle the wager
      const success = await resolveCryptoWager(wager.id);
      
      if (!success) {
        throw new Error('Failed to resolve the crypto wager');
      }
      
      // Notify parent component to refresh wagers
      if (onResolveWager) {
        onResolveWager();
      }
    } catch (error) {
      console.error('Error resolving crypto wager:', error);
      setResolveError(error instanceof Error ? error.message : 'Failed to resolve crypto wager');
    } finally {
      setIsResolvingWager(false);
    }
  };

  // Handle resolving wager (sports or crypto)
  const handleResolveWager = async () => {
    if (isSportsWager(wager)) {
      await handleResolveSportsWager();
    } else if (isCryptoWager(wager)) {
      await handleResolveCryptoWager();
    }
  };

  // Calculate team box class based on wager status and winner
  const getTeamBoxClass = (isCreator: boolean): string => {
    if (wager.status !== 'settled' || !wager.winner_address) {
      return 'flex flex-col items-center';
    }
    
    const isWinner = (isCreator && wager.winner_address === wager.creator_address) ||
                     (!isCreator && wager.winner_address === wager.opponent_address);
                     
    if (isWinner) {
      return 'flex flex-col items-center bg-green-900/20 p-2 rounded-lg border border-green-700/30';
    } else {
      return 'flex flex-col items-center bg-red-900/20 p-2 rounded-lg border border-red-700/30';
    }
  };

  // Get crypto token details
  const getCryptoTokenName = (): string => {
    if (!isCryptoWager(wager)) return '';
    return wager.token_snapshot?.name || wager.token_name || 'Token';
  };

  const getCryptoTokenSymbol = (): string => {
    if (!isCryptoWager(wager)) return '';
    return wager.token_snapshot?.symbol || wager.token_symbol || '';
  };

  const getCryptoTokenLogo = (): string | undefined => {
    if (!isCryptoWager(wager)) return undefined;
    
    // Always use official Solana logo for SOL
    const tokenSymbol = (wager.token_snapshot?.symbol || wager.token_symbol || '').toLowerCase();
    if (tokenSymbol === 'sol') {
      return 'https://solana.com/src/img/branding/solanaLogoMark.svg';
    }
    
    if (wager.token_snapshot?.logo) return wager.token_snapshot.logo;
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${wager.token_id}.png`;
  };

  // Determine if a user can resolve a wager
  const canResolve = (): boolean => {
    if (!userWalletAddress || !isUserParticipant) return false;
    
    if (isSportsWager(wager)) {
      return wager.status === 'live';
    } else if (isCryptoWager(wager)) {
      return wager.status === 'matched';
    }
    
    return false;
  };

  // Get the crypto price target if it exists
  const getCryptoPriceTarget = (): string => {
    if (!isCryptoWager(wager) || !wager.target_price) return 'Unknown';
    return formatPrice(wager.target_price);
  };

  // Get the creator's position for crypto wagers
  const getCryptoPosition = (): string => {
    if (!isCryptoWager(wager)) return '';
    return 'YES';
  };

  // Generate correct crypto description using actual expires_at date
  const getCryptoDescription = (): string => {
    if (!isCryptoWager(wager)) return wager.description || '';
    
    const symbol = wager.token_snapshot?.symbol || wager.token_symbol || 'Token';
    const conditionText = wager.creator_position === '>=' ? 'will reach' : 'will fall to';
    const priceFormatted = wager.target_price ? `$${wager.target_price.toLocaleString()}` : '$0';
    
    // Use the actual expires_at date for consistency
    const deadlineFormatted = `by ${formatDate(wager.expires_at)}`;
    
    // Add wager type clarification if available
    const typeText = (wager.wager_type || 'reach_target') === 'reach_target' 
      ? ' (resolves when target is hit)'
      : ' (resolves at deadline only)';
    
    return `${symbol} ${conditionText} ${priceFormatted} ${deadlineFormatted}${typeText}`;
  };

  // Check if the card represents a crypto wager
  const isCryptoCard = isCryptoWager(wager);
  
  // Check if the card represents a sports wager
  const isSportsCard = isSportsWager(wager);
  
  // Check if wager can be shared (is settled and user was involved)
  const canShare = wager.status === 'settled' && wager.winner_address && isUserParticipant;
  
  // Get the game start time for sports wagers
  const getGameStartTime = (): Date | null => {
    if (!isSportsWager(wager)) return null;
    
    // Try to get the event date and time
    const eventDate = getEventDate();
    const eventTime = getEventTime();
    
    if (eventDate && eventTime) {
      // Combine date and time
      const gameDateTime = new Date(`${eventDate} ${eventTime}`);
      if (!isNaN(gameDateTime.getTime())) {
        return gameDateTime;
      }
    }
    
    // Fallback to expires_at for sports wagers
    const expiresAt = new Date(wager.expires_at);
    if (!isNaN(expiresAt.getTime())) {
      return expiresAt;
    }
    
    return null;
  };

  // Check if game has started for sports wagers, or deadline has passed for crypto wagers
  const isExpired = (): boolean => {
    const now = new Date();
    
    if (isSportsWager(wager)) {
      // For sports wagers, check if the game has started
      const gameStartTime = getGameStartTime();
      return gameStartTime ? now >= gameStartTime : false;
    } else {
      // For crypto wagers, check if deadline has passed
      const expiresAt = new Date(wager.expires_at);
      return now >= expiresAt;
    }
  };
  
  // Handle share button click
  const handleShareClick = () => {
    if (onShareWager) {
      onShareWager(wager);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {isCryptoCard ? (
              /* Crypto Wager Header */
              <>
                {getCryptoTokenLogo() && (
                  <img 
                    src={getCryptoTokenLogo()} 
                    alt={getCryptoTokenSymbol()} 
                    className="w-6 h-6 object-contain" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = 
                        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 5.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg>';
                    }}
                  />
                )}
                <div className="ml-1">
                  <span className="text-xs font-medium text-gray-400">{getCryptoTokenSymbol()}</span>
                  <h3 className="text-sm font-semibold text-gray-300 line-clamp-1">{getCryptoDescription()}</h3>
                </div>
              </>
            ) : (
              /* Sports Wager Header */
              <>
                {getLeagueLogo() && (
                  <img 
                    src={getLeagueLogo()} 
                    alt={getLeagueName()} 
                    className="w-5 h-5 object-contain mr-1" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <span className="text-xs font-medium text-gray-400">{getLeagueName()}</span>
                  <h3 className="text-sm font-semibold text-gray-300 line-clamp-1">
                    {isSportsCard ? `${getTeamName(true)} vs ${getTeamName(false)}` : (wager as CryptoWager).description || ''}
                  </h3>
                </div>
              </>
            )}
          </div>
          <span className={`tag ${getStatusBadgeColor(wager.status)}`}>
            {wager.status.charAt(0).toUpperCase() + wager.status.slice(1)}
          </span>
        </div>
        
        {/* Combined Team Logos and User Profiles Section */}
        <div className="bg-dark-800/60 border border-slate-700/40 rounded-lg p-4 mb-4">
          {/* Team and User Profiles in a layout with logos closer to VS */}
          <div className="flex items-center justify-between mb-3">
            {/* Creator profile */}
            <div className={getTeamBoxClass(true)}>
              <div className="w-8 h-8 rounded-full bg-dark-800 overflow-hidden mb-1">
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
                            <span 
                className="text-xs font-medium text-gray-300 cursor-pointer hover:text-primary-400 transition-colors select-none hover:underline"
                onMouseEnter={(e) => handleUsernameHover(
                  e, 
                  wager.creator_address, 
                  getDisplayUsername(wager.creator_profile?.username, wager.creator_address),
                  wager.creator_profile?.profile_image_url
                )}
                onMouseLeave={handleUsernameHoverLeave}
              >
                {getDisplayUsername(wager.creator_profile?.username, wager.creator_address)}
              </span>
              {isCryptoWager(wager) && (
                <span className="mt-1 px-2 py-0.5 bg-dark-850 rounded text-xs text-gray-400">
                  {getCryptoPosition()}
                </span>
              )}
            </div>
            
            {/* Team logos with VS */}
            <div className="flex items-center justify-center gap-2">
              {isSportsCard ? (
                /* Sports wager: Team vs Team */
                <>
                  {/* Creator team logo */}
                  {getTeamLogo(true) ? (
                    <img 
                      src={getTeamLogo(true)}
                      alt={getTeamName(true)}
                      className={isMMA ? "w-16 h-16 object-contain" : "w-10 h-10 object-contain"}
                    />
                  ) : (
                    <div className={isMMA ? "w-16 h-16 flex items-center justify-center text-gray-400" : "w-10 h-10 flex items-center justify-center text-gray-400"}>
                      <span className="text-sm font-bold">T</span>
                    </div>
                  )}
                  
                  {/* VS */}
                  <span className="text-sm font-bold text-primary-400 mx-1">VS</span>
                  
                  {/* Opponent team logo */}
                  {getTeamLogo(false) ? (
                    <img 
                      src={getTeamLogo(false)}
                      alt={getTeamName(false)}
                      className={isMMA ? "w-16 h-16 object-contain" : "w-10 h-10 object-contain"}
                    />
                  ) : (
                    <div className={isMMA ? "w-16 h-16 flex items-center justify-center text-gray-400" : "w-10 h-10 flex items-center justify-center text-gray-400"}>
                      <span className="text-sm font-bold">T</span>
                    </div>
                  )}
                </>
              ) : (
                /* Crypto wager: Token price display */
                <div className="flex flex-col items-center">
                  {/* Token logo larger display */}
                  <div className="w-14 h-14 bg-dark-850 rounded-lg flex items-center justify-center overflow-hidden mb-2 border border-slate-700/30">
                    {getCryptoTokenLogo() ? (
                      <img 
                        src={getCryptoTokenLogo()} 
                        alt={getCryptoTokenSymbol()}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = 
                            '<div class="w-10 h-10 flex items-center justify-center text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 5.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg></div>';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 5.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-300 mb-1">{getCryptoTokenSymbol()}</div>
                    {isCryptoWager(wager) && wager.target_price && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-dark-850 rounded text-xs">
                        <span className="text-gray-400">Target:</span>
                        <span className={`font-medium ${
                          wager.creator_position === '>=' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {formatPrice(wager.target_price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Opponent Profile */}
            <div className={getTeamBoxClass(false)}>
              {wager.opponent_profile ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-dark-800 overflow-hidden mb-1">
                    {wager.opponent_profile.profile_image_url ? (
                      <img 
                        src={wager.opponent_profile.profile_image_url} 
                        alt="Opponent" 
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
                  <span 
                    className="text-xs font-medium text-gray-300 cursor-pointer hover:text-primary-400 transition-colors select-none hover:underline"
                    onMouseEnter={(e) => handleUsernameHover(
                      e, 
                      wager.opponent_address || '', 
                      getDisplayUsername(wager.opponent_profile?.username, wager.opponent_address || ''),
                      wager.opponent_profile?.profile_image_url || null
                    )}
                    onMouseLeave={handleUsernameHoverLeave}
                  >
                    {getDisplayUsername(wager.opponent_profile?.username, wager.opponent_address || '')}
                  </span>
                  {isCryptoWager(wager) && (
                    <span className="mt-1 px-2 py-0.5 bg-dark-850 rounded text-xs text-gray-400">
                      NO
                    </span>
                  )}
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center border border-slate-700/40 mb-1">
                    <span className="text-xs text-gray-500 font-bold">?</span>
                  </div>
                  <span className="text-xs text-gray-500">Waiting...</span>
                </>
              )}
            </div>
          </div>
          
          {/* Event date and time with countdown */}
          <div className="flex justify-center mt-3 pt-3 border-t border-slate-700/20">
            {isSportsCard ? (
              /* Sports wager: Game start countdown and date/time */
              <div className="flex flex-col items-center gap-2">
                {/* Date and time info */}
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {getEventDate() && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(getEventDate())}</span>
                    </div>
                  )}
                  {getEventTime() && (
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{formatTime(getEventTime())}</span>
                      {getEventTimezone() && <span className="text-gray-500">({getEventTimezone()})</span>}
                    </div>
                  )}
                </div>
                
                {/* Game start countdown */}
                {getGameStartTime() && wager.status === 'open' && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-gray-400">Game starts in:</span>
                    <CountdownTimer expiresAt={getGameStartTime()!.toISOString()} />
                  </div>
                )}
              </div>
            ) : (
              /* Crypto wager countdown timer */
              <CountdownTimer expiresAt={wager.expires_at} />
            )}
          </div>
          
          {/* Winner display for settled wagers */}
          {wager.status === 'settled' && wager.winner_address && (
            <div className="flex justify-center mt-3 pt-3 border-t border-slate-700/20">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-900/30 rounded-full text-green-400 text-xs border border-green-700/30">
                <Award size={12} />
                <span className="font-medium">
                  {wager.winner_address === wager.creator_address ? (
                    <>
                      <span 
                        className="cursor-pointer hover:text-green-300 transition-colors select-none hover:underline"
                        onMouseEnter={(e) => handleUsernameHover(
                          e, 
                          wager.creator_address, 
                          getDisplayUsername(wager.creator_profile?.username, wager.creator_address),
                          wager.creator_profile?.profile_image_url
                        )}
                        onMouseLeave={handleUsernameHoverLeave}
                      >
                        {getDisplayUsername(wager.creator_profile?.username, wager.creator_address)}
                      </span>
                      {' won!'}
                    </>
                  ) : (
                    <>
                      <span 
                        className="cursor-pointer hover:text-green-300 transition-colors select-none hover:underline"
                        onMouseEnter={(e) => handleUsernameHover(
                          e, 
                          wager.opponent_address || '', 
                          getDisplayUsername(wager.opponent_profile?.username, wager.opponent_address || ''),
                          wager.opponent_profile?.profile_image_url || null
                        )}
                        onMouseLeave={handleUsernameHoverLeave}
                      >
                        {getDisplayUsername(wager.opponent_profile?.username, wager.opponent_address || '')}
                      </span>
                      {' won!'}
                    </>
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Display current price check result for crypto wagers */}
          {isCryptoWager(wager) && currentPrice !== null && (
            <div className="flex justify-center mt-3 pt-3 border-t border-slate-700/20">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${
                isPriceTargetMet !== null
                  ? isPriceTargetMet
                    ? 'bg-green-900/30 text-green-400 border-green-700/30'
                    : 'bg-red-900/30 text-red-400 border-red-700/30'
                  : 'bg-blue-900/30 text-blue-400 border-blue-700/30'
              }`}>
                {isPriceTargetMet !== null ? (
                  isPriceTargetMet ? (
                    <>
                      <TrendingUp size={12} />
                      <span className="font-medium">
                        Target met! Current price: {formatPrice(currentPrice)}
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={12} />
                      <span className="font-medium">
                        Target not met. Current price: {formatPrice(currentPrice)}
                      </span>
                    </>
                  )
                ) : (
                  <>
                    <Clock size={12} />
                    <span className="font-medium">
                      Current price: {formatPrice(currentPrice)}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* SOL amount and action buttons in the same row */}
        <div className="flex justify-between items-center">
          {/* SOL amount - LEFT SIDE WITH SOLANA LOGO */}
          <div className="flex items-center">
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
          
          {/* Action buttons - RIGHT SIDE */}
          <div className="flex gap-2">
            {/* Share button for settled wagers */}
            {canShare && onShareWager && (
              <button
                className="px-3 py-1.5 text-xs font-medium rounded-lg shadow transition-all bg-purple-900/40 text-purple-400 border border-purple-700/30 hover:bg-purple-800/40"
                onClick={handleShareClick}
              >
                <Share2 size={14} className="inline mr-1" />
                <span>Share</span>
              </button>
            )}

            {/* Cancel button for creator */}
            {wager.status === 'open' && wager.creator_address === userWalletAddress && (
              <button 
                className="px-3 py-1.5 text-xs font-medium rounded-lg shadow transition-all bg-red-900/40 text-red-400 border border-red-700/30 hover:bg-red-800/40"
                onClick={() => onCancelWager && onCancelWager(wager.id)}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <>
                    <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin mr-1 inline-block align-middle"></span>
                    <span>Cancelling...</span>
                  </>
                ) : (
                  <>
                    <X size={14} className="inline mr-1" />
                    <span>Cancel</span>
                  </>
                )}
              </button>
            )}

            {/* Check Price button for crypto wagers */}
            {isCryptoWager(wager) && wager.status === 'matched' && isUserParticipant && (
              <button
                className="px-3 py-1.5 text-xs font-medium rounded-lg shadow transition-all bg-blue-900/40 text-blue-400 border border-blue-700/30 hover:bg-blue-800/40"
                onClick={handleCheckPrice}
                disabled={isCheckingPrice}
              >
                {isCheckingPrice ? (
                  <>
                    <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-1 inline-block align-middle"></span>
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp size={14} className="inline mr-1" />
                    <span>Check Price</span>
                  </>
                )}
              </button>
            )}
            
            {/* Resolve button for matched crypto wagers */}
            {isCryptoWager(wager) && 
             wager.status === 'matched' && 
             isUserParticipant && (
              <button 
                className="px-3 py-1.5 text-xs font-medium rounded-lg shadow transition-all bg-purple-900/40 text-purple-400 border border-purple-700/30 hover:bg-purple-800/40"
                onClick={handleResolveWager}
                disabled={isResolvingWager}
              >
                {isResolvingWager ? (
                  <>
                    <span className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mr-1 inline-block align-middle"></span>
                    <span>Resolving...</span>
                  </>
                ) : (
                  <>
                    <Check size={14} className="inline mr-1" />
                    <span>Resolve</span>
                  </>
                )}
              </button>
            )}
            
            {/* Resolve button for live sports wagers */}
            {isSportsWager(wager) && wager.status === 'live' && isUserParticipant && (
              <button 
                className="px-3 py-1.5 text-xs font-medium rounded-lg shadow transition-all bg-purple-900/40 text-purple-400 border border-purple-700/30 hover:bg-purple-800/40"
                onClick={handleResolveWager}
                disabled={isResolvingWager}
              >
                {isResolvingWager ? (
                  <>
                    <span className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mr-1 inline-block align-middle"></span>
                    <span>Resolving...</span>
                  </>
                ) : (
                  <>
                    <Award size={14} className="inline mr-1" />
                    <span>Resolve</span>
                  </>
                )}
              </button>
            )}
            
            <div className="relative">
              {/* Take Wager Button with lock overlay for reserved wagers */}
              <button 
                className={`px-3 py-1.5 text-xs font-medium rounded-lg shadow transition-all
                          ${wager.status === 'open' && wager.creator_address !== userWalletAddress && !isReservedForOthers && !isExpired() ? 
                            'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white hover:shadow-glow-strong' : 
                            'bg-dark-800/60 text-gray-400 cursor-not-allowed'}`}
                disabled={wager.status !== 'open' || wager.creator_address === userWalletAddress || isReservedForOthers || isExpired() || isAccepting}
                onClick={handleTakeWagerClick}
                title={isExpired() ? (isSportsWager(wager) ? 'Game has started' : 'This wager has expired') : undefined}
              >
                {isAccepting ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1 inline-block align-middle"></span>
                    Processing...
                  </>
                ) : (
                  wager.status === 'open' ? (isExpired() ? (isSportsWager(wager) ? 'Game Started' : 'Expired') : 'Take Wager') : 'Not Available'
                )}
              </button>
              
              {/* Lock icon overlay for reserved wagers */}
              {isReservedForOthers && (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-dark-850/70 rounded-lg"
                  onClick={handleLockClick}
                >
                  <Lock size={16} className="text-yellow-500" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Error display for resolve errors */}
        {resolveError && (
          <div className="mt-3 p-2 bg-red-900/20 border border-red-700/30 rounded-md">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-400">{resolveError}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Reserved tooltip - Positioned in the center of the screen */}
      {showReservedTooltip && (
        <div className="fixed z-50 bg-dark-800 border border-yellow-700/30 rounded-lg p-3 shadow-lg max-w-xs" 
             style={{ 
               top: 'calc(50% - 50px)', 
               left: 'calc(50% - 125px)',
             }}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Lock size={18} className="text-yellow-500 mr-2" />
              <p className="text-sm text-yellow-500 font-medium">Reserved Wager</p>
            </div>
            <p className="text-xs text-gray-300">This wager is reserved for a specific wallet address and cannot be accepted by you.</p>
          </div>
        </div>
      )}
      
      {/* User Stats Tooltip */}
      {hoveredUser && (
        <UserStatsTooltip
          userAddress={hoveredUser.userAddress}
          username={hoveredUser.username}
          profileImageUrl={hoveredUser.profileImageUrl || undefined}
          position={hoveredUser.position}
          onClose={closeTooltip}
        />
      )}
    </div>
  );
};

export default WagerCard;