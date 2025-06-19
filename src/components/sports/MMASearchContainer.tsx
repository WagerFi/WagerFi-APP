import React, { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';
import SearchBox from '../SearchBox';
import WagerModal from '../WagerModal';
import { TeamResult, Game } from '../../types/sports';
import useSportSearch from '../../hooks/useSportSearch';
import { filterItemsWithValidLogos } from '../../utils/imageUtils';
import { formatDateStringMMA } from '../../utils/DateUtils';

// Suggested popular MMA fighters
const SUGGESTED_FIGHTERS: {name: string; id: number; country: string; logo: string; nickname?: string; weight?: string}[] = [
  { name: 'Jon Jones', id: 214, country: 'USA', logo: 'https://media-4.api-sports.io/mma/fighters/214.png', nickname: 'Bones', weight: 'Heavyweight' },
  { name: 'Islam Makhachev', id: 333, country: 'Russia', logo: 'https://media-4.api-sports.io/mma/fighters/333.png', weight: 'Lightweight' },
  { name: 'Alex Pereira', id: 2436, country: 'Brazil', logo: 'https://media-4.api-sports.io/mma/fighters/2436.png', nickname: 'Poatan', weight: 'Light Heavyweight' },
  { name: 'Leon Edwards', id: 165, country: 'Jamaica', logo: 'https://media-4.api-sports.io/mma/fighters/165.png', nickname: 'Rocky', weight: 'Welterweight' },
  { name: 'Sean O\'Malley', id: 479, country: 'USA', logo: 'https://media-4.api-sports.io/mma/fighters/479.png', nickname: 'Sugar', weight: 'Bantamweight' },
];

interface MMASearchContainerProps {
  onMatchesFound: (team: TeamResult, games: Game[], error: string | null, result: string | null) => void;
}

const MMASearchContainer: React.FC<MMASearchContainerProps> = ({ onMatchesFound }) => {
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
    decodeHtmlEntities,
    normalizeQuery,
    setTeams,
    setSelectedTeam,
    setUpcomingGames,
    setIsLoading,
    setError,
    setResult,
    setIsGenerating,
    setSearchQuery
  } = useSportSearch({ 
    sportId: 'mma', 
    sportName: 'MMA' 
  });

  // State for filtered suggested fighters (only those with valid logos)
  const [filteredSuggestedFighters, setFilteredSuggestedFighters] = useState<typeof SUGGESTED_FIGHTERS>([]);
  
  // Filter suggested fighters on component mount
  useEffect(() => {
    const filterFighters = async () => {
      const validFighters = await filterItemsWithValidLogos(SUGGESTED_FIGHTERS);
      setFilteredSuggestedFighters(validFighters);
    };
    
    filterFighters();
  }, []);

  // When matches are loaded or selected team changes, notify the parent component
  useEffect(() => {
    if (selectedTeam && upcomingGames.length > 0) {
      onMatchesFound(selectedTeam, upcomingGames, error, result);
    }
  }, [upcomingGames, selectedTeam, error, result, onMatchesFound]);

  // Function to calculate age from birth date
  const calculateAge = (birthDate: string): number | null => {
    if (!birthDate) return null;
    
    try {
      const dob = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age;
    } catch (e) {
      console.error("Error calculating age:", e);
      return null;
    }
  };

  // Function to try multiple search variations
  const tryMultipleSearches = async (originalQuery: string): Promise<any[]> => {
    const { baseUrl, apiKey } = getApiConfig();
    
    // Create an array of search variations to try
    const searchVariations = [
      originalQuery,                                // Original query
      originalQuery.replace(/['']/g, ''),          // Remove apostrophes
      originalQuery.replace(/['']/g, ' '),         // Replace apostrophes with spaces
      originalQuery.split(' ')[0],                 // First name only
    ];
    
    // Remove duplicates
    const uniqueVariations = [...new Set(searchVariations)];
    
    // Try each search variation sequentially until we get results
    for (const query of uniqueVariations) {
      console.log(`Trying search variation: "${query}"`);
      
      try {
        const response = await fetch(`${baseUrl}/fighters?search=${encodeURIComponent(query)}`, {
          headers: {
            "x-apisports-key": apiKey,
          }
        });
        
        if (!response.ok) {
          console.error(`Search variation "${query}" failed: ${response.status}`);
          continue;
        }
        
        const data = await response.json();
        
        if (data.response && Array.isArray(data.response) && data.response.length > 0) {
          console.log(`Found ${data.response.length} results with search variation: "${query}"`);
          return data.response;
        }
      } catch (err) {
        console.error(`Error with search variation "${query}":`, err);
      }
    }
    
    // If we reach here, no variation yielded results
    return [];
  };

  // Function to fetch fighters by search query
  const fetchFighters = async (query: string) => {
    setTeams([]);
    setSelectedTeam(null);
    setUpcomingGames([]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Try multiple search approaches
      const fightersResponse = await tryMultipleSearches(query);
      
      if (fightersResponse.length > 0) {
        // Convert fighter data to our TeamResult format
        const fighterResults: TeamResult[] = fightersResponse.map((fighter: any) => {
          // Handle country data which might be an object or string
          let countryStr = 'Unknown';
          if (fighter.country) {
            if (typeof fighter.country === 'object' && fighter.country.name) {
              countryStr = fighter.country.name;
            } else if (typeof fighter.country === 'string') {
              countryStr = fighter.country;
            }
          }

          // Calculate age from birth date if available
          const age = fighter.age || calculateAge(fighter.birth_date);
          
          // Decode HTML entities in the fighter's name and nickname
          const decodedName = decodeHtmlEntities(fighter.name);
          const decodedNickname = fighter.nickname ? decodeHtmlEntities(fighter.nickname) : null;
          
          return {
            id: fighter.id,
            name: decodedName,
            country: countryStr,
            logo: fighter.photo || fighter.image || fighter.logo || null,
            record: fighter.record || null,
            weightClass: fighter.category || fighter.weight?.class || null,
            height: fighter.height || null,
            reach: fighter.reach || null,
            age: age,
            nickname: decodedNickname,
            stance: fighter.stance || null,
            gender: fighter.gender || null
          };
        });
        
        // Filter out fighters with invalid logo URLs
        const fightersWithValidLogos = await filterItemsWithValidLogos(fighterResults);
        
        setTeams(fightersWithValidLogos);
        setResult(`Found ${fightersWithValidLogos.length} fighters for "${query}"`);
      } else {
        setResult(`No fighters found for "${query}"`);
      }
    } catch (err) {
      console.error('Error fetching fighters:', err);
      setError('Failed to load fighters. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch a single fighter ID by name
  const fetchFighterId = async (name: string): Promise<number | null> => {
    try {
      // Make sure to trim the name and remove any "vs" or "v" if they got included
      const cleanName = name.trim().replace(/\s*(?:v|vs|VS)\s*/i, '');
      
      // Try multiple search approaches
      const fightersResponse = await tryMultipleSearches(cleanName);
      
      if (fightersResponse.length > 0) {
        // Find the best match by comparing lowercase versions of names
        const searchNameLower = cleanName.toLowerCase();
        
        // Sort by similarity to the search term
        const sortedFighters = [...fightersResponse].sort((a, b) => {
          const aNameLower = a.name.toLowerCase();
          const bNameLower = b.name.toLowerCase();
          
          const aExactMatch = aNameLower === searchNameLower;
          const bExactMatch = bNameLower === searchNameLower;
          
          if (aExactMatch && !bExactMatch) return -1;
          if (!aExactMatch && bExactMatch) return 1;
          
          const aStartsWithSearch = aNameLower.startsWith(searchNameLower);
          const bStartsWithSearch = bNameLower.startsWith(searchNameLower);
          
          if (aStartsWithSearch && !bStartsWithSearch) return -1;
          if (!aStartsWithSearch && bStartsWithSearch) return 1;
          
          const aContainsSearch = aNameLower.includes(searchNameLower);
          const bContainsSearch = bNameLower.includes(searchNameLower);
          
          if (aContainsSearch && !bContainsSearch) return -1;
          if (!aContainsSearch && bContainsSearch) return 1;
          
          return 0;
        });
        
        return sortedFighters[0].id;
      } 
      
      console.error(`No fighter found for: ${cleanName}`);
      return null;
    } catch (err) {
      console.error(`Error fetching fighter ID for ${name}:`, err);
      return null;
    }
  };

  // Function to fetch head-to-head fights between two fighters
  const fetchHeadToHeadFights = async (fighterAId: number, fighterBId: number) => {
    setIsLoading(true);
    setError(null);
    setUpcomingGames([]);
    
    const { baseUrl, apiKey } = getApiConfig();
    
    try {
      // Use the appropriate endpoint for MMA head-to-head fights
      const endpoint = `${baseUrl}/fights?fighter=${fighterAId}&opponent=${fighterBId}&season=2025`;
      
      const response = await fetch(endpoint, {
        headers: {
          "x-apisports-key": apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch head-to-head fights');
      }
      
      const data = await response.json();
      console.log('H2H API response:', data);
      
      if (data.response && Array.isArray(data.response)) {
        // Convert fight data to our Game format
        const fights: Game[] = data.response
          .filter((fight: any) => {
            // Filter for upcoming fights only
            const fightDate = new Date(fight.date);
            const now = new Date();
            return fightDate > now;
          })
          .map((fight: any) => {
            // Parse date and format time
            const fightDate = new Date(fight.date);
            
            // Format date as MM/DD/YYYY
            const formattedDate = formatDateStringMMA(fightDate.toISOString().split('T')[0]);
            
            // Get fighter details
            const fighter1 = fight.fighters?.first || {};
            const fighter2 = fight.fighters?.second || {};
            
            // Decode fighter names
            const fighter1Name = decodeHtmlEntities(fighter1.name || 'Unknown Fighter');
            const fighter2Name = decodeHtmlEntities(fighter2.name || 'Unknown Fighter');
            
            return {
              id: fight.id,
              date: formattedDate,
              time: fightDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              timestamp: fight.timestamp || Math.floor(fightDate.getTime() / 1000),
              timezone: fight.timezone || "UTC",
              status: {
                long: fight.status?.long || 'Not Started',
                short: fight.status?.short || 'NS',
                elapsed: null
              },
              league: {
                id: 0,
                name: fight.category || 'MMA Event',
                country: 'International',
                logo: null,
                round: fight.is_main ? 'Main Event' : 'Undercard',
                season: new Date().getFullYear()
              },
              homeTeam: { // Using fighter1 as homeTeam
                id: fighter1.id || 0,
                name: fighter1Name,
                logo: fighter1.logo || null,
                winner: false
              },
              awayTeam: { // Using fighter2 as awayTeam
                id: fighter2.id || 0,
                name: fighter2Name,
                logo: fighter2.logo || null,
                winner: false
              },
              goals: { // Not relevant for MMA but needed for the interface
                home: 0,
                away: 0
              },
              scores: {
                halftime: {
                  home: null,
                  away: null
                },
                fulltime: {
                  home: 0,
                  away: 0
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
                name: 'Unknown Venue',
                city: 'Unknown City',
                capacity: null
              },
              referee: null,
              // MMA-specific data
              fight: {
                title: fight.title || false,
                titleName: fight.slug || null,
                method: null,
                methodType: null,
                roundEnd: null,
                timeEnd: null,
                totalRounds: 3,
                weight: {
                  class: fight.category || null,
                  pounds: null,
                  kilograms: null
                }
              },
              fighter1: {
                id: fighter1.id || 0,
                name: fighter1Name,
                image: fighter1.logo || null,
                record: null,
                roundsWon: 0
              },
              fighter2: {
                id: fighter2.id || 0,
                name: fighter2Name,
                image: fighter2.logo || null,
                record: null,
                roundsWon: 0
              }
            };
          });
        
        // Limit to 5 fights maximum
        const limitedFights = fights.slice(0, 5);
        
        setUpcomingGames(limitedFights);
        
        if (limitedFights.length > 0) {
          // Create a fake "team" for vs searches that combines both fighter names
          const vsTeam: TeamResult = {
            id: -1, // Use a special ID to indicate this is a vs search
            name: `${limitedFights[0].homeTeam.name} vs ${limitedFights[0].awayTeam.name}`,
            country: 'Multiple',
            logo: undefined // No logo for vs searches
          };
          setSelectedTeam(vsTeam);
          setResult(`Showing upcoming fights between the two fighters`);
        } else {
          setResult(`No upcoming fights found between these fighters`);
        }
      } else {
        setUpcomingGames([]);
        setResult(`No fights found between these fighters`);
      }
    } catch (err) {
      console.error('Error fetching head-to-head fights:', err);
      setError('Failed to load fights. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch upcoming fights for a selected fighter
  const fetchUpcomingFights = async (fighterId: number) => {
    setIsLoading(true);
    setError(null);
    
    const { baseUrl, apiKey } = getApiConfig();
    
    try {
      const endpoint = `${baseUrl}/fights?fighter=${fighterId}&season=2025`;
      
      console.log('Fetching upcoming fights from endpoint:', endpoint);
      
      const response = await fetch(endpoint, {
        headers: {
          "x-apisports-key": apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch upcoming fights: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Upcoming fights API response:', data);
      
      if (data.response && Array.isArray(data.response)) {
        // Get current date to filter for upcoming fights only
        const now = new Date();
        
        // Convert fight data to our Game format
        const fights: Game[] = data.response
          .filter((fight: any) => {
            // Filter for upcoming fights only
            const fightDate = new Date(fight.date);
            return fightDate > now;
          })
          .map((fight: any) => {
            // Parse date and format time
            const fightDate = new Date(fight.date);
            
            // Format date as MM/DD/YYYY
            const formattedDate = formatDateStringMMA(fightDate.toISOString().split('T')[0]);
            
            // Get fighter details
            const fighter1 = fight.fighters?.first || {};
            const fighter2 = fight.fighters?.second || {};
            
            // Decode fighter names
            const fighter1Name = decodeHtmlEntities(fighter1.name || 'Unknown Fighter');
            const fighter2Name = decodeHtmlEntities(fighter2.name || 'Unknown Fighter');
            
            return {
              id: fight.id,
              date: formattedDate,
              time: fightDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              timestamp: fight.timestamp || Math.floor(fightDate.getTime() / 1000),
              timezone: fight.timezone || "UTC",
              status: {
                long: fight.status?.long || 'Not Started',
                short: fight.status?.short || 'NS',
                elapsed: null
              },
              league: {
                id: 0,
                name: fight.category || 'MMA Event',
                country: 'International',
                logo: null,
                round: fight.is_main ? 'Main Event' : 'Undercard',
                season: new Date().getFullYear()
              },
              homeTeam: { // Using fighter1 as homeTeam
                id: fighter1.id || 0,
                name: fighter1Name,
                logo: fighter1.logo || null,
                winner: false
              },
              awayTeam: { // Using fighter2 as awayTeam
                id: fighter2.id || 0,
                name: fighter2Name,
                logo: fighter2.logo || null,
                winner: false
              },
              goals: { // Not relevant for MMA but needed for the interface
                home: 0,
                away: 0
              },
              scores: {
                halftime: {
                  home: null,
                  away: null
                },
                fulltime: {
                  home: 0,
                  away: 0
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
                name: 'Unknown Venue',
                city: 'Unknown City',
                capacity: null
              },
              referee: null,
              // MMA-specific data
              fight: {
                title: fight.title || false,
                titleName: fight.slug || null,
                method: null,
                methodType: null,
                roundEnd: null,
                timeEnd: null,
                totalRounds: 3,
                weight: {
                  class: fight.category || null,
                  pounds: null,
                  kilograms: null
                }
              },
              fighter1: {
                id: fighter1.id || 0,
                name: fighter1Name,
                image: fighter1.logo || null,
                record: null,
                roundsWon: 0
              },
              fighter2: {
                id: fighter2.id || 0,
                name: fighter2Name,
                image: fighter2.logo || null,
                record: null,
                roundsWon: 0
              }
            };
          });
        
        // Limit to 5 fights maximum
        const limitedFights = fights.slice(0, 5);
        
        setUpcomingGames(limitedFights);
        
        if (limitedFights.length > 0) {
          setResult(`Found ${limitedFights.length} upcoming fights for ${selectedTeam?.name}`);
        } else {
          setResult(`No upcoming fights found for ${selectedTeam?.name}`);
        }
      } else {
        setUpcomingGames([]);
        setResult(`No upcoming fights found for ${selectedTeam?.name}`);
      }
    } catch (err) {
      console.error('Error fetching upcoming fights:', err);
      setError('Failed to load upcoming fights. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for suggested fighter click
  const handleSuggestedFighterClick = (fighter: {name: string; id: number; country: string; logo: string; nickname?: string; weight?: string}) => {
    // Create a TeamResult object from the suggested fighter
    const fighterResult: TeamResult = {
      id: fighter.id,
      name: fighter.name,
      country: fighter.country,
      logo: fighter.logo,
      nickname: fighter.nickname,
      weightClass: fighter.weight
    };
    
    setSearchQuery(fighter.name); // Update the search box
    handleFighterSelect(fighterResult); // Process as if selected from search results
  };

  // Function to handle VS search
  const handleVsSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsGenerating(true);
    // Clear previous results
    setResult(null);
    setTeams([]);
    setSelectedTeam(null);
    setUpcomingGames([]);
    
    // Split the query and extract fighter names
    const fighterNames = searchQuery.split(/\s+(?:v|vs|VS)\s+/i).map(name => name.trim());
    
    // Ensure we have exactly two fighter names
    if (fighterNames.length === 2 && fighterNames[0] && fighterNames[1]) {
      const fighterA = fighterNames[0];
      const fighterB = fighterNames[1];
      
      try {
        const [fighterAId, fighterBId] = await Promise.all([
          fetchFighterId(fighterA),
          fetchFighterId(fighterB)
        ]);
        
        if (fighterAId && fighterBId) {
          // Fetch head-to-head fights
          await fetchHeadToHeadFights(fighterAId, fighterBId);
        } else {
          setError(`Could not find ${!fighterAId ? fighterA : ''} ${!fighterAId && !fighterBId ? 'or' : ''} ${!fighterBId ? fighterB : ''}. Please check your search query.`);
        }
      } catch (err) {
        console.error('Error in fighter vs fighter search:', err);
        setError('Failed to process fighter vs fighter search. Please try again.');
      }
    } else {
      setError('Invalid format. Please use: "Fighter A vs Fighter B"');
    }
    
    setIsGenerating(false);
  };

  // Handle VS search when detected
  useEffect(() => {
    if (isVsSearch && searchQuery.trim().length > 0) {
      handleVsSearch();
    }
  }, [isVsSearch, searchQuery]);

  // Modified to show the modal when a fighter is selected
  const handleFighterSelect = (fighter: TeamResult) => {
    setSelectedTeam(fighter);
    fetchUpcomingFights(fighter.id);
  };

  // Override the base search result selection to also fetch upcoming fights
  const handleSearchResultSelect = (fighter: TeamResult) => {
    // First call the base handler to update the UI state
    baseHandleSearchResultSelect(fighter);
    // Then fetch upcoming fights for the selected fighter
    fetchUpcomingFights(fighter.id);
  };

  // Helper function to get the most relevant fighter info for display
  const getFighterDisplayInfo = (fighter: TeamResult): string[] => {
    const details: string[] = [];
    
    // Only show nickname if available
    if (fighter.nickname) {
      details.push(`"${fighter.nickname}"`);
    }
    
    // Show weight class if available
    if (fighter.weightClass) {
      details.push(fighter.weightClass);
    }
    
    // Show record if available
    if (fighter.record) {
      details.push(`${fighter.record}`);
    }
    
    // If no details are available, add a default
    if (details.length === 0) details.push("MMA Fighter");
    
    return details;
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        <SearchBox 
          onQueryChange={handleQueryChange} 
          value={searchQuery}
          searchResults={searchResults}
          onSelectResult={handleSearchResultSelect}
          placeholder="Search for MMA fighters..."
        />
        
        {/* Suggested Fighters Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Popular Fighters</h3>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestedFighters.map((fighter) => (
              <button
                key={fighter.id}
                onClick={() => handleSuggestedFighterClick(fighter)}
                className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/80 hover:bg-dark-800 rounded-full border border-slate-700/40 
                        shadow-sm text-sm transition-all hover:shadow text-gray-300"
              >
                <div className="w-5 h-5 rounded-full bg-dark-850 flex items-center justify-center overflow-hidden">
                  <img src={fighter.logo} alt={fighter.name} className="w-5 h-5 object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-[10px] font-bold text-gray-400">F</span>';
                  }} />
                </div>
                <span>{fighter.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {isVsSearch && (
          <div className="px-4 py-2 bg-dark-800/60 border border-slate-700/40 rounded-lg">
            <p className="text-sm text-blue-400">
              <span className="font-medium">Fighter vs Fighter search detected!</span> We'll find upcoming fights between these fighters.
            </p>
          </div>
        )}
        
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
            
            {/* Fighter grid */}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {teams.map((fighter) => {
                const fighterDetails = getFighterDisplayInfo(fighter);
                return (
                  <div 
                    key={fighter.id} 
                    className="p-3 bg-dark-800/80 rounded-lg shadow-sm flex items-center gap-3 cursor-pointer transition-all hover:shadow-md hover:bg-dark-800 border border-slate-700/30"
                    onClick={() => handleFighterSelect(fighter)}
                  >
                    <div className="w-10 h-10 bg-dark-850 rounded-full flex items-center justify-center overflow-hidden border border-slate-700/40">
                      {fighter.logo ? (
                        <img src={fighter.logo} alt={fighter.name} className="w-10 h-10 object-cover" />
                      ) : (
                        <Dumbbell size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-gray-200">{fighter.name}</p>
                      <div className="flex flex-wrap gap-1 text-xs text-gray-400">
                        {fighterDetails.map((detail, index) => (
                          <span key={index} className="inline-flex items-center">
                            {index > 0 && <span className="mx-1 text-gray-500">•</span>}
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {result && result.includes("No upcoming fights found") && !isLoading && upcomingGames.length === 0 && (
          <div className="mt-4 p-6 bg-dark-800/60 border border-slate-700/40 rounded-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-dark-850 rounded-full flex items-center justify-center">
              <Dumbbell size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-300 font-medium">{result}</p>
            <p className="text-sm text-gray-400 mt-2">Try searching for another fighter or check back later.</p>
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

export default MMASearchContainer;