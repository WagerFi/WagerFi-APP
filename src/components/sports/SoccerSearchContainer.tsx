import React, { useState, useEffect } from 'react';
import { FolderRoot as Football } from 'lucide-react';
import SearchBox from '../SearchBox';
import GenerateButton from '../GenerateButton';
import WagerModal from '../WagerModal';
import { TeamResult, Game } from '../../types/sports';
import useSportSearch from '../../hooks/useSportSearch';
import { filterItemsWithValidLogos } from '../../utils/imageUtils';
import { useWalletContext } from '../../contexts/WalletContext';

// Suggested popular teams for soccer
const SUGGESTED_TEAMS: {name: string; id: number; country: string; logo: string}[] = [
  { name: 'Manchester City', id: 50, country: 'England', logo: 'https://media-4.api-sports.io/football/teams/50.png' },
  { name: 'Manchester United', id: 33, country: 'England', logo: 'https://media-4.api-sports.io/football/teams/33.png' },
  { name: 'Liverpool', id: 40, country: 'England', logo: 'https://media-4.api-sports.io/football/teams/40.png' },
  { name: 'Real Madrid', id: 541, country: 'Spain', logo: 'https://media-4.api-sports.io/football/teams/541.png' },
  { name: 'Barcelona', id: 529, country: 'Spain', logo: 'https://media-4.api-sports.io/football/teams/529.png' },
];

interface SoccerSearchContainerProps {
  onMatchesFound: (team: TeamResult, games: Game[], error: string | null, result: string | null) => void;
}

const SoccerSearchContainer: React.FC<SoccerSearchContainerProps> = ({ onMatchesFound }) => {
  const { connected, walletAddress } = useWalletContext();
  
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
    fetchSportsApi,
    setTeams,
    setSelectedTeam,
    setUpcomingGames,
    setIsLoading,
    setError,
    setResult,
    setIsGenerating,
    setSearchQuery
  } = useSportSearch({ 
    sportId: 'soccer', 
    sportName: 'Football (Soccer)' 
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
    
    try {
      const data = await fetchSportsApi('teams', { search: query });
      
      if (data.response && Array.isArray(data.response)) {
        const teamResults: TeamResult[] = data.response.map((team: any) => {
          return {
            id: team.team.id,
            name: team.team.name,
            country: team.team.country || 'Unknown',
            logo: team.team.logo
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
      
      const data = await fetchSportsApi('teams', { search: cleanName });
      
      if (data.response && Array.isArray(data.response) && data.response.length > 0) {
        return data.response[0].team.id;
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
    
    try {
      const data = await fetchSportsApi('fixtures/headtohead', { h2h: `${teamAId}-${teamBId}`, next: 10 });
      
      if (data.response && Array.isArray(data.response)) {
        const games: Game[] = data.response.map((item: any) => {
          // Football fixture
          const fixture = item;
          const fixtureDate = new Date(fixture.fixture.date);
          
          return {
            id: fixture.fixture.id,
            date: fixtureDate.toLocaleDateString(),
            time: fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: fixture.fixture.timestamp,
            timezone: fixture.fixture.timezone,
            status: {
              long: fixture.fixture.status.long,
              short: fixture.fixture.status.short,
              elapsed: fixture.fixture.status.elapsed
            },
            league: {
              id: fixture.league.id,
              name: fixture.league.name,
              country: fixture.league.country,
              logo: fixture.league.logo,
              round: fixture.league.round,
              season: fixture.league.season
            },
            homeTeam: {
              id: fixture.teams.home.id,
              name: fixture.teams.home.name,
              logo: fixture.teams.home.logo,
              winner: fixture.teams.home.winner
            },
            awayTeam: {
              id: fixture.teams.away.id,
              name: fixture.teams.away.name,
              logo: fixture.teams.away.logo,
              winner: fixture.teams.away.winner
            },
            goals: {
              home: fixture.goals.home,
              away: fixture.goals.away
            },
            scores: {
              halftime: {
                home: fixture.score.halftime.home,
                away: fixture.score.halftime.away
              },
              fulltime: {
                home: fixture.score.fulltime.home,
                away: fixture.score.fulltime.away
              },
              extratime: {
                home: fixture.score.extratime.home,
                away: fixture.score.extratime.away
              },
              penalty: {
                home: fixture.score.penalty.home,
                away: fixture.score.penalty.away
              }
            },
            venue: {
              id: fixture.fixture.venue?.id,
              name: fixture.fixture.venue?.name || 'Unknown Venue',
              city: fixture.fixture.venue?.city || 'Unknown City'
            },
            referee: fixture.fixture.referee || 'TBA'
          };
        });
        
        // Filter for not started games and limit to 5
        const notStartedGames = games.filter(game => game.status.short === 'NS');
        const limitedGames = notStartedGames.slice(0, 5);
        
        setUpcomingGames(limitedGames);
        
        // Create a fake "team" for vs searches that combines both team names
        if (limitedGames.length > 0) {
          const vsTeam: TeamResult = {
            id: -1, // Use a special ID to indicate this is a vs search
            name: `${limitedGames[0].homeTeam.name} vs ${limitedGames[0].awayTeam.name}`,
            country: 'Multiple',
            logo: undefined // No logo for vs searches
          };
          setSelectedTeam(vsTeam);
          setResult(`Showing matches between the two teams`);
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
    
    try {
      const data = await fetchSportsApi('fixtures', { team: teamId, next: 10 });
      
      if (data.response && Array.isArray(data.response)) {
        const games: Game[] = data.response.map((item: any) => {
          // Football fixture
          const fixture = item;
          // Parse date and format time
          const fixtureDate = new Date(fixture.fixture.date);
          
          return {
            id: fixture.fixture.id,
            date: fixtureDate.toLocaleDateString(),
            time: fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: fixture.fixture.timestamp,
            timezone: fixture.fixture.timezone,
            status: {
              long: fixture.fixture.status.long,
              short: fixture.fixture.status.short,
              elapsed: fixture.fixture.status.elapsed
            },
            league: {
              id: fixture.league.id,
              name: fixture.league.name,
              country: fixture.league.country,
              logo: fixture.league.logo,
              round: fixture.league.round,
              season: fixture.league.season
            },
            homeTeam: {
              id: fixture.teams.home.id,
              name: fixture.teams.home.name,
              logo: fixture.teams.home.logo,
              winner: fixture.teams.home.winner
            },
            awayTeam: {
              id: fixture.teams.away.id,
              name: fixture.teams.away.name,
              logo: fixture.teams.away.logo,
              winner: fixture.teams.away.winner
            },
            goals: {
              home: fixture.goals.home,
              away: fixture.goals.away
            },
            scores: {
              halftime: {
                home: fixture.score.halftime.home,
                away: fixture.score.halftime.away
              },
              fulltime: {
                home: fixture.score.fulltime.home,
                away: fixture.score.fulltime.away
              },
              extratime: {
                home: fixture.score.extratime.home,
                away: fixture.score.extratime.away
              },
              penalty: {
                home: fixture.score.penalty.home,
                away: fixture.score.penalty.away
              }
            },
            venue: {
              id: fixture.fixture.venue?.id,
              name: fixture.fixture.venue?.name || 'Unknown Venue',
              city: fixture.fixture.venue?.city || 'Unknown City'
            },
            referee: fixture.fixture.referee || 'TBA'
          };
        });
        
        // Filter to only include games that have not started yet (NS = Not Started)
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
  
  // Handle search result selection from dropdown
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

  return (
    <div className="w-full">
      <div className="space-y-6">
        <SearchBox 
          onQueryChange={handleQueryChange} 
          value={searchQuery}
          searchResults={searchResults}
          onSelectResult={handleSearchResultSelect}
          placeholder="Search for football teams..."
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
                      <Football size={20} className="text-gray-400" />
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
              <Football size={24} className="text-gray-400" />
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

export default SoccerSearchContainer;