import React, { useState } from 'react';
import CategoryTabs, { Category, CATEGORIES } from './CategoryTabs';
import SportSelector, { Sport, SPORTS } from './SportSelector';
import SoccerSearchContainer from './sports/SoccerSearchContainer';
import NBASearchContainer from './sports/NBASearchContainer';
import MLBSearchContainer from './sports/MLBSearchContainer';
import NFLSearchContainer from './sports/NFLSearchContainer';
import NHLSearchContainer from './sports/NHLSearchContainer';
import MMASearchContainer from './sports/MMASearchContainer';
import CryptoSearchContainer from './crypto/CryptoSearchContainer';
import SearchBox from './SearchBox';
import GenerateButton from './GenerateButton';
import { TeamResult, Game } from '../types/sports';

interface SearchContainerProps {
  setSelectedTeam?: (team: TeamResult | null) => void;
  setUpcomingGames?: (games: Game[]) => void;
  setError?: (error: string | null) => void;
  setResult?: (result: string | null) => void;
  closeSearchModal?: () => void;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ 
  setSelectedTeam, 
  setUpcomingGames, 
  setError, 
  setResult,
  closeSearchModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]); // Default to Sports
  const [selectedSport, setSelectedSport] = useState<Sport>(SPORTS[0]); // Default to Football (soccer)
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [localResult, setLocalResult] = useState<string | null>(null);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setLocalResult(null);
    setSearchQuery('');
  };

  const handleSportChange = (sport: Sport) => {
    setSelectedSport(sport);
    setLocalResult(null);
  };

  const handleQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleGenerate = async () => {
    if (!searchQuery.trim()) return;
    
    setIsGenerating(true);
    
    // For non-sports categories, just show a simple result
    if (selectedCategory.id !== 'sports') {
      setLocalResult(`Search results for "${searchQuery}" in ${selectedCategory.name}`);
    }
    
    setIsGenerating(false);
  };

  // Callback function for when matches are found in sport-specific containers
  const handleMatchesFound = (team: TeamResult, games: Game[], errorMsg: string | null, resultMsg: string | null) => {
    if (setSelectedTeam) setSelectedTeam(team);
    if (setUpcomingGames) setUpcomingGames(games);
    if (setError) setError(errorMsg);
    if (setResult) setResult(resultMsg);
    if (closeSearchModal) closeSearchModal();
  };

  // Render the appropriate sport-specific component based on the selected sport
  const renderSportComponent = () => {
    if (selectedCategory.id !== 'sports') {
      return null;
    }

    switch (selectedSport.id) {
      case 'soccer':
        return <SoccerSearchContainer onMatchesFound={handleMatchesFound} />;
      case 'basketball':
        return <NBASearchContainer onMatchesFound={handleMatchesFound} />;
      case 'baseball':
        return <MLBSearchContainer onMatchesFound={handleMatchesFound} />;
      case 'american-football':
        return <NFLSearchContainer onMatchesFound={handleMatchesFound} />;
      case 'hockey':
        return <NHLSearchContainer onMatchesFound={handleMatchesFound} />;
      case 'mma':
        return <MMASearchContainer onMatchesFound={handleMatchesFound} />;
      default:
        // For any other sport that doesn't have a dedicated component yet
        return (
          <div className="w-full">
            <div className="space-y-6">
              <SearchBox onQueryChange={handleQueryChange} value={searchQuery} />
              
              <div className="flex justify-center">
                <GenerateButton onClick={handleGenerate} isLoading={isGenerating} />
              </div>
              
              {localResult && (
                <div className="mt-8 p-4 bg-dark-800/60 border border-slate-700/40 rounded-lg">
                  <p className="text-gray-300 text-center">{localResult}</p>
                  
                  {/* Generic message for sports without dedicated components */}
                  <div className="mt-4 py-8 px-4 bg-dark-850 rounded-lg shadow-sm text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
                      {selectedSport.icon}
                    </div>
                    <p className="text-gray-400">
                      {selectedSport.name} search is not yet implemented. 
                      Please check back later or try one of the fully implemented sports.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-dark-800/40 backdrop-blur-lg border border-slate-700/40 rounded-2xl shadow-glow">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-100 p-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-primary-400">
          {selectedCategory.id === 'sports' ? 'Search for sports teams' : `${selectedCategory.name} Search`}
        </h2>
        
        <div className="space-y-6 px-6 pb-6">
          <CategoryTabs 
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
          
          {selectedCategory.id === 'sports' && (
            <SportSelector 
              selectedSport={selectedSport} 
              onSelectSport={handleSportChange} 
            />
          )}
          
          {selectedCategory.id === 'sports' ? (
            // Render sport-specific component
            renderSportComponent()
          ) : (
            // For non-sports categories (crypto, gaming, etc.)
            <div className="space-y-6">
              {selectedCategory.id === 'crypto' ? (
                // Use the crypto-specific component
                <CryptoSearchContainer closeSearchModal={closeSearchModal || (() => {})} />
              ) : (
                // Generic handling for other categories
                <>
                  <SearchBox onQueryChange={handleQueryChange} value={searchQuery} />
                  
                  <div className="flex justify-center">
                    <GenerateButton onClick={handleGenerate} isLoading={isGenerating} />
                  </div>
                  
                  {localResult && (
                    <div className="mt-8 p-4 bg-dark-800/60 border border-slate-700/40 rounded-lg">
                      <p className="text-gray-300 text-center">{localResult}</p>
                      
                      {/* Generic message for non-sports categories */}
                      <div className="mt-4 py-8 px-4 bg-dark-850 rounded-lg shadow-sm text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-dark-800 rounded-full flex items-center justify-center">
                          {selectedCategory.icon}
                        </div>
                        <p className="text-gray-400">
                          This is a placeholder for {selectedCategory.name} search results. 
                          Currently, only the Sports category has full functionality.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;