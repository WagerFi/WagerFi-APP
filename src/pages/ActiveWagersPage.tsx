import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle,
  Calendar,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Activity
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import { useWalletContext } from '../contexts/WalletContext';
import { getWagers, WagerFilter, isCryptoWager, isSportsWager, Wager, SportsWager, CryptoWager, settleSportsWager } from '../lib/wagers';

const ActiveWagersPage: React.FC = () => {
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
    key: 'created_at',
    direction: 'desc'
  });
  
  // Filter state
  const [wagerTypeFilter, setWagerTypeFilter] = useState<'all' | 'sports' | 'crypto'>('all');
  const [showActions, setShowActions] = useState<boolean>(false);
  
  // Settlement state
  const [isSettling, setIsSettling] = useState<boolean>(false);
  const [settlementError, setSettlementError] = useState<string | null>(null);
  const [selectedWager, setSelectedWager] = useState<Wager | null>(null);
  
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
  }, [wagers, wagerTypeFilter]);
  
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
      
      // Filter to only show the user's active wagers (open or matched/live)
      const userWagers = fetchedWagers.filter(wager => 
        (wager.creator_address === walletAddress || wager.opponent_address === walletAddress) &&
        (wager.status === 'open' || wager.status === 'matched' || wager.status === 'live')
      );
      
      setWagers(userWagers);
    } catch (err) {
      console.error('Error fetching user wagers:', err);
      setError('Failed to load your wagers. Please try again.');
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
        case 'expires_at':
          valueA = new Date(a.expires_at).getTime();
          valueB = new Date(b.expires_at).getTime();
          break;
        default:
          valueA = a.created_at;
          valueB = b.created_at;
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
    
    // Re-sort the wagers
    const sortedWagers = [...filteredWagers].sort((a, b) => {
      let valueA, valueB;
      
      // Handle different sort keys
      switch(key) {
        case 'amount':
          valueA = a.sol_amount;
          valueB = b.sol_amount;
          break;
        case 'created_at':
          valueA = new Date(a.created_at).getTime();
          valueB = new Date(b.created_at).getTime();
          break;
        case 'expires_at':
          valueA = new Date(a.expires_at).getTime();
          valueB = new Date(b.expires_at).getTime();
          break;
        default:
          valueA = a.created_at;
          valueB = b.created_at;
      }
      
      // Sort based on direction
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    setFilteredWagers(sortedWagers);
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
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Get time until expiration
  const getTimeUntilExpiration = (expiresAt: string): string => {
    const now = new Date();
    const expiration = new Date(expiresAt);
    
    const diffInMs = expiration.getTime() - now.getTime();
    if (diffInMs <= 0) return 'Expired';
    
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffInDays > 0) {
      return `${diffInDays}d ${diffInHours}h`;
    }
    
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    if (diffInHours > 0) {
      return `${diffInHours}h ${diffInMinutes}m`;
    }
    
    return `${diffInMinutes}m`;
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
  
  // Get wager status display
  const getWagerStatusDisplay = (wager: Wager): { label: string; bgColor: string; } => {
    if (wager.status === 'open') {
      return {
        label: 'Open',
        bgColor: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
      };
    } else if (
      (isCryptoWager(wager) && wager.status === 'matched') || 
      (isSportsWager(wager) && wager.status === 'live')
    ) {
      return {
        label: 'In Progress',
        bgColor: 'bg-blue-900/30 text-blue-400 border border-blue-700/30'
      };
    }
    
    return { 
      label: wager.status.charAt(0).toUpperCase() + wager.status.slice(1), 
      bgColor: 'bg-gray-800 text-gray-400' 
    };
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
  
  // Determine if user can settle a wager
  const canSettle = (wager: Wager): boolean => {
    if (!walletAddress) return false;
    
    // Only participants can settle
    const isParticipant = wager.creator_address === walletAddress || wager.opponent_address === walletAddress;
    if (!isParticipant) return false;
    
    // For sports wagers, must be in 'live' status
    if (isSportsWager(wager)) {
      return wager.status === 'live';
    }
    
    // For crypto wagers, must be in 'matched' status
    if (isCryptoWager(wager)) {
      return wager.status === 'matched';
    }
    
    return false;
  };
  
  // Handle wager settlement
  const handleSettleWager = async (wager: Wager) => {
    if (!walletAddress || !canSettle(wager)) return;
    
    setSelectedWager(wager);
    setIsSettling(true);
    setSettlementError(null);
    
    try {
      let success = false;
      
      // TODO: Implement settlement logic based on wager type
      if (isSportsWager(wager)) {
        // For sports wagers, we'd need to determine the winner based on the game result
        // This would typically come from an oracle or API call
        // For now, we'll just log a message
        console.log('Settlement for sports wagers would require game result data');
        alert('Settlement for sports wagers requires game result data from an oracle');
        success = false;
      } else if (isCryptoWager(wager)) {
        // For crypto wagers, we'd need to determine if the price target was met
        // This would typically come from an oracle or API call
        // For now, we'll just log a message
        console.log('Settlement for crypto wagers would require price data');
        alert('Settlement for crypto wagers requires price data from an oracle');
        success = false;
      }
      
      if (success) {
        // Refresh the wagers list after successful settlement
        await fetchUserWagers();
      }
    } catch (err) {
      console.error('Error settling wager:', err);
      setSettlementError('Failed to settle wager. Please try again.');
    } finally {
      setIsSettling(false);
      setSelectedWager(null);
    }
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
            <p className="text-gray-300 mb-6">Please connect your wallet to view your active wagers.</p>
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-100">Active Wagers</h1>
            
            <div className="flex items-center gap-3">
              {/* Type filter */}
              <div className="relative">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-300">
                  <Filter size={14} className="text-gray-400" />
                  <span>Type:</span>
                </div>
                <select 
                  value={wagerTypeFilter}
                  onChange={(e) => setWagerTypeFilter(e.target.value as any)}
                  className="mt-1 block w-full pl-3 pr-10 py-1.5 text-sm bg-dark-850 border border-slate-700/40 text-gray-200 
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
          
          {/* Settlement error message */}
          {settlementError && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
              <p className="text-red-400 text-sm">{settlementError}</p>
            </div>
          )}
          
          {/* Wagers Table */}
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl overflow-hidden">
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
                  <Activity size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">No active wagers</h3>
                <p className="text-gray-400 mb-4">You don't have any active wagers at the moment.</p>
                <button
                  onClick={() => navigate('/wagers?create=true')}
                  className="px-5 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-lg font-medium"
                >
                  Create a Wager
                </button>
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
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('status')}>
                          <span>Status</span>
                          {getSortIndicator('status')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('amount')}>
                          <span>Amount</span>
                          {getSortIndicator('amount')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('created_at')}>
                          <span>Created</span>
                          {getSortIndicator('created_at')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('expires_at')}>
                          <span>Expires</span>
                          {getSortIndicator('expires_at')}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span>Actions</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {filteredWagers.map((wager) => {
                      const wagerType = getWagerTypeDisplay(wager);
                      const wagerStatus = getWagerStatusDisplay(wager);
                      const description = getWagerDescription(wager);
                      const canSettleWager = canSettle(wager);
                      
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
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${wagerStatus.bgColor}`}>
                              {wagerStatus.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-bold text-white">{wager.sol_amount.toFixed(2)} SOL</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-gray-300">{formatDate(wager.created_at)}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-300">{formatDate(wager.expires_at)}</span>
                              <span className="text-xs text-gray-400">In {getTimeUntilExpiration(wager.expires_at)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {canSettleWager ? (
                                <button
                                  onClick={() => handleSettleWager(wager)}
                                  disabled={isSettling && selectedWager?.id === wager.id}
                                  className="inline-flex items-center px-3 py-1.5 bg-blue-900/20 hover:bg-blue-900/30 
                                           text-blue-400 text-xs font-medium rounded border border-blue-700/30 transition-colors"
                                >
                                  {isSettling && selectedWager?.id === wager.id ? (
                                    <>
                                      <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-1"></span>
                                      Settling...
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 size={14} className="mr-1" />
                                      Settle
                                    </>
                                  )}
                                </button>
                              ) : (
                                <button
                                  className="inline-flex items-center px-3 py-1.5 bg-dark-800 text-gray-400
                                           text-xs font-medium rounded border border-slate-700/40 cursor-not-allowed"
                                  disabled
                                >
                                  <XCircle size={14} className="mr-1" />
                                  No Action
                                </button>
                              )}
                            </div>
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

export default ActiveWagersPage;