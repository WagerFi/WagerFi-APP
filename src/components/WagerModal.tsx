import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Tag, User, Check } from 'lucide-react';
import { Game } from '../types/sports';
import { useWalletContext } from '../contexts/WalletContext';
import { createSportsWager, TeamSnapshot, EventSnapshot } from '../lib/wagers';
import { formatDateStringMMA } from '../utils/DateUtils';
import { useNotificationHelpers } from '../hooks/useNotificationHelpers';

interface TeamInGame {
  id: number;
  name: string;
  logo?: string;
  winner?: boolean;
}

interface WagerModalProps {
  game: Game;
  onClose: () => void;
}

const WagerModal: React.FC<WagerModalProps> = ({ game, onClose }) => {
  const { walletAddress, connected, userProfile } = useWalletContext();
  const { notifyWagerCreated } = useNotificationHelpers();
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away' | null>(null);
  const [wagerAmount, setWagerAmount] = useState<string>('0.1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // New state for reserved wager functionality
  const [isReserved, setIsReserved] = useState(false);
  const [reservedAddress, setReservedAddress] = useState('');

  const handleSelectTeam = (team: 'home' | 'away') => {
    setSelectedTeam(team);
  };

  const getOpposingTeam = () => {
    return selectedTeam === 'home' ? 'away' : 'home';
  };

  const handleCreateWager = async () => {
    if (!connected || !walletAddress) {
      setError('Please connect your wallet to create a wager');
      return;
    }

    if (!selectedTeam) {
      setError('Please select a team to bet on');
      return;
    }

    if (!wagerAmount || parseFloat(wagerAmount) <= 0) {
      setError('Please enter a valid wager amount');
      return;
    }
    
    // Validate reserved address if the reservation checkbox is checked
    if (isReserved && !reservedAddress.trim()) {
      setError('Please enter a valid wallet address for reservation');
      return;
    }

    // Use the game time as the deadline for sports wagers
    let deadlineDateTime: Date;
    if (game.timestamp) {
      deadlineDateTime = new Date(game.timestamp * 1000);
    } else if (game.date && game.time) {
      // Try to parse from date and time strings
      if (/^\d{4}-\d{2}-\d{2}$/.test(game.date)) {
        deadlineDateTime = new Date(`${game.date}T${game.time || '00:00:00'}`);
      } else {
        deadlineDateTime = new Date(`${game.date} ${game.time || ''}`);
      }
    } else {
      setError('Unable to determine game time for wager deadline');
      return;
    }
    
    // Check if game time is valid
    if (isNaN(deadlineDateTime.getTime())) {
      setError('Invalid game time for wager deadline');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Convert the date to YYYY-MM-DD format if needed
      let formattedEventDate = game.date;
      
      // Check if the date is in DD/MM/YYYY format
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(game.date)) {
        // Convert DD/MM/YYYY to YYYY-MM-DD
        const parts = game.date.split('/');
        formattedEventDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(game.date)) {
        // For MM/DD/YYYY format (already correct for our needs)
        const parts = game.date.split('/');
        formattedEventDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
      }
      
      // Create snapshot objects
      const creatorTeam = selectedTeam === 'home' ? game.homeTeam : game.awayTeam;
      const opponentTeam = selectedTeam === 'home' ? game.awayTeam : game.homeTeam;
      
      // Creator team snapshot
      const creatorTeamSnapshot: TeamSnapshot = {
        id: creatorTeam.id,
        name: creatorTeam.name,
        logo: creatorTeam.logo,
        country: game.league.country,
        league: game.league.name
      };
      
      // Opponent team snapshot
      const opponentTeamSnapshot: TeamSnapshot = {
        id: opponentTeam.id,
        name: opponentTeam.name,
        logo: opponentTeam.logo,
        country: game.league.country,
        league: game.league.name
      };
      
      // Determine the sport type
      const sportType = game.league.name.toLowerCase().includes('soccer') ? 'soccer' : 
                     game.league.name.toLowerCase().includes('nba') ? 'basketball' :
                     game.league.name.toLowerCase().includes('nfl') ? 'american-football' :
                     game.league.name.toLowerCase().includes('mlb') ? 'baseball' :
                     game.league.name.toLowerCase().includes('nhl') ? 'hockey' :
                     game.league.name.toLowerCase().includes('ufc') || game.league.name.toLowerCase().includes('mma') ? 'mma' : 'soccer';
      
      // Event snapshot
      const eventSnapshot: EventSnapshot = {
        id: game.id,
        name: `${game.homeTeam.name} vs ${game.awayTeam.name}`,
        league: {
          id: game.league.id,
          name: game.league.name,
          country: game.league.country,
          logo: game.league.logo
        },
        date: sportType === 'mma' ? formatDateStringMMA(game.date) : game.date,
        time: game.time,
        timezone: game.timezone,
        venue: {
          id: game.venue.id || undefined,
          name: game.venue.name,
          city: game.venue.city,
          country: game.venue.country || undefined
        },
        // Add the slug for MMA events
        slug: game.fight?.titleName || undefined
      };
      
      // Create the wager
      const wagerData = {
        creator_address: walletAddress,
        creator_team_id: selectedTeam === 'home' ? game.homeTeam.id : game.awayTeam.id,
        opponent_team_id: selectedTeam === 'home' ? game.awayTeam.id : game.homeTeam.id, // Set the opposing team's ID
        sol_amount: parseFloat(wagerAmount),
        event_id: game.id,
        sport_type: sportType,
        expires_at: deadlineDateTime.toISOString(),
        event_date: formattedEventDate,
        event_time: game.time,
        event_timezone: game.timezone,
        // This describes what the creator is betting on
        description: `${selectedTeam === 'home' ? game.homeTeam.name : game.awayTeam.name} to win against ${selectedTeam === 'home' ? game.awayTeam.name : game.homeTeam.name}`,
        // Add the snapshot data
        creator_team_snapshot: creatorTeamSnapshot,
        opponent_team_snapshot: opponentTeamSnapshot,
        event_snapshot: eventSnapshot,
        // Add reservation address if the checkbox is checked
        reserved_address: isReserved ? reservedAddress.trim() : null
      };

      const createdWager = await createSportsWager(wagerData);

      if (!createdWager) {
        throw new Error('Failed to create wager');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error creating wager:', err);
      setError('Failed to create wager. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message if wager was created
  if (success) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-dark-850 rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-slate-700/40 text-center p-6">
          <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Wager Created Successfully!</h3>
          <p className="text-gray-400 mb-6">Your wager has been created and is now open for others to take.</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-850 rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-slate-700/40">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-4 text-white flex justify-between items-center">
          <h3 className="text-xl font-semibold">Create Wager</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h4 className="text-lg font-medium text-center text-gray-200 mb-4">Select Team to Win</h4>
          
          <div className="flex justify-between items-center mb-8">
            {/* Creator (You) - Updated to display profile */}
            <div className="text-center w-1/3">
              <div className="mx-auto w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-secondary-600 to-primary-600 flex items-center justify-center text-white mb-2">
                {userProfile?.profile_image_url ? (
                  <img 
                    src={userProfile.profile_image_url} 
                    alt={userProfile.username || 'Profile'} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.png';
                    }}
                  />
                ) : (
                  <span className="text-xl font-bold">
                    {userProfile?.username?.[0]?.toUpperCase() || 'Y'}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-gray-300">
                {userProfile?.username || 'Your Profile'}
              </p>
            </div>
            
            {/* VS */}
            <div className="text-center">
              <span className="px-3 py-1 bg-dark-800 rounded-full text-gray-300 font-medium border border-slate-700/40">VS</span>
            </div>
            
            {/* Opponent */}
            <div className="text-center w-1/3">
              <div className="mx-auto w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center text-gray-500 mb-2 border border-slate-700/40">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-400">Opponent</p>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="bg-dark-800/60 p-4 rounded-lg mb-6 border border-slate-700/40">
            <div className="mb-3 text-center">
              <span className="text-sm font-medium text-gray-400">{game.league.name} - {game.league.country}</span>
              <h5 className="font-semibold text-gray-200">{game.date} • {game.time}</h5>
              <p className="text-sm text-gray-400">{game.venue.name}, {game.venue.city}</p>
            </div>
            
            <div className="flex items-center justify-between gap-3">
              <button 
                className={`flex-1 p-3 rounded-lg flex items-center gap-2 border-2 transition-all ${
                  selectedTeam === 'home' 
                    ? 'border-primary-500 bg-primary-900/20' 
                    : 'border-slate-700/40 hover:border-slate-600/40'
                }`}
                onClick={() => handleSelectTeam('home')}
              >
                {game.homeTeam.logo ? (
                  <img src={game.homeTeam.logo} alt={game.homeTeam.name} className="w-10 h-10 object-contain" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">Team</span>
                  </div>
                )}
                <span className={`font-medium truncate ${selectedTeam === 'home' ? 'text-primary-400' : 'text-gray-300'}`}>
                  {game.homeTeam.name}
                </span>
              </button>
              
              <button 
                className={`flex-1 p-3 rounded-lg flex items-center gap-2 border-2 transition-all ${
                  selectedTeam === 'away' 
                    ? 'border-primary-500 bg-primary-900/20' 
                    : 'border-slate-700/40 hover:border-slate-600/40'
                }`}
                onClick={() => handleSelectTeam('away')}
              >
                {game.awayTeam.logo ? (
                  <img src={game.awayTeam.logo} alt={game.awayTeam.name} className="w-10 h-10 object-contain" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">Team</span>
                  </div>
                )}
                <span className={`font-medium truncate ${selectedTeam === 'away' ? 'text-primary-400' : 'text-gray-300'}`}>
                  {game.awayTeam.name}
                </span>
              </button>
            </div>
          </div>
          
          {/* Wager Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wager Amount (SOL)
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                value={wagerAmount}
                onChange={(e) => setWagerAmount(e.target.value)}
                className="block w-full pr-12 py-2 bg-dark-800 border border-slate-700/40 focus:ring-primary-500 focus:border-primary-500 
                         rounded-md text-gray-200 placeholder-gray-500"
                placeholder="0.00"
                step="0.01"
                min="0.01"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 sm:text-sm">SOL</span>
              </div>
            </div>
          </div>
          

          
          {/* Reserve wager for specific address checkbox */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <input
                id="reserved-wager"
                type="checkbox"
                checked={isReserved}
                onChange={(e) => {
                  setIsReserved(e.target.checked);
                  if (!e.target.checked) {
                    setReservedAddress('');
                  }
                }}
                className="h-4 w-4 text-primary-500 bg-dark-800 border-slate-700 rounded focus:ring-primary-500 focus:ring-opacity-50"
              />
              <label htmlFor="reserved-wager" className="ml-2 block text-sm text-gray-300">
                Reserve wager for specific address
              </label>
            </div>
            
            {isReserved && (
              <div className="mt-2">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    value={reservedAddress}
                    onChange={(e) => setReservedAddress(e.target.value)}
                    className="block w-full py-2 px-3 bg-dark-800 border border-slate-700/40 focus:ring-primary-500 focus:border-primary-500 
                             rounded-md text-gray-200 placeholder-gray-500"
                    placeholder="Enter wallet address"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Only this address will be able to accept your wager
                </p>
              </div>
            )}
          </div>
          
          {/* Preview */}
          {selectedTeam && (
            <div className="bg-dark-800/60 border border-slate-700/40 rounded-lg p-4 mb-6">
              <h5 className="font-medium text-primary-400 mb-2">Wager Preview</h5>
              <p className="text-sm text-gray-300">
                You will bet on <span className="font-semibold text-gray-100">{selectedTeam === 'home' ? game.homeTeam.name : game.awayTeam.name}</span> to 
                win against <span className="font-semibold text-gray-100">{selectedTeam === 'home' ? game.awayTeam.name : game.homeTeam.name}</span>
              </p>
              
              <div className="mt-3 flex items-center text-sm">
                <span className="text-gray-400">Stake Amount:</span>
                <span className="ml-1 font-bold text-primary-400">{wagerAmount} SOL</span>
                <span className="ml-2 text-gray-500">≈ ${(parseFloat(wagerAmount || '0') * 180).toFixed(2)}</span>
              </div>
              
              {isReserved && reservedAddress && (
                <div className="mt-2 flex items-start gap-2 bg-primary-900/10 p-2 rounded border border-primary-700/20">
                  <Check size={16} className="text-primary-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-primary-400 font-medium">Reserved for specific address</p>
                    <p className="text-xs text-gray-400 break-all">{reservedAddress}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateWager}
              disabled={!selectedTeam || isSubmitting || !connected || (isReserved && !reservedAddress.trim())}
              className={`px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 
                        hover:from-green-500 hover:to-emerald-600 text-white rounded-lg 
                        shadow hover:shadow-glow transition-all flex items-center gap-2
                        ${(!selectedTeam || isSubmitting || !connected || (isReserved && !reservedAddress.trim())) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Processing...</span>
                </>
              ) : (
                'Create Wager'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WagerModal;