import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Trophy, RefreshCw } from 'lucide-react';
import { Game } from '../types/sports';
import { formatDateString, formatTimeString } from '../utils/DateUtils';
import { useTodayGames } from '../hooks/useTodayGames';

interface UpcomingGamesPanelProps {
  onCreateWager?: (game: Game) => void;
}

const UpcomingGamesPanel: React.FC<UpcomingGamesPanelProps> = ({ onCreateWager }) => {
  const { isLoading, error, games, refreshGames, todayDate } = useTodayGames();
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedSports, setExpandedSports] = useState<Record<string, boolean>>({
    'all': true,
    'baseball': true,
    'soccer': true,
    'basketball': true,
    'hockey': true
  });

  // Filter games to only include those that haven't started yet
  const filterUpcomingGames = (gamesList: Game[]): Game[] => {
    const now = Date.now() / 1000; // Current timestamp in seconds
    
    return gamesList.filter(game => {
      // Include games that haven't started yet
      if (game.status.short === 'NS') return true;
      
      // Include games where timestamp is in the future
      if (game.timestamp && game.timestamp > now) return true;
      
      // Exclude all other games (already started, finished, etc.)
      return false;
    });
  };

  // Filter each sport's games to only include upcoming ones
  const upcomingGamesBySport = Object.fromEntries(
    Object.entries(games).map(([sport, sportGames]) => [
      sport, 
      filterUpcomingGames(sportGames)
    ])
  );

  // Get all upcoming games across all sports
  const allUpcomingGames = Object.values(upcomingGamesBySport).flat();

  // Filter games based on selected sport
  const filteredGames = selectedSport === 'all' 
    ? allUpcomingGames 
    : upcomingGamesBySport[selectedSport] || [];

  // Group games by league
  const gamesByLeague = filteredGames.reduce((acc, game) => {
    const leagueName = game.league.name;
    if (!acc[leagueName]) {
      acc[leagueName] = [];
    }
    acc[leagueName].push(game);
    return acc;
  }, {} as Record<string, Game[]>);

  // Group upcoming games by sport for the sport toggle feature
  const gamesBySport = Object.keys(upcomingGamesBySport).reduce((acc, sportId) => {
    const sportGames = upcomingGamesBySport[sportId] || [];
    if (sportGames.length > 0) {
      acc[sportId] = sportGames;
    }
    return acc;
  }, {} as Record<string, Game[]>);

  // Function to handle wager creation
  const handleCreateWager = (game: Game) => {
    if (onCreateWager) {
      onCreateWager(game);
    } else {
      console.log('Create wager for game:', game);
    }
  };
  
  // Format date display
  const formatDate = (dateStr: string) => {
    return formatDateString(dateStr);
  };
  
  // Format time display
  const formatTime = (timeStr: string) => {
    return formatTimeString(timeStr);
  };

  // Toggle sport visibility
  const toggleSport = (sportId: string) => {
    setExpandedSports(prev => ({
      ...prev,
      [sportId]: !prev[sportId]
    }));
  };

  // Sport filter options
  const sportFilters = [
    { id: 'all', name: 'All' },
    { id: 'soccer', name: 'Soccer' },
    { id: 'basketball', name: 'NBA' },
    { id: 'baseball', name: 'MLB' },
    { id: 'hockey', name: 'NHL' }
  ];

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshGames();
    setIsRefreshing(false);
  };

  // Map sport IDs to display names
  const sportNames = {
    'soccer': 'Soccer',
    'basketball': 'NBA',
    'baseball': 'MLB',
    'hockey': 'NHL'
  };

  // Get sport logo/icon
  const getSportIcon = (sportId: string) => {
    switch (sportId) {
      case 'soccer':
        return <span className="text-green-400">⚽</span>;
      case 'basketball':
        return <span className="text-orange-400">🏀</span>;
      case 'baseball':
        return <span className="text-red-400">⚾</span>;
      case 'hockey':
        return <span className="text-blue-400">🏒</span>;
      default:
        return <Trophy size={14} className="text-gray-400" />;
    }
  };

  // Sort games by time
  const sortGamesByTime = (games: Game[]): Game[] => {
    return [...games].sort((a, b) => {
      // Convert timestamps to numbers, fallback to 0 if undefined
      const timeA = a.timestamp || 0;
      const timeB = b.timestamp || 0;
      return timeA - timeB;
    });
  };

  return (
    <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl shadow-md">
      <div className="p-4 border-b border-slate-700/40 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-100">Upcoming Events</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{todayDate}</span>
        </div>
      </div>
      
      {/* Sport filters */}
      <div className="p-4 border-b border-slate-700/40">
        <div className="flex flex-wrap gap-2">
          {sportFilters.map(sport => (
            <button
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                selectedSport === sport.id 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-dark-850 text-gray-400 hover:text-gray-300 border border-slate-700/40'
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-240px)]">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-400 mb-2">{error}</p>
            <button
              onClick={handleRefresh}
              className="text-xs px-3 py-1 bg-dark-850 text-primary-400 rounded-lg border border-slate-700/40 hover:bg-dark-800"
            >
              Retry
            </button>
          </div>
        ) : allUpcomingGames.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400">No upcoming events scheduled</p>
          </div>
        ) : selectedSport === 'all' ? (
          // When "All" is selected, display games by sport with toggles
          <div>
            {Object.entries(gamesBySport).map(([sportId, sportGames]) => (
              <div key={sportId} className="mb-2">
                {/* Sport heading with toggle */}
                <button 
                  onClick={() => toggleSport(sportId)} 
                  className="w-full px-4 py-2 bg-dark-850/70 border-y border-slate-700/30 flex justify-between items-center hover:bg-dark-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {getSportIcon(sportId)}
                    <h4 className="font-medium text-sm text-gray-300">
                      {sportNames[sportId as keyof typeof sportNames] || sportId.toUpperCase()} ({sportGames.length})
                    </h4>
                  </div>
                  {expandedSports[sportId] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                
                {/* Sport games */}
                {expandedSports[sportId] && (
                  <div className="divide-y divide-slate-700/20">
                    {sportId === 'hockey' ? (
                      <div className="px-4 py-6 text-center">
                        <p className="text-gray-400 text-sm">Season Not Started</p>
                      </div>
                    ) : (
                      sortGamesByTime(sportGames).slice(0, 10).map(game => (
                        <div key={game.id} className="px-4 py-3 hover:bg-dark-850/50 transition-colors">
                          {/* Game time and date */}
                          <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} />
                              <span>{formatDate(game.date)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} />
                              <span>{formatTime(game.time)}</span>
                            </div>
                          </div>
                          
                          {/* Teams */}
                          <div className="flex items-center gap-2 justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                                  {game.homeTeam.logo ? (
                                    <img 
                                      src={game.homeTeam.logo} 
                                      alt={game.homeTeam.name}
                                      className="w-8 h-8 object-contain" 
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <span className="text-xs font-medium text-gray-400">
                                      {game.homeTeam.name.substring(0, 2)}
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-300 truncate">{game.homeTeam.name}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center justify-center mx-2">
                              <span className="px-1.5 py-0.5 bg-primary-900/30 text-primary-400 rounded text-[10px] font-medium border border-primary-700/30">
                                VS
                              </span>
                            </div>
                            
                            <div className="flex-1 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-sm text-gray-300 truncate">{game.awayTeam.name}</span>
                                <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                                  {game.awayTeam.logo ? (
                                    <img 
                                      src={game.awayTeam.logo} 
                                      alt={game.awayTeam.name}
                                      className="w-8 h-8 object-contain" 
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <span className="text-xs font-medium text-gray-400">
                                      {game.awayTeam.name.substring(0, 2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action button */}
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => handleCreateWager(game)}
                              className="text-xs px-2 py-1 bg-green-800/30 text-green-400 hover:bg-green-800/50 rounded border border-green-700/30 transition-colors"
                            >
                              Create Wager
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                    {sportId !== 'hockey' && sportGames.length > 10 && (
                      <div className="px-4 py-2 text-center">
                        <span className="text-xs text-primary-400">+ {sportGames.length - 10} more events</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-400">{selectedSport === 'hockey' ? 'Season Not Started' : 'No upcoming events scheduled'}</p>
          </div>
        ) : (
          // When specific sport is selected, group by league
          <div>
            {Object.entries(gamesByLeague).map(([leagueName, leagueGames]) => {
              const sortedLeagueGames = sortGamesByTime(leagueGames);
              
              return (
                <div key={leagueName} className="mb-2">
                  <div className="px-4 py-2 bg-dark-850/70 border-y border-slate-700/30">
                    <div className="flex items-center gap-2">
                      {sortedLeagueGames[0].league.logo && (
                        <img 
                          src={sortedLeagueGames[0].league.logo} 
                          alt={leagueName} 
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <h4 className="font-medium text-sm text-gray-300">{leagueName}</h4>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-700/20">
                    {sortedLeagueGames.slice(0, 10).map(game => (
                      <div key={game.id} className="px-4 py-3 hover:bg-dark-850/50 transition-colors">
                        {/* Game time and date */}
                        <div className="flex justify-between items-center mb-2 text-xs text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            <span>{formatDate(game.date)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{formatTime(game.time)}</span>
                          </div>
                        </div>
                        
                        {/* Teams */}
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                                {game.homeTeam.logo ? (
                                  <img 
                                    src={game.homeTeam.logo} 
                                    alt={game.homeTeam.name}
                                    className="w-8 h-8 object-contain" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <span className="text-xs font-medium text-gray-400">
                                    {game.homeTeam.name.substring(0, 2)}
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-300 truncate">{game.homeTeam.name}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center mx-2">
                            <span className="px-1.5 py-0.5 bg-primary-900/30 text-primary-400 rounded text-[10px] font-medium border border-primary-700/30">
                              VS
                            </span>
                          </div>
                          
                          <div className="flex-1 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="text-sm text-gray-300 truncate">{game.awayTeam.name}</span>
                              <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                                {game.awayTeam.logo ? (
                                  <img 
                                    src={game.awayTeam.logo} 
                                    alt={game.awayTeam.name}
                                    className="w-8 h-8 object-contain" 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <span className="text-xs font-medium text-gray-400">
                                    {game.awayTeam.name.substring(0, 2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action button */}
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={() => handleCreateWager(game)}
                            className="text-xs px-2 py-1 bg-green-800/30 text-green-400 hover:bg-green-800/50 rounded border border-green-700/30 transition-colors"
                          >
                            Create Wager
                          </button>
                        </div>
                      </div>
                    ))}
                    {sortedLeagueGames.length > 10 && (
                      <div className="px-4 py-2 text-center">
                        <span className="text-xs text-primary-400">+ {sortedLeagueGames.length - 10} more events</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingGamesPanel;