import React, { useState, useEffect } from 'react';
import { ShoppingBasket as Basketball } from 'lucide-react';
import SearchBox from '../SearchBox';
import GenerateButton from '../GenerateButton';
import WagerModal from '../WagerModal';
import { TeamResult, Game } from '../../types/sports';
import useSportSearch from '../../hooks/useSportSearch';
import { filterItemsWithValidLogos } from '../../utils/imageUtils';

// Suggested popular teams for NBA
const SUGGESTED_TEAMS: {name: string; id: number; country: string; logo: string}[] = [
  { name: 'Denver Nuggets', id: 139, country: 'USA', logo: 'https://media-4.api-sports.io/basketball/teams/139.png' },
  { name: 'Boston Celtics', id: 133, country: 'USA', logo: 'https://media-4.api-sports.io/basketball/teams/133.png' },
  { name: 'Los Angeles Lakers', id: 145, country: 'USA', logo: 'https://media-4.api-sports.io/basketball/teams/145.png' },
  { name: 'Golden State Warriors', id: 141, country: 'USA', logo: 'https://media-4.api-sports.io/basketball/teams/141.png' },
  { name: 'Miami Heat', id: 147, country: 'USA', logo: 'https://media-4.api-sports.io/basketball/teams/147.png' },
];

interface NBASearchContainerProps {
  onMatchesFound: (team: TeamResult, games: Game[], error: string | null, result: string | null) => void;
}

const NBASearchContainer: React.FC<NBASearchContainerProps> = ({ onMatchesFound }) => {
  const {
    searchQuery,
    isGenerating,
    result,
    isLoading,
    error,
    teams,
    selectedTeam,
    upcomingGames,
    selectedGame,
    showWagerModal,
    isVsSearch,
    searchResults,
    handleQueryChange,
    handleCreateWager,
    closeWagerModal,
    handleSearchResultSelect: baseHandleSearchResultSelect,
    formatScore,
    getApiConfig,
    setTeams,
    setSelectedTeam,
    setUpcomingGames,
    setIsLoading,
    setError,
    setResult,
    setIsGenerating,
    setSearchQuery
  } = useSportSearch({ 
    sportId: 'basketball', 
    sportName: 'NBA' 
  });

  // State for filtered suggested teams (only those with valid logos)
  const [filteredSuggestedTeams, setFilteredSuggestedTeams] = useState<typeof SUGGESTED_TEAMS>([]);
  
  // Filter suggested teams on component mount
  useEffect(() => {
    const filterTeams = async () => {
      const validTeams = await filterItemsWithValidLogos(SUGGESTED_TEAMS);
      setFilteredSuggestedTeams(validTeams);
    };
    
    filterTeams();
  }, []);

  // When matches are loaded or selected team changes, notify the parent component
  useEffect(() => {
    if (selectedTeam && upcomingGames.length > 0) {
      onMatchesFound(selectedTeam, upcomingGames, error, result);
    }
  }, [upcomingGames, selectedTeam, error, result, onMatchesFound]);

  // Function to fetch teams by search query
  const fetchTeams = async (query: string) => {
    setTeams([]);
    setSelectedTeam(null);
    setUpcomingGames([]);
    setIsLoading(true);
    setError(null);
    
    const { baseUrl, apiKey } = getApiConfig();
    
    try {
      const response = await fetch(`${baseUrl}/teams?search=${encodeURIComponent(query)}`, {
        headers: {
          "x-apisports-key": apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch teams: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.response && Array.isArray(data.response)) {
        const teamResults: TeamResult[] = data.response.map((team: any) => {
          // Handle basketball API response - country might be an object
          let countryStr = 'Unknown';
          
          // If country is an object with a name property, use that
          if (team.country && typeof team.country === 'object' && team.country.name) {
            countryStr = team.country.name;
          } 
          // If country is a string, use it directly
          else if (team.country && typeof team.country === 'string') {
            countryStr = team.country;
          }
          
          return {
            id: team.id,
            name: team.name,
            country: countryStr,
            logo: team.logo
          };
        });
        
        // Filter out teams with invalid logo URLs
        const teamsWithValidLogos = await filterItemsWithValidLogos(teamResults);
        
        setTeams(teamsWithValidLogos);
        setResult(`Found ${teamsWithValidLogos.length} teams for "${query}"`);
      } else {
        setResult(`No teams found for "${query}"`);
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
      setError('Failed to load teams. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch a single team ID by name
  const fetchTeamId = async (name: string): Promise<number | null> => {
    try {
      // Make sure to trim the name and remove any "vs" or "v" if they got included
      const cleanName = name.trim().replace(/\s*(?:v|vs|VS)\s*/i, '');
      const { baseUrl, apiKey } = getApiConfig();
      
      const response = await fetch(`${baseUrl}/teams?search=${encodeURIComponent(cleanName)}`, {
        headers: {
          "x-apisports-key": apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch team: ${cleanName}`);
      }
      
      const data = await response.json();
      
      if (data.response && Array.isArray(data.response) && data.response.length > 0) {
        return data.response[0].id;
      } else {
        console.error(`No team found for: ${cleanName}`);
        return null;
      }
    } catch (err) {
      console.error(`Error fetching team ID for ${name}:`, err);
      return null;
    }
  };

  // Function to fetch head-to-head matches between two teams
  const fetchHeadToHeadMatches = async (teamAId: number, teamBId: number) => {
    setIsLoading(true);
    setError(null);
    setUpcomingGames([]);
    
    const { baseUrl, apiKey } = getApiConfig();
    
    try {
      const endpoint = `${baseUrl}/games?h2h=${teamAId}-${teamBId}`;
      
      const response = await fetch(endpoint, {
        headers: {
          "x-apisports-key": apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch head-to-head matches');
      }
      
      const data = await response.json();
      console.log('H2H API response:', data);
      
      if (data.response && Array.isArray(data.response)) {
        const games: Game[] = data.response.map((item: any) => {
          // Parse date and format time
          const gameDate = new Date(item.date);
          
          // Make sure country is properly handled
          let leagueCountry = 'Unknown';
          if (item.country && typeof item.country === 'object' && item.country.name) {
            leagueCountry = item.country.name;
          } else if (typeof item.country === 'string') {
            leagueCountry = item.country;
          }
          
          return {
            id: item.id,
            date: gameDate.toLocaleDateString(),
            time: gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Math.floor(gameDate.getTime() / 1000),
            timezone: "UTC", // API doesn't provide timezone
            status: {
              long: item.status.long,
              short: item.status.short,
              elapsed: null
            },
            league: {
              id: item.league.id,
              name: item.league.name,
              country: leagueCountry,
              logo: item.league.logo,
              round: item.league.round || 'Regular Season',
              season: item.league.season
            },
            homeTeam: {
              id: item.teams.home.id,
              name: item.teams.home.name,
              logo: item.teams.home.logo,
              winner: item.scores.home.winner
            },
            awayTeam: {
              id: item.teams.away.id,
              name: item.teams.away.name,
              logo: item.teams.away.logo,
              winner: item.scores.away.winner
            },
            goals: {
              home: item.scores.home.total,
              away: item.scores.away.total
            },
            scores: {
              halftime: {
                home: item.scores.home.quarter_1 + (item.scores.home.quarter_2 || 0),
                away: item.scores.away.quarter_1 + (item.scores.away.quarter_2 || 0)
              },
              fulltime: {
                home: item.scores.home.total,
                away: item.scores.away.total
              },
              extratime: {
                home: null,
                away: null
              },
              penalty: {
                home: null,
                away: null
              }
            },
            venue: {
              id: null,
              name: item.venue || 'Unknown Venue',
              city: 'Unknown City',
              state: null,
              country: 'USA'
            },
            referee: null
          };
        });
        
        // Filter to only include games with status "Not Started" (NS)
        const notStartedGames = games.filter(game => game.status.short === 'NS');
        
        // Limit to 5 games maximum
        const limitedGames = notStartedGames.slice(0, 5);
        
        setUpcomingGames(limitedGames);
        
        if (limitedGames.length > 0) {
          // Create a fake "team" for vs searches that combines both team names
          const vsTeam: TeamResult = {
            id: -1, // Use a special ID to indicate this is a vs search
            name: `${limitedGames[0].homeTeam.name} vs ${limitedGames[0].awayTeam.name}`,
            country: 'Multiple',
            logo: undefined // No logo for vs searches
          };
          setSelectedTeam(vsTeam);
          setResult(`Showing upcoming matches between the two teams`);
        } else {
          setResult(`No upcoming matches found between these teams`);
        }
      } else {
        setUpcomingGames([]);
        setResult(`No upcoming matches found between these teams`);
      }
    } catch (err) {
      console.error('Error fetching head-to-head matches:', err);
      setError('Failed to load matches. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch upcoming games for a selected team
  const fetchUpcomingGames = async (teamId: number) => {
    setIsLoading(true);
    setError(null);
    
    const { baseUrl, apiKey } = getApiConfig();
    
    try {
      // Updated to use proper endpoint for basketball including league and season parameters
      const endpoint = `${baseUrl}/games?team=${teamId}&league=12&season=2024-2025`;
      
      console.log('Fetching upcoming games from endpoint:', endpoint);
      
      const response = await fetch(endpoint, {
        headers: {
          "x-apisports-key": apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch upcoming games: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Upcoming games API response:', data);
      
      if (data.response && Array.isArray(data.response)) {
        const games: Game[] = data.response.map((item: any) => {
          // Parse date and format time
          const fixtureDate = new Date(item.date);
          
          // Make sure country is properly handled
          let leagueCountry = 'Unknown';
          if (item.country && typeof item.country === 'object' && item.country.name) {
            leagueCountry = item.country.name;
          } else if (typeof item.country === 'string') {
            leagueCountry = item.country;
          }
          
          // Extract all quarters scores if available
          const quarters = {
            q1: { home: item.scores?.home?.quarter_1 || null, away: item.scores?.away?.quarter_1 || null },
            q2: { home: item.scores?.home?.quarter_2 || null, away: item.scores?.away?.quarter_2 || null },
            q3: { home: item.scores?.home?.quarter_3 || null, away: item.scores?.away?.quarter_3 || null },
            q4: { home: item.scores?.home?.quarter_4 || null, away: item.scores?.away?.quarter_4 || null },
            overtime: { home: item.scores?.home?.over_time || null, away: item.scores?.away?.over_time || null },
          };
          
          // Handle venue data - for NBA games, venue is often a direct string property
          const venueName = typeof item.venue === 'string' ? item.venue : null;
          
          return {
            id: item.id,
            date: fixtureDate.toLocaleDateString(),
            time: fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Math.floor(fixtureDate.getTime() / 1000),
            timezone: "UTC", // API doesn't provide timezone
            status: {
              long: item.status.long,
              short: item.status.short,
              elapsed: null
            },
            league: {
              id: item.league.id,
              name: item.league.name,
              country: leagueCountry,
              logo: item.league.logo,
              round: item.league.round || 'Regular Season',
              season: item.league.season
            },
            homeTeam: {
              id: item.teams.home.id,
              name: item.teams.home.name,
              logo: item.teams.home.logo,
              winner: item.scores.home.winner
            },
            awayTeam: {
              id: item.teams.away.id,
              name: item.teams.away.name,
              logo: item.teams.away.logo,
              winner: item.scores.away.winner
            },
            goals: {
              home: item.scores.home.total,
              away: item.scores.away.total
            },
            scores: {
              halftime: {
                home: item.scores.home.quarter_1 + (item.scores.home.quarter_2 || 0),
                away: item.scores.away.quarter_1 + (item.scores.away.quarter_2 || 0)
              },
              fulltime: {
                home: item.scores.home.total,
                away: item.scores.away.total
              },
              extratime: {
                home: null,
                away: null
              },
              penalty: {
                home: null,
                away: null
              }
            },
            venue: {
              id: null,
              // Use the venue string directly or fall back to arena properties if available
              name: venueName || item.arena?.name || 'Unknown Venue',
              // For NBA, we often don't have city in the direct response, so we'll show just the venue
              city: item.arena?.city || '',
              state: item.arena?.state || null,
              country: item.arena?.country || 'USA'
            },
            referee: item.officials && item.officials.length > 0 ? item.officials[0] : null,
            quarters: quarters,
            timeRemaining: item.status.timer || null,
            currentQuarter: item.status.quarter || null,
            attendance: item.arena?.attendance || null,
            standings: {
              home: item.standings?.home || null,
              away: item.standings?.away || null
            }
          };
        });
        
        // Filter to only include games with status "Not Started" (NS)
        const notStartedGames = games.filter(game => game.status.short === 'NS');
        
        // Limit to 5 games maximum
        const limitedGames = notStartedGames.slice(0, 5);
        
        setUpcomingGames(limitedGames);
        
        if (limitedGames.length > 0) {
          setResult(`Found ${limitedGames.length} upcoming games for ${selectedTeam?.name}`);
        } else {
          setResult(`No upcoming games found for ${selectedTeam?.name}`);
        }
      } else {
        setUpcomingGames([]);
        setResult(`No upcoming games found for ${selectedTeam?.name}`);
      }
    } catch (err) {
      console.error('Error fetching upcoming games:', err);
      setError('Failed to load upcoming games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for suggested team click
  const handleSuggestedTeamClick = (team: {name: string; id: number; country: string; logo: string}) => {
    // Create a TeamResult object from the suggested team
    const teamResult: TeamResult = {
      id: team.id,
      name: team.name,
      country: team.country,
      logo: team.logo
    };
    
    setSearchQuery(team.name); // Update the search box
    handleTeamSelect(teamResult); // Process as if selected from search results
  };

  // Override the base search result selection to also fetch upcoming games
  const handleSearchResultSelect = (team: TeamResult) => {
    // First call the base handler to update the UI state
    baseHandleSearchResultSelect(team);
    // Then fetch upcoming games for the selected team
    fetchUpcomingGames(team.id);
  };

  const handleGenerate = async () => {
    if (!searchQuery.trim()) return;
    
    setIsGenerating(true);
    // Clear previous results
    setResult(null);
    setTeams([]);
    setSelectedTeam(null);
    setUpcomingGames([]);
    
    // Check if this is a vs search
    if (isVsSearch) {
      // Split the query and extract team names
      // Improved regex to better handle different vs formats and ensure proper splitting
      const teamNames = searchQuery.split(/\s+(?:v|vs|VS)\s+/i).map(name => name.trim());
      
      // Ensure we have exactly two team names
      if (teamNames.length === 2 && teamNames[0] && teamNames[1]) {
        const teamA = teamNames[0];
        const teamB = teamNames[1];
        
        try {
          const [teamAId, teamBId] = await Promise.all([
            fetchTeamId(teamA),
            fetchTeamId(teamB)
          ]);
          
          if (teamAId && teamBId) {
            // Fetch head-to-head matches
            await fetchHeadToHeadMatches(teamAId, teamBId);
          } else {
            setError(`Could not find ${!teamAId ? teamA : ''} ${!teamAId && !teamBId ? 'or' : ''} ${!teamBId ? teamB : ''}. Please check your search query.`);
          }
        } catch (err) {
          console.error('Error in team vs team search:', err);
          setError('Failed to process team vs team search. Please try again.');
        }
      } else {
        setError('Invalid format. Please use: "Team A vs Team B"');
      }
    } else {
      // Fetch teams based on the current search query (original implementation)
      await fetchTeams(searchQuery);
    }
    
    setIsGenerating(false);
  };

  // Modified to show the modal when a team is selected
  const handleTeamSelect = (team: TeamResult) => {
    setSelectedTeam(team);
    fetchUpcomingGames(team.id);
  };

  // Sport-specific score label
  const getScoreLabel = (type: string): string => {
    switch (type) {
      case 'halftime': return 'First Half';
      case 'fulltime': return 'Final Score';
      case 'q1': return '1st Quarter';
      case 'q2': return '2nd Quarter';
      case 'q3': return '3rd Quarter';
      case 'q4': return '4th Quarter';
      case 'overtime': return 'Overtime';
      default: return type;
    }
  };

  // Format team record 
  const formatRecord = (record: any): string => {
    if (!record) return 'N/A';
    return `${record.win}-${record.loss}`;
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <SearchBox 
          onQueryChange={handleQueryChange} 
          value={searchQuery}
          searchResults={searchResults}
          onSelectResult={handleSearchResultSelect}
          placeholder="Search for NBA teams..."
        />
        
        {/* Suggested Teams Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Popular Teams</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestedTeams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleSuggestedTeamClick(team)}
                className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/80 hover:bg-dark-800 rounded-full border border-slate-700/40 
                        shadow-sm text-sm transition-all hover:shadow text-gray-300"
              >
                <div className="w-5 h-5 rounded-full bg-dark-850 flex items-center justify-center overflow-hidden">
                  <img src={team.logo} alt={team.name} className="w-5 h-5 object-contain" onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-[10px] font-bold text-gray-400">T</span>';
                  }} />
                </div>
                <span>{team.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {isVsSearch && (
          <div className="px-4 py-2 bg-dark-800/60 border border-slate-700/40 rounded-lg">
            <p className="text-sm text-blue-400">
              <span className="font-medium">Team vs Team search detected!</span> We'll find head-to-head matches between these teams.
            </p>
          </div>
        )}
        
        <div className="flex justify-center">
          <GenerateButton onClick={handleGenerate} isLoading={isGenerating} />
        </div>
        
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
            <p className="text-red-400 text-center text-sm">{error}</p>
          </div>
        )}
        
        {teams.length > 0 && !isVsSearch && (
          <div className="mt-8 p-4 bg-dark-800/60 border border-slate-700/40 rounded-lg">
            <p className="text-gray-300 text-center">{result}</p>
            
            {/* Team grid */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {teams.map((team) => (
                <div 
                  key={team.id} 
                  className={`p-3 bg-dark-800/80 rounded-lg shadow-sm flex items-center gap-3 cursor-pointer transition-all hover:shadow-md hover:bg-dark-800 border border-slate-700/30`}
                  onClick={() => handleTeamSelect(team)}
                >
                  <div className="w-10 h-10 bg-dark-850 rounded-full flex items-center justify-center overflow-hidden border border-slate-700/40">
                    {team.logo ? (
                      <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <Basketball size={20} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-gray-200">{team.name}</p>
                    <p className="text-sm text-gray-400 truncate">{team.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {result && result.includes("No upcoming games found") && !isLoading && upcomingGames.length === 0 && selectedTeam && (
          <div className="mt-4 p-6 bg-dark-800/60 border border-slate-700/40 rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-dark-850 rounded-full flex items-center justify-center">
              <Basketball size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-300 font-medium">{result}</p>
            <p className="text-sm text-gray-400 mt-2">Try searching for another team or check back later.</p>
          </div>
        )}
      </div>
      
      {/* Wager Modal */}
      {showWagerModal && selectedGame && (
        <WagerModal game={selectedGame} onClose={closeWagerModal} />
      )}
    </div>
  );
};

export default NBASearchContainer;