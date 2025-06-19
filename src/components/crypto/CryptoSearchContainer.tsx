import React, { useState, useEffect, useCallback } from 'react';
import { Bitcoin, Search, Dices, ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import CustomDropdown, { DropdownOption } from '../CustomDropdown';
import SearchBox from '../SearchBox';
import GenerateButton from '../GenerateButton';
import { useWalletContext } from '../../contexts/WalletContext';
import { createCryptoWager, TokenSnapshot, getCachedTokenList } from '../../lib/wagers';
import { formatDateString, convertToISOFormat } from '../../utils/DateUtils';
import { useNotificationHelpers } from '../../hooks/useNotificationHelpers';

interface CryptoSearchContainerProps {
  closeSearchModal: () => void;
}

// Suggested popular tokens
const SUGGESTED_TOKENS = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
  { id: 1027, name: 'Ethereum', symbol: 'ETH', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
  { id: 5426, name: 'Solana', symbol: 'SOL', logo: 'https://solana.com/src/img/branding/solanaLogoMark.svg' },
  { id: 52, name: 'XRP', symbol: 'XRP', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png' },
  { id: 2010, name: 'Cardano', symbol: 'ADA', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png' }
];

const CryptoSearchContainer: React.FC<CryptoSearchContainerProps> = ({ closeSearchModal }) => {
  const { connected, walletAddress } = useWalletContext();
  const { notifyWagerCreated } = useNotificationHelpers();
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown options for condition
  const conditionOptions: DropdownOption[] = [
    { value: '>=', label: 'Greater than or equal to (≥)' },
    { value: '<=', label: 'Less than or equal to (≤)' }
  ];

  // Dropdown options for wager type
  const wagerTypeOptions: DropdownOption[] = [
    { value: 'reach_target', label: 'Reach Target (resolves when price hits target)' },
    { value: 'price_at_deadline', label: 'Price at Deadline (resolves only at deadline)' }
  ];
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // State for token details modal
  const [selectedToken, setSelectedToken] = useState<any | null>(null);
  const [showTokenInfoModal, setShowTokenInfoModal] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<any | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  // For wager creation form
  const [showWagerForm, setShowWagerForm] = useState(false);
  const [deadline, setDeadline] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('23:59');
  const [amount, setAmount] = useState('0.1');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState('>=');
  const [wagerType, setWagerType] = useState('reach_target');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // For reserved wager functionality
  const [isReserved, setIsReserved] = useState(false);
  const [reservedAddress, setReservedAddress] = useState('');
  
  // For token search suggestions
  const [tokenList, setTokenList] = useState<any[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<any[]>([]);

  // Format a date to show with 23:59:59 time using proper ISO format
  const formatDeadlineWithTime = useCallback((dateString: string) => {
    if (!dateString) return '';
    
    // Get a formatted display date string
    return formatDateString(dateString);
  }, []);

  // Generate description based on form inputs
  const generateDescription = useCallback(() => {
    if (!selectedToken) return '';
    
    const symbol = selectedToken.symbol;
    const conditionText = condition === '>=' ? 'will reach' : 'will fall to';
    const priceFormatted = targetPrice ? `$${parseFloat(targetPrice).toLocaleString()}` : '$0';
    
    // Use formatDateString to ensure consistent date display
    const deadlineFormatted = deadline 
      ? `by ${formatDateString(deadline)}`
      : 'in the future';
    
    // Add wager type clarification
    const typeText = wagerType === 'reach_target' 
      ? ' (resolves when target is hit)'
      : ' (resolves at deadline only)';
    
    return `${symbol} ${conditionText} ${priceFormatted} ${deadlineFormatted}${typeText}`;
  }, [selectedToken, condition, targetPrice, deadline, wagerType]);

  // Load token list on component mount
  useEffect(() => {
    const loadTokenList = async () => {
      try {
        setIsLoading(true);
        
        // Use the cached function to get the token list
        const tokens = await getCachedTokenList();
        
        if (tokens && tokens.length > 0) {
          // Sort by CMC rank if available
          setTokenList(tokens);
        }
      } catch (err) {
        console.error('Error fetching token list:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTokenList();
  }, []);

  // Filter tokens as user types in the search box
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTokens([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = tokenList.filter(token => {
      return (
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
      );
    }).slice(0, 10); // Limit results
    
    setFilteredTokens(filtered);
  }, [searchQuery, tokenList]);

  // Set the current date as the default deadline
  useEffect(() => {
    const today = new Date();
    // Format as YYYY-MM-DD - Use local date components directly
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setDeadline(`${year}-${month}-${day}`);
  }, []);

  // Handle search query change
  const handleQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle search submission
  const handleGenerate = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    const cleanQuery = searchQuery.trim();
    
    // Try to find a token match first
    const tokenMatch = tokenList.find(token => 
      token.name.toLowerCase() === cleanQuery.toLowerCase() ||
      token.symbol.toLowerCase() === cleanQuery.toLowerCase()
    );
    
    if (tokenMatch) {
      setSelectedToken(tokenMatch);
      await fetchTokenDetails(tokenMatch.id);
      setShowWagerForm(true);
    } else {
      // No match found, show error
      setError('No token found matching your search. Please try another query or select from the suggestions.');
    }
    
    setIsGenerating(false);
  }, [searchQuery, tokenList]);

  // Fetch detailed token information
  const fetchTokenDetails = async (tokenId: number) => {
    const cmcApiKey = import.meta.env.VITE_CMC_API_KEY;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!cmcApiKey || !supabaseUrl || !supabaseAnonKey) {
      console.error('API keys not found');
      return;
    }
    
    try {
      setIsLoadingDetails(true);
      
      const response = await fetch(`${supabaseUrl}/functions/v1/token-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          apiKey: cmcApiKey,
          id: tokenId
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch token details: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.data && data.data[tokenId]) {
        setTokenDetails(data.data[tokenId]);
        
        // Pre-fill wager form with token details
        const token = data.data[tokenId];
        const currentPrice = token.quote?.USD?.price;
        
        if (currentPrice) {
          // Set target price to exactly the current price
          setTargetPrice(currentPrice.toString());
          
          // Set deadline to today's date (already set in useEffect)
          const today = new Date();
          setDeadline(today.toISOString().split('T')[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching token details:', err);
      setError('Failed to load token details. Please try again later.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handle suggested token selection
  const handleTokenSelect = async (token: any) => {
    setSearchQuery(token.name);
    setSelectedToken(token);
    await fetchTokenDetails(token.id);
    setShowWagerForm(true);
  };

  // Format currency with appropriate precision
  const formatCurrency = (value: number) => {
    if (value >= 1) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else if (value >= 0.01) {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
    } else {
      return `$${value.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
    }
  };

  // Get price change color class
  const getPriceChangeColorClass = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  // Handle wager creation submission
  const handleCreateWager = async () => {
    if (!connected || !walletAddress) {
      setError('Please connect your wallet to create a wager');
      return;
    }
    
    if (!selectedToken) {
      setError('Please select a token');
      return;
    }
    
    if (!targetPrice || parseFloat(targetPrice) <= 0) {
      setError('Please enter a valid target price');
      return;
    }
    
    if (!deadline) {
      setError('Please select a deadline');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid wager amount');
      return;
    }
    
    // Validate reserved address if the reservation checkbox is checked
    if (isReserved && !reservedAddress.trim()) {
      setError('Please enter a valid wallet address for reservation');
      return;
    }
    
    // Create deadline from date and time inputs
    if (!deadline || !deadlineTime) {
      setError('Please select both date and time for the deadline');
      return;
    }
    
    // Combine date and time into a local datetime, then convert to UTC for storage
    const deadlineDateTime = new Date(`${deadline}T${deadlineTime}:00`);
    
    if (deadlineDateTime <= new Date()) {
      setError('Deadline must be in the future');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Generate description using the actual deadline date that will be stored
      const descriptionWithCorrectDate = (() => {
        if (!selectedToken) return '';
        
        const symbol = selectedToken.symbol;
        const conditionText = condition === '>=' ? 'will reach' : 'will fall to';
        const priceFormatted = targetPrice ? `$${parseFloat(targetPrice).toLocaleString()}` : '$0';
        
        // Use the actual deadline date that will be stored, not the input value
        const deadlineFormatted = `by ${formatDateString(deadlineDateTime.toISOString())}`;
        
        // Add wager type clarification
        const typeText = wagerType === 'reach_target' 
          ? ' (resolves when target is hit)'
          : ' (resolves at deadline only)';
        
        return `${symbol} ${conditionText} ${priceFormatted} ${deadlineFormatted}${typeText}`;
      })();
      
      // Create a token snapshot from the selected token and details
      const tokenSnapshot: TokenSnapshot = {
        id: selectedToken.id,
        name: selectedToken.name,
        symbol: selectedToken.symbol,
        logo: selectedToken.symbol.toLowerCase() === 'sol' 
          ? 'https://solana.com/src/img/branding/solanaLogoMark.svg'
          : `https://s2.coinmarketcap.com/static/img/coins/64x64/${selectedToken.id}.png`,
        slug: selectedToken.slug || tokenDetails?.slug,
        current_price: tokenDetails?.quote?.USD?.price
      };
      
      const wagerData = {
        creator_address: walletAddress,
        token_id: selectedToken.id,
        sol_amount: parseFloat(amount),
        description: descriptionWithCorrectDate,
        creator_position: condition,
        expires_at: deadlineDateTime.toISOString(),
        reserved_address: isReserved ? reservedAddress.trim() : null,
        token_snapshot: tokenSnapshot, // Include the token snapshot
        target_price: parseFloat(targetPrice), // Add the target price
        wager_type: wagerType as 'reach_target' | 'price_at_deadline' // Add the wager type
      };
      
      const createdWager = await createCryptoWager(wagerData);
      
      if (!createdWager) {
        throw new Error('Failed to create wager');
      }
      
      setSuccess(true);
      
      // Close modal after a short delay
      setTimeout(() => {
        closeSearchModal();
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
      <div className="w-full">
        <div className="bg-dark-800/60 border border-green-700/30 rounded-lg p-6 text-center">
          <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Wager Created Successfully!</h3>
          <p className="text-gray-400 mb-6">Your wager has been created and is now open for others to take.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!showWagerForm ? (
        <div className="space-y-6">
          <SearchBox 
            onQueryChange={handleQueryChange} 
            value={searchQuery}
            searchResults={filteredTokens.map(token => ({
              id: token.id,
              name: token.name,
              country: token.symbol,
              logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`
            }))}
            onSelectResult={(result) => {
              const token = tokenList.find(t => t.id === result.id);
              if (token) {
                handleTokenSelect(token);
              }
            }}
            placeholder="Search for a cryptocurrency..."
          />
          
          {/* Suggested Tokens Section - Without prices */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Popular Tokens</h3>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TOKENS.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handleTokenSelect(token)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-dark-800/80 hover:bg-dark-800 rounded-full border border-slate-700/40 
                          shadow-sm text-sm transition-all hover:shadow text-gray-300"
                >
                  <img src={token.logo} alt={token.name} className="w-5 h-5 rounded-full" />
                  <span className="font-medium">{token.symbol}</span>
                </button>
              ))}
            </div>
          </div>
          
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
        </div>
      ) : (
        <div className="space-y-6">
          {/* Token Information */}
          {selectedToken && (
            <div className="bg-dark-800/60 p-4 rounded-lg border border-slate-700/40">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedToken.symbol.toLowerCase() === 'sol' 
                      ? 'https://solana.com/src/img/branding/solanaLogoMark.svg' 
                      : `https://s2.coinmarketcap.com/static/img/coins/64x64/${selectedToken.id}.png`} 
                    alt={selectedToken.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-xl text-gray-200">{selectedToken.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="bg-dark-850 px-2 py-0.5 rounded text-sm font-medium text-gray-300">{selectedToken.symbol}</span>
                      {tokenDetails?.cmc_rank && (
                        <span className="text-xs text-gray-400">Rank #{tokenDetails.cmc_rank}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setShowWagerForm(false);
                    setSelectedToken(null);
                    setTokenDetails(null);
                  }}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>
              
              {isLoadingDetails ? (
                <div className="flex justify-center p-4">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : tokenDetails ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tokenDetails.quote?.USD && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Current Price</p>
                      <p className="text-2xl font-bold text-gray-100">
                        {formatCurrency(tokenDetails.quote.USD.price)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getPriceChangeColorClass(tokenDetails.quote.USD.percent_change_24h)}`}>
                          {tokenDetails.quote.USD.percent_change_24h > 0 ? '↑' : '↓'} 
                          {Math.abs(tokenDetails.quote.USD.percent_change_24h).toFixed(2)}% (24h)
                        </span>
                        <span className={`text-sm ${getPriceChangeColorClass(tokenDetails.quote.USD.percent_change_7d)}`}>
                          {tokenDetails.quote.USD.percent_change_7d > 0 ? '↑' : '↓'} 
                          {Math.abs(tokenDetails.quote.USD.percent_change_7d).toFixed(2)}% (7d)
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Market Cap</p>
                    {tokenDetails.quote?.USD?.market_cap ? (
                      <p className="text-lg font-bold text-gray-200">
                        ${tokenDetails.quote.USD.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    ) : (
                      <p className="text-gray-400">Not available</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-400 py-2">Token details not available</p>
              )}
            </div>
          )}
          
          {/* Wager Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Create Your Wager</h3>
            
            <div className="space-y-3">
              {/* Dynamic Description Display */}
              {/* Resolution Type Selection - MOST IMPORTANT */}
              <div className="bg-primary-900/10 border border-primary-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                  <h4 className="font-semibold text-primary-300 text-sm uppercase tracking-wide">Most Important Choice</h4>
                </div>
                <CustomDropdown
                  options={wagerTypeOptions}
                  value={wagerType}
                  onChange={(value) => setWagerType(value)}
                  label="Resolution Type"
                />
                <div className="mt-2 p-3 bg-dark-900/40 border border-slate-700/30 rounded">
                  <p className="text-sm text-gray-300 font-medium">
                    {wagerType === 'reach_target' 
                      ? '⚡ Instant Settlement: Resolves immediately when target price is hit'
                      : '⏰ Deadline Only: Resolves only at deadline using exact price at that time'
                    }
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {wagerType === 'reach_target' 
                      ? 'Even if price changes later, wager is settled when target is first reached.'
                      : 'Price fluctuations during the period don\'t matter - only final price counts.'
                    }
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Wager Description
                </label>
                <div className="w-full px-3 py-3 bg-dark-900/60 border border-slate-700/40 rounded-md text-gray-200 min-h-[70px]">
                  <p className="font-medium">{generateDescription()}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Description is automatically generated based on your selections below
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Target Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-400">$</span>
                    </div>
                    <input
                      type="number"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(e.target.value)}
                      className="w-full h-12 pl-8 pr-3 py-3 bg-dark-900/60 border border-slate-700/40 rounded-md text-gray-200 
                               focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 focus:outline-none"
                      placeholder="0.00"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
                
                <div>
                  <CustomDropdown
                    options={conditionOptions}
                    value={condition}
                    onChange={(value) => setCondition(value)}
                    label="Condition"
                  />
                </div>
              </div>
              
              {/* Deadline Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wager Duration
                </label>
                
                {/* Quick Duration Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {[
                    { label: '1 Hour', hours: 1 },
                    { label: '4 Hours', hours: 4 },
                    { label: '12 Hours', hours: 12 },
                    { label: '24 Hours', hours: 24 },
                    { label: '3 Days', hours: 72 },
                    { label: '1 Week', hours: 168 },
                    { label: '1 Month', hours: 720 },
                    { label: 'Custom', hours: 0 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        if (preset.hours > 0) {
                          const now = new Date();
                          const futureDate = new Date(now.getTime() + preset.hours * 60 * 60 * 1000);
                          setDeadline(futureDate.toISOString().split('T')[0]);
                          setDeadlineTime(futureDate.toTimeString().slice(0, 5));
                        }
                      }}
                      className={`px-2 py-1 text-xs rounded border transition-colors ${
                        preset.hours === 0 
                          ? 'bg-dark-800/60 border-slate-700/40 text-gray-400'
                          : 'bg-primary-900/20 border-primary-700/30 text-primary-300 hover:bg-primary-800/30'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 bg-dark-900/60 border border-slate-700/40 rounded-md text-gray-200 
                             focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 focus:outline-none"
                  />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Time</label>
                    <input
                      type="time"
                      value={deadlineTime}
                      onChange={(e) => setDeadlineTime(e.target.value)}
                      className="w-full px-3 py-2 bg-dark-900/60 border border-slate-700/40 rounded-md text-gray-200 
                               focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 focus:outline-none"
                    />
                  </div>
                </div>
                
                {deadline && deadlineTime && (
                  <p className="text-xs text-gray-400 mt-2">
                    Expires: {new Date(`${deadline}T${deadlineTime}`).toLocaleString()} (your local time)
                  </p>
                )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Wager Amount (SOL)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-3 pr-12 py-2 bg-dark-900/60 border border-slate-700/40 rounded-md text-gray-200 
                               focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 focus:outline-none"
                      placeholder="0.00"
                      min="0.01"
                      step="0.01"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-400 sm:text-sm">SOL</span>
                  </div>
                </div>
              </div>
              
              {/* Reserve for specific wallet address */}
              <div>
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
                    <input
                      type="text"
                      value={reservedAddress}
                      onChange={(e) => setReservedAddress(e.target.value)}
                      placeholder="Enter wallet address"
                      className="w-full px-3 py-2 bg-dark-900/60 border border-slate-700/40 rounded-md text-gray-200 
                               focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 focus:outline-none
                               placeholder-gray-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Only this address will be able to accept your wager
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Wager Summary */}
            <div className="bg-secondary-900/10 border border-secondary-700/20 rounded-lg p-4 my-4">
              <h4 className="font-medium text-secondary-400 mb-2">Wager Summary</h4>
              <p className="text-sm text-gray-300 mb-2">
                {selectedToken?.name} ({selectedToken?.symbol}) will {condition === '>=' ? 'reach or exceed' : 'drop to or below'} ${targetPrice} by {deadline ? formatDateString(deadline) : 'the deadline'}
              </p>
              <div className="bg-dark-900/40 border border-slate-700/30 rounded p-2 mb-2">
                <p className="text-xs text-gray-400">
                  <span className="font-medium text-primary-400">Resolution:</span> {' '}
                  {wagerType === 'reach_target' 
                    ? 'Resolves immediately when target price is hit'
                    : 'Resolves only at deadline using price at that exact time'
                  }
                </p>
              </div>
              
              {tokenDetails?.quote?.USD?.price && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Current price:</span>
                  <span className="font-bold text-gray-200">{formatCurrency(tokenDetails.quote.USD.price)}</span>
                  
                  {targetPrice && (
                    <>
                      <span className="text-gray-500">→</span>
                      <span className="font-bold text-gray-200">${parseFloat(targetPrice).toLocaleString()}</span>
                      <span className={`${condition === '>=' ? 'text-green-400' : 'text-red-400'} font-medium`}>
                        ({condition === '>=' ? '+' : ''}
                        {Math.round((parseFloat(targetPrice) / tokenDetails.quote.USD.price - 1) * 100)}%)
                      </span>
                    </>
                  )}
                </div>
              )}
              
              {isReserved && reservedAddress && (
                <div className="mt-2 flex items-start gap-2 bg-primary-900/10 p-2 rounded border border-primary-700/20">
                  <Info size={16} className="text-primary-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-primary-400 font-medium">Reserved for specific address</p>
                    <p className="text-xs text-gray-400 break-all">{reservedAddress}</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button 
                onClick={() => {
                  setShowWagerForm(false);
                  setSelectedToken(null);
                  setTokenDetails(null);
                }}
                className="px-4 py-2 bg-dark-800/60 hover:bg-dark-800 border border-slate-700/40 rounded-lg text-gray-300 font-medium transition-colors"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button 
                onClick={handleCreateWager}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-medium rounded-lg shadow hover:shadow-glow transition-all flex items-center gap-2"
                disabled={!targetPrice || !deadline || !deadlineTime || isSubmitting || !connected || (isReserved && !reservedAddress)}
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
      )}
    </div>
  );
};

export default CryptoSearchContainer;