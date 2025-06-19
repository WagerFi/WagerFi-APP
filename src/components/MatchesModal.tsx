import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Game, TeamResult } from '../types/sports';
import WagerModal from './WagerModal';
import { formatDateStringMMA } from '../utils/DateUtils';

interface MatchesModalProps {
  team: TeamResult;
  games: Game[];
  onClose: () => void;
  onCreateWager: (game: Game) => void;
  isLoading: boolean;
  error: string | null;
  result: string | null;
  formatScore: (score: {home: number | null; away: number | null}) => string;
}

const MatchesModal: React.FC<MatchesModalProps> = ({
  team,
  games,
  onClose,
  onCreateWager,
  isLoading,
  error,
  result,
  formatScore
}) => {
  // State to track which matches have expanded details
  const [expandedMatches, setExpandedMatches] = useState<Record<number, boolean>>({});
  
  // Get sport-specific score label
  const getScoreLabel = (type: string): string => {
    switch (type) {
      case 'halftime': return 'Halftime';
      case 'fulltime': return 'Full Time';
      case 'extratime': return 'Extra Time';
      case 'penalty': return 'Penalties';
      default: return type;
    }
  };

  // Toggle match details expansion
  const toggleMatchDetails = (gameId: number) => {
    setExpandedMatches(prev => ({
      ...prev,
      [gameId]: !prev[gameId]
    }));
  };

  // Format date based on sport type
  const formatGameDate = (game: Game) => {
    // Check if this is an MMA event
    const isMMA = game.league?.name?.toLowerCase().includes('mma') || 
                 game.league?.name?.toLowerCase().includes('ufc') ||
                 (game.fight !== undefined);
                 
    // Use MM/DD/YYYY format for MMA events
    if (isMMA) {
      return formatDateStringMMA(game.date);
    }
    
    // Use the original date format for other sports
    return game.date;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-850 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden border border-slate-700/40">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-4 text-white flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-semibold">Upcoming Games for {team.name}</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content with proper scrolling */}
        <div className="p-6 overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-900/20 border border-red-700/30 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          ) : games.length > 0 ? (
            <div className="space-y-4">
              {games.map((game) => (
                <div key={game.id} className="bg-dark-800/60 border border-slate-700/40 rounded-lg shadow-sm hover:shadow-glow transition-all overflow-hidden">
                  {/* Basic Match Info - Always Visible */}
                  <div className="p-5">
                    {/* Header - League info and date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {game.league.logo && (
                          <img src={game.league.logo} alt={game.league.name} className="w-6 h-6 object-contain" />
                        )}
                        <span className="font-medium text-sm text-gray-400">
                          {game.league.name} • {game.league.round}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-400">{formatGameDate(game)}</p>
                        <p className="text-xs text-gray-500">{game.time} ({game.timezone})</p>
                      </div>
                    </div>
                    
                    {/* Teams and score */}
                    <div className="flex items-center gap-3 justify-between bg-dark-900/50 p-3 rounded-lg mb-3 border border-slate-700/30">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-dark-850 rounded-full flex items-center justify-center overflow-hidden border border-slate-700/40">
                          {game.homeTeam.logo ? (
                            <img src={game.homeTeam.logo} alt={game.homeTeam.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-400">{game.homeTeam.name.substring(0, 2)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${game.homeTeam.winner ? 'text-green-400' : 'text-gray-200'}`}>
                            {game.homeTeam.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center px-3">
                        {game.status.short === 'NS' ? (
                          <span className="px-2 py-1 bg-primary-900/30 text-primary-400 rounded text-xs font-medium border border-primary-700/30">
                            VS
                          </span>
                        ) : (
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-200">
                              {formatScore(game.goals)}
                            </div>
                            {game.status.elapsed && (
                              <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full border border-green-700/30">
                                {game.status.elapsed}'
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 flex-1 justify-end text-right">
                        <div className="flex-1">
                          <p className={`font-medium ${game.awayTeam.winner ? 'text-green-400' : 'text-gray-200'}`}>
                            {game.awayTeam.name}
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-dark-850 rounded-full flex items-center justify-center overflow-hidden border border-slate-700/40">
                          {game.awayTeam.logo ? (
                            <img src={game.awayTeam.logo} alt={game.awayTeam.name} className="w-8 h-8 object-contain" />
                          ) : (
                            <div className="w-10 h-10 bg-dark-800 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-400">{game.awayTeam.name.substring(0, 2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Venue details section */}
                    <div className="bg-dark-900/30 rounded-lg p-3 mb-3 border border-slate-700/20">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-400">Venue:</span>
                          <span className="text-sm text-gray-300">{game.venue.name || 'TBA'}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-400">Location:</span>
                          <span className="text-sm text-gray-300">
                            {game.venue.city}
                            {game.venue.state && `, ${game.venue.state}`}
                            {game.venue.country && game.venue.country !== 'USA' && ` (${game.venue.country})`}
                          </span>
                        </div>
                        
                        {game.venue.capacity && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-gray-400">Capacity:</span>
                            <span className="text-sm text-gray-300">{game.venue.capacity.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Toggle details button and create wager button */}
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => toggleMatchDetails(game.id)}
                        className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {expandedMatches[game.id] ? (
                          <>
                            <ChevronUp size={16} />
                            <span>Hide Details</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} />
                            <span>Show Details</span>
                          </>
                        )}
                      </button>
                      
                      {/* Create Wager Button - Always visible */}
                      <button
                        onClick={() => onCreateWager(game)}
                        className="bg-gradient-to-r from-green-600 to-emerald-700 
                                hover:from-green-500 hover:to-emerald-600 text-white font-medium 
                                py-2 px-4 rounded-lg shadow-md hover:shadow-glow transition-all
                                focus:outline-none focus:ring-2 focus:ring-green-500/50"
                      >
                        Create Wager
                      </button>
                    </div>
                  </div>
                  
                  {/* Expandable Match Details */}
                  {expandedMatches[game.id] && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-700/30 mt-2 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="bg-dark-900/50 p-3 rounded border border-slate-700/30">
                          <h4 className="font-medium text-gray-300 mb-1">Match Details</h4>
                          <div className="space-y-1 text-gray-400">
                            <p>Status: <span className="font-medium text-gray-300">{game.status.long}</span></p>
                            <p>Venue: <span className="font-medium text-gray-300">{game.venue.name}</span></p>
                            <p>City: <span className="font-medium text-gray-300">{game.venue.city}</span></p>
                            {game.venue.state && (
                              <p>State/Province: <span className="font-medium text-gray-300">{game.venue.state}</span></p>
                            )}
                            {game.venue.country && game.venue.country !== 'USA' && (
                              <p>Country: <span className="font-medium text-gray-300">{game.venue.country}</span></p>
                            )}
                            {game.venue.capacity && (
                              <p>Capacity: <span className="font-medium text-gray-300">{game.venue.capacity.toLocaleString()}</span></p>
                            )}
                            {game.referee && (
                              <p>Referee: <span className="font-medium text-gray-300">{game.referee}</span></p>
                            )}
                          </div>
                        </div>
                        
                        {/* Display Scores if available (not just "Not Started") */}
                        {game.status.short !== 'NS' && (
                          <div className="bg-dark-900/50 p-3 rounded border border-slate-700/30">
                            <h4 className="font-medium text-gray-300 mb-1">Detailed Scores</h4>
                            <div className="space-y-1 text-gray-400">
                              <p>{getScoreLabel('halftime')}: <span className="font-medium text-gray-300">{formatScore(game.scores.halftime)}</span></p>
                              <p>{getScoreLabel('fulltime')}: <span className="font-medium text-gray-300">{formatScore(game.scores.fulltime)}</span></p>
                              
                              {/* Only show extra time and penalties if they were needed */}
                              {(game.scores.extratime.home !== null || game.scores.extratime.away !== null) && (
                                <p>{getScoreLabel('extratime')}: <span className="font-medium text-gray-300">{formatScore(game.scores.extratime)}</span></p>
                              )}
                              
                              {(game.scores.penalty.home !== null || game.scores.penalty.away !== null) && (
                                <p>{getScoreLabel('penalty')}: <span className="font-medium text-gray-300">{formatScore(game.scores.penalty)}</span></p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-dark-800/60 border border-slate-700/40 rounded-lg text-center">
              <p className="text-primary-400">No upcoming games found for {team.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchesModal;