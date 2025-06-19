import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { TeamResult } from '../types/sports';

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
  value: string;
  searchResults?: TeamResult[];
  onSelectResult?: (result: TeamResult) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  onQueryChange, 
  value, 
  searchResults = [],
  onSelectResult,
  placeholder = "Enter your search query..."
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  // Handle result selection
  const handleResultClick = (result: TeamResult) => {
    if (onSelectResult) {
      onSelectResult(result);
      setShowDropdown(false);
    }
  };

  // Handle focus and blur events
  const handleFocus = () => {
    if (searchResults && searchResults.length > 0) {
      setShowDropdown(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show dropdown when search results change
  useEffect(() => {
    if (searchResults && searchResults.length > 0 && document.activeElement === inputRef.current) {
      setShowDropdown(true);
    } else if (searchResults && searchResults.length === 0) {
      setShowDropdown(false);
    }
  }, [searchResults]);

  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-gray-500" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 
                   shadow-sm focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600/50 focus:outline-none 
                   transition-all duration-200 text-gray-200 placeholder-gray-500"
          aria-label="Search query"
        />
      </div>

      {/* Search results dropdown */}
      {showDropdown && searchResults && searchResults.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-20 w-full mt-2 py-2 bg-dark-850 rounded-lg shadow-lg border border-slate-700/60 max-h-80 overflow-y-auto"
        >
          <div className="px-3 py-1.5 border-b border-slate-700/60">
            <p className="text-xs font-medium text-gray-400">Search results</p>
          </div>
          {searchResults.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-dark-800/80 transition-colors text-left"
            >
              <div className="w-8 h-8 bg-dark-800 rounded-full flex items-center justify-center overflow-hidden">
                {result.logo ? (
                  <img 
                    src={result.logo} 
                    alt={result.name} 
                    className="w-8 h-8 object-contain" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = 
                        '<span class="text-xs font-bold">T</span>';
                    }}
                  />
                ) : (
                  <span className="text-xs font-bold">T</span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-200">{result.name}</p>
                <p className="text-xs text-gray-400">{result.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;