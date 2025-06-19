import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle,
  Calendar,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  SearchX,
  FileText,
  Trophy,
  DollarSign,
  Wallet,
  Info,
  PieChart
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import { useWalletContext } from '../contexts/WalletContext';
import { getWagers, WagerFilter, isCryptoWager, isSportsWager, Wager } from '../lib/wagers';
import { formatDateString } from '../utils/DateUtils';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { connected, walletAddress, userProfile } = useWalletContext();
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State for wagers display
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [filteredWagers, setFilteredWagers] = useState<Wager[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'resolved_at',
    direction: 'desc'
  });
  
  // Filter state
  const [wagerTypeFilter, setWagerTypeFilter] = useState<'all' | 'sports' | 'crypto'>('all');
  const [resultFilter, setResultFilter] = useState<'all' | 'won' | 'lost'>('all');
  
  // Stats
  const [stats, setStats] = useState({
    totalSettled: 0,
    totalWon: 0,
    totalLost: 0,
    totalProfit: 0,
    cryptoWagers: 0,
    sportsWagers: 0,
    monthlyProfits: [] as {month: string, profit: number}[]
  });
  
  // Check if user is authenticated, if not redirect to homepage
  useEffect(() => {
    if (!connected || !walletAddress) {
      navigate('/');
    }
  }, [connected, walletAddress, navigate]);
  
  // Fetch user's wagers
  useEffect(() => {
    if (walletAddress) {
      fetchUserWagers();
    }
  }, [walletAddress]);
  
  // Apply filters whenever wagers or filter settings change
  useEffect(() => {
    applyFilters();
  }, [wagers, wagerTypeFilter, resultFilter]);
  
  // Calculate stats based on filtered wagers
  useEffect(() => {
    if (wagers.length > 0 && walletAddress) {
      const settledWagers = wagers.filter(wager => wager.status === 'settled');
      
      const wonWagers = settledWagers.filter(wager => wager.winner_address === walletAddress);
      const lostWagers = settledWagers.filter(wager => 
        wager.winner_address && wager.winner_address !== walletAddress
      );
      
      // Calculate profit (won wagers add, lost wagers subtract)
      const profit = wonWagers.reduce((sum, wager) => sum + wager.sol_amount, 0) -
                     lostWagers.reduce((sum, wager) => sum + wager.sol_amount, 0);
      
      // Count wager types
      const cryptoWagers = settledWagers.filter(wager => isCryptoWager(wager)).length;
      const sportsWagers = settledWagers.filter(wager => isSportsWager(wager)).length;
      
      // Calculate monthly profits
      const monthlyProfitMap = new Map<string, number>();
      
      settledWagers.forEach(wager => {
        if (!wager.resolved_at) return;
        
        const resolvedDate = new Date(wager.resolved_at);
        const monthKey = `${resolvedDate.getFullYear()}-${resolvedDate.getMonth() + 1}`;
        const displayMonth = resolvedDate.toLocaleString('default', { month: 'short' });
        const profitChange = wager.winner_address === walletAddress ? wager.sol_amount : -wager.sol_amount;
        
        if (monthlyProfitMap.has(monthKey)) {
          monthlyProfitMap.set(monthKey, monthlyProfitMap.get(monthKey)! + profitChange);
        } else {
          monthlyProfitMap.set(monthKey, profitChange);
        }
      });
      
      // Convert map to array and sort by date
      const monthlyProfits = Array.from(monthlyProfitMap.entries())
        .map(([key, value]) => {
          const [year, month] = key.split('-');
          const date = new Date(parseInt(year), parseInt(month) - 1, 1);
          return {
            month: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
            profit: value
          };
        })
        .sort((a, b) => {
          const dateA = new Date(a.month);
          const dateB = new Date(b.month);
          return dateA.getTime() - dateB.getTime();
        });
      
      setStats({
        totalSettled: settledWagers.length,
        totalWon: wonWagers.length,
        totalLost: lostWagers.length,
        totalProfit: profit,
        cryptoWagers,
        sportsWagers,
        monthlyProfits
      });
    }
  }, [wagers, walletAddress]);
  
  // Function to fetch user's wagers
  const fetchUserWagers = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const filterParams: WagerFilter = {
        sort: 'newest'
      };
      
      const fetchedWagers = await getWagers(filterParams);
      
      // Filter to only show the user's settled wagers
      const userWagers = fetchedWagers.filter(wager => 
        (wager.creator_address === walletAddress || wager.opponent_address === walletAddress) &&
        wager.status === 'settled'
      );
      
      setWagers(userWagers);
    } catch (err) {
      console.error('Error fetching user wagers history:', err);
      setError('Failed to load your wager history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apply filters and sorting
  const applyFilters = () => {
    let result = [...wagers];
    
    // Apply type filter
    if (wagerTypeFilter !== 'all') {
      result = result.filter(wager => {
        if (wagerTypeFilter === 'crypto') return isCryptoWager(wager);
        if (wagerTypeFilter === 'sports') return isSportsWager(wager);
        return true;
      });
    }
    
    // Apply result filter
    if (resultFilter !== 'all' && walletAddress) {
      result = result.filter(wager => {
        const userWon = wager.winner_address === walletAddress;
        
        if (resultFilter === 'won') return userWon;
        if (resultFilter === 'lost') return !userWon && wager.winner_address; // Ensure there is a winner (not a draw or invalid)
        return true;
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB;
      
      // Handle different sort keys
      switch(sortConfig.key) {
        case 'amount':
          valueA = a.sol_amount;
          valueB = b.sol_amount;
          break;
        case 'created_at':
          valueA = new Date(a.created_at).getTime();
          valueB = new Date(b.created_at).getTime();
          break;
        case 'resolved_at':
          valueA = a.resolved_at ? new Date(a.resolved_at).getTime() : 0;
          valueB = b.resolved_at ? new Date(b.resolved_at).getTime() : 0;
          break;
        default:
          valueA = a.resolved_at ? new Date(a.resolved_at).getTime() : 0;
          valueB = b.resolved_at ? new Date(b.resolved_at).getTime() : 0;
      }
      
      // Sort based on direction
      if (sortConfig.direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setFilteredWagers(result);
  };
  
  // Function to request sort
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    // Re-sort the wagers will happen in the useEffect for applyFilters
  };
  
  // Function to get sort indicator
  const getSortIndicator = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' 
        ? <ArrowUp size={14} /> 
        : <ArrowDown size={14} />;
    }
    return null;
  };
  
  // Format date for display
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Unknown';
    return formatDateString(dateString, 'MMM d, yyyy');
  };
  
  // Get wager type display
  const getWagerTypeDisplay = (wager: Wager): { label: string; bgColor: string; } => {
    if (isCryptoWager(wager)) {
      return { 
        label: 'Crypto', 
        bgColor: 'bg-blue-900/30 text-blue-400 border border-blue-700/30'
      };
    } else if (isSportsWager(wager)) {
      return { 
        label: 'Sports', 
        bgColor: 'bg-green-900/30 text-green-400 border border-green-700/30'
      };
    }
    return { label: 'Unknown', bgColor: 'bg-gray-800 text-gray-400' };
  };
  
  // Get wager description
  const getWagerDescription = (wager: Wager): string => {
    if (isCryptoWager(wager)) {
      return wager.description || `${wager.token_symbol} prediction`;
    } else if (isSportsWager(wager)) {
      const teamName = wager.creator_address === walletAddress 
        ? wager.creator_team_name || 'Your team'
        : wager.opponent_team_name || 'Your team';
        
      const vsTeamName = wager.creator_address === walletAddress
        ? wager.opponent_team_name || 'Opponent team'
        : wager.creator_team_name || 'Opponent team';
        
      return `${teamName} vs ${vsTeamName}`;
    }
    return 'Unknown wager';
  };
  
  // Get wager result (Win/Loss)
  const getWagerResult = (wager: Wager): { result: 'won' | 'lost' | 'unknown'; display: string; bgColor: string; } => {
    if (!walletAddress || wager.status !== 'settled' || !wager.winner_address) {
      return {
        result: 'unknown',
        display: 'Unknown',
        bgColor: 'bg-gray-800 text-gray-400'
      };
    }
    
    const isWinner = wager.winner_address === walletAddress;
    
    if (isWinner) {
      return {
        result: 'won',
        display: 'Won',
        bgColor: 'bg-green-900/30 text-green-400 border border-green-700/30'
      };
    } else {
      return {
        result: 'lost',
        display: 'Lost',
        bgColor: 'bg-red-900/30 text-red-400 border border-red-700/30'
      };
    }
  };
  
  // Get opponent name
  const getOpponentName = (wager: Wager): string => {
    const isCreator = wager.creator_address === walletAddress;
    
    if (isCreator) {
      return wager.opponent_profile?.username || 
        (wager.opponent_address ? `${wager.opponent_address.substring(0, 4)}...${wager.opponent_address.substring(wager.opponent_address.length - 4)}` : 'Unknown');
    } else {
      return wager.creator_profile?.username || 
        `${wager.creator_address.substring(0, 4)}...${wager.creator_address.substring(wager.creator_address.length - 4)}`;
    }
  };

  // Calculate win rate for chart
  const calculateWinRate = (): number => {
    if (stats.totalSettled === 0) return 0;
    return (stats.totalWon / stats.totalSettled) * 100;
  };

  // If not connected, show a message to connect wallet
  if (!connected || !walletAddress) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-gradient">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-8 text-center max-w-md">
            <AlertCircle size={48} className="mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Wallet Not Connected</h2>
            <p className="text-gray-300 mb-6">Please connect your wallet to view your wager history.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-5 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-lg font-medium"
            >
              Return to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Unified Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-600/15 to-primary-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-primary-600/10 to-secondary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Connecting lines/grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <Header />
      <DashboardSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={`flex-1 px-6 py-8 transition-all duration-300 ${isSidebarOpen ? 'ml-80 mt-[85px]' : 'ml-0 mt-[85px]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-100">Wager History</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Filters */}
              <div className="flex items-center gap-3">
                {/* Result filter */}
                <div className="relative">
                  <select 
                    value={resultFilter}
                    onChange={(e) => setResultFilter(e.target.value as any)}
                    className="block w-full pl-3 pr-10 py-1.5 text-sm bg-dark-850 border border-slate-700/40 text-gray-200 
                             focus:outline-none focus:ring-primary-600/50 focus:border-primary-600 rounded-md"
                  >
                    <option value="all">All Results</option>
                    <option value="won">Wins</option>
                    <option value="lost">Losses</option>
                  </select>
                </div>
                
                {/* Type filter */}
                <div className="relative">
                  <select 
                    value={wagerTypeFilter}
                    onChange={(e) => setWagerTypeFilter(e.target.value as any)}
                    className="block w-full pl-3 pr-10 py-1.5 text-sm bg-dark-850 border border-slate-700/40 text-gray-200 
                             focus:outline-none focus:ring-primary-600/50 focus:border-primary-600 rounded-md"
                  >
                    <option value="all">All Types</option>
                    <option value="crypto">Crypto</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>
                
                {/* Refresh button */}
                <button
                  onClick={fetchUserWagers}
                  className="flex items-center justify-center w-8 h-8 bg-dark-800/60 hover:bg-dark-800 border border-slate-700/40 
                           rounded-full text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label="Refresh"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Charts */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16 bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl mb-6">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : wagers.length === 0 ? (
            <div className="p-8 text-center bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl mb-6">
              <div className="w-16 h-16 bg-dark-850 rounded-full mx-auto flex items-center justify-center mb-4">
                <FileText size={24} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">No Wager History</h3>
              <p className="text-gray-400 mb-4">You don't have any settled wagers in your history yet.</p>
              <button
                onClick={() => navigate('/wagers')}
                className="px-5 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-lg font-medium"
              >
                Explore Wagers
              </button>
            </div>
          ) : (
            <>
              {/* First row with Win/Loss and Wager Types - REDUCED HEIGHT */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Win/Loss Ratio Chart */}
                <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-100 mb-3">Win/Loss Ratio</h3>
                  
                  <div className="flex items-center">
                    {/* Reduced size chart */}
                    <div className="w-28 h-28 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-22 h-22 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-dark-850 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{Math.round(calculateWinRate())}%</span>
                          </div>
                        </div>
                      </div>
                      <svg width="112" height="112" viewBox="0 0 112 112" className="transform -rotate-90">
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="50" 
                          fill="none" 
                          stroke="#3B3E51" 
                          strokeWidth="12"
                        />
                        {stats.totalSettled > 0 && (
                          <>
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="#4ADE80" 
                              strokeWidth="12"
                              strokeDasharray={`${(stats.totalWon / stats.totalSettled) * 314} 314`}
                            />
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="#F87171" 
                              strokeWidth="12"
                              strokeDasharray={`${(stats.totalLost / stats.totalSettled) * 314} 314`}
                              strokeDashoffset={`${-(stats.totalWon / stats.totalSettled) * 314}`}
                            />
                          </>
                        )}
                      </svg>
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-gray-300">Wins: {stats.totalWon}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-gray-300">Losses: {stats.totalLost}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <span className="text-gray-300">Total: {stats.totalSettled}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Wager Types Chart */}
                <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-100 mb-3">Wager Types</h3>
                  
                  <div className="flex items-center">
                    {/* Reduced size chart */}
                    <div className="w-28 h-28 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-22 h-22 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-dark-850 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{stats.totalSettled}</span>
                          </div>
                        </div>
                      </div>
                      <svg width="112" height="112" viewBox="0 0 112 112" className="transform -rotate-90">
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="50" 
                          fill="none" 
                          stroke="#3B3E51" 
                          strokeWidth="12"
                        />
                        {stats.totalSettled > 0 && (
                          <>
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="#8B5CF6" 
                              strokeWidth="12"
                              strokeDasharray={`${(stats.cryptoWagers / stats.totalSettled) * 314} 314`}
                            />
                            <circle 
                              cx="56" 
                              cy="56" 
                              r="50" 
                              fill="none" 
                              stroke="#3B82F6" 
                              strokeWidth="12"
                              strokeDasharray={`${(stats.sportsWagers / stats.totalSettled) * 314} 314`}
                              strokeDashoffset={`${-(stats.cryptoWagers / stats.totalSettled) * 314}`}
                            />
                          </>
                        )}
                      </svg>
                    </div>
                    
                    <div className="ml-6 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-gray-300">
                            Crypto: {stats.cryptoWagers} ({stats.totalSettled > 0 ? Math.round((stats.cryptoWagers / stats.totalSettled) * 100) : 0}%)
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-gray-300">
                            Sports: {stats.sportsWagers} ({stats.totalSettled > 0 ? Math.round((stats.sportsWagers / stats.totalSettled) * 100) : 0}%)
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <span className="text-gray-300">Total: {stats.totalSettled}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Second row with larger Profit Overview Chart */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <Wallet size={18} className="text-primary-400" />
                  Profit Overview
                </h3>
                
                <div className="flex flex-col items-center justify-center">
                  <div className={`text-4xl font-bold mb-8 ${stats.totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.totalProfit >= 0 ? '+' : ''}{stats.totalProfit.toFixed(2)} SOL
                  </div>
                  
                  {stats.monthlyProfits.length > 0 ? (
                    <div className="w-full h-60 flex items-end justify-between px-4">
                      {stats.monthlyProfits.map((month, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="text-xs text-gray-400 mb-1">
                            {month.profit > 0 ? '+' : ''}{month.profit.toFixed(1)}
                          </div>
                          <div 
                            className={`w-16 ${month.profit >= 0 ? 'bg-green-500' : 'bg-red-500'} rounded-t-lg`} 
                            style={{ 
                              height: `${Math.min(Math.abs(month.profit) * 8, 150)}px`,
                              minHeight: '10px'
                            }}
                          ></div>
                          <div className="text-xs text-gray-400 mt-2 rotate-0">
                            {month.month}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-60 flex items-center justify-center text-gray-400">
                      Not enough data to display monthly profits
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-400">Profit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-400">Loss</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Wagers History Table */}
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-700/40">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText size={18} className="text-gray-400" />
                Wager History
              </h3>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertCircle size={32} className="mx-auto mb-4 text-red-400" />
                <p className="text-red-400 mb-4">{error}</p>
                <button
                  onClick={fetchUserWagers}
                  className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-primary-400 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredWagers.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-dark-850 rounded-full mx-auto flex items-center justify-center mb-4">
                  <SearchX size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">No settled wagers found</h3>
                <p className="text-gray-400 mb-4">
                  {wagers.length > 0 
                    ? "No wagers match your current filter settings."
                    : "You don't have any settled wagers in your history yet."}
                </p>
                {wagers.length > 0 ? (
                  <button
                    onClick={() => {
                      setWagerTypeFilter('all');
                      setResultFilter('all');
                    }}
                    className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-primary-400 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/wagers?create=true')}
                    className="px-5 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-lg font-medium"
                  >
                    Create a Wager
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/40">
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <span>Type</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <span>Description</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('opponent')}>
                          <span>Opponent</span>
                          {getSortIndicator('opponent')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <span>Result</span>
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('amount')}>
                          <span>Amount</span>
                          {getSortIndicator('amount')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('resolved_at')}>
                          <span>Resolved</span>
                          {getSortIndicator('resolved_at')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span>P/L</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredWagers.map((wager) => {
                      const wagerType = getWagerTypeDisplay(wager);
                      const description = getWagerDescription(wager);
                      const result = getWagerResult(wager);
                      const opponentName = getOpponentName(wager);
                      const isWinner = result.result === 'won';
                      const profitLoss = isWinner ? wager.sol_amount : -wager.sol_amount;
                      
                      return (
                        <tr key={wager.id} className="hover:bg-dark-850/50 transition-colors">
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${wagerType.bgColor}`}>
                              {wagerType.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-200 truncate max-w-xs">
                                {description}
                              </span>
                              {isSportsWager(wager) && wager.event_date && (
                                <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                  <Calendar size={12} />
                                  {formatDate(wager.event_date)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-300">{opponentName}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${result.bgColor}`}>
                              {result.display}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-bold text-white">{wager.sol_amount.toFixed(2)} SOL</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Clock size={14} className="text-gray-500" />
                              <span className="text-sm text-gray-300">{formatDate(wager.resolved_at)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`text-sm font-bold ${isWinner ? 'text-green-400' : 'text-red-400'}`}>
                              {isWinner ? '+' : ''}{profitLoss.toFixed(2)} SOL
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HistoryPage;