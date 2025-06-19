import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle,
  BarChart3,
  TrendingUp,
  Clock,
  Calendar,
  Tag,
  User,
  Edit,
  Star
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import { useWalletContext } from '../contexts/WalletContext';
import { useProfile } from '../contexts/ProfileContext';
import { getWagers, WagerFilter, isCryptoWager, isSportsWager, Wager } from '../lib/wagers';
import { getDisplayUsername } from '../lib/chat';
import { DEFAULT_USER_IMAGE, FALLBACK_USER_IMAGE } from '../utils/constants';
import { useNotificationHelpers } from '../hooks/useNotificationHelpers';

const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { connected, walletAddress, userProfile, updateProfile, balance } = useWalletContext();
  const { openProfile } = useProfile();
  const { notifyAddressCopied } = useNotificationHelpers();
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State for wagers display
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Stats calculation
  const [stats, setStats] = useState({
    totalWagers: 0,
    totalWagered: 0,
    winRate: 0,
    netProfit: 0,
    usdValue: 0
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
  
  // Calculate stats based on wagers
  useEffect(() => {
    if (wagers.length > 0 && userProfile) {
      // Calculate total wagered
      const totalWagered = wagers.reduce((sum, wager) => sum + wager.sol_amount, 0);
      
      // Calculate win rate
      const totalGames = userProfile.wins + userProfile.losses;
      const winRate = totalGames > 0 ? (userProfile.wins / totalGames) * 100 : 0;
      
      // USD conversion (assuming $180 per SOL)
      const solPrice = 180;
      
      setStats({
        totalWagers: wagers.length,
        totalWagered: totalWagered,
        winRate: winRate,
        netProfit: userProfile.profit_amount,
        usdValue: balance ? balance * solPrice : 0
      });
    }
  }, [wagers, userProfile, balance]);
  
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
      
      // Filter to only show the user's wagers
      const userWagers = fetchedWagers.filter(wager => 
        wager.creator_address === walletAddress || 
        wager.opponent_address === walletAddress
      );
      
      setWagers(userWagers);
    } catch (err) {
      console.error('Error fetching user wagers:', err);
      setError('Failed to load your wagers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate win rate
  const calculateWinRate = (): string => {
    if (!userProfile) return '0%';
    
    const totalGames = userProfile.wins + userProfile.losses;
    if (totalGames === 0) return '0%';
    
    const winRate = (userProfile.wins / totalGames) * 100;
    return `${winRate.toFixed(1)}%`;
  };
  
  // Get wager status display
  const getWagerStatus = (wager: Wager): { text: string; color: string } => {
    if (wager.status === 'settled') {
      const isWinner = wager.winner_address === walletAddress;
      return {
        text: isWinner ? 'Won' : 'Lost',
        color: isWinner ? 'text-green-400' : 'text-red-400'
      };
    } else if (wager.status === 'open' || (isCryptoWager(wager) && wager.status === 'matched') || (isSportsWager(wager) && wager.status === 'live')) {
      return {
        text: wager.status === 'open' ? 'Open' : 'In Progress',
        color: wager.status === 'open' ? 'text-yellow-400' : 'text-blue-400'
      };
    } else {
      return {
        text: 'Cancelled',
        color: 'text-gray-400'
      };
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // If not connected, show a message to connect wallet
  if (!connected || !walletAddress) {
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
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-8 text-center max-w-md">
            <AlertCircle size={48} className="mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Wallet Not Connected</h2>
            <p className="text-gray-300 mb-6">Please connect your wallet to view your dashboard.</p>
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
      
      <main className={`flex-1 px-6 py-8 transition-all duration-300 ${isSidebarOpen ? 'ml-64 mt-[85px]' : 'ml-0 mt-[85px]'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Account Overview</h1>
          </div>
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Wagers Card */}
            <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-gray-400 font-medium mb-1">Total Wagers</h3>
                  <p className="text-3xl font-bold text-white">{wagers.length}</p>
                  <p className="text-xs text-gray-400 mt-1">Lifetime total</p>
                </div>
                <div className="bg-blue-900/20 p-2 rounded-lg">
                  <BarChart3 size={20} className="text-blue-400" />
                </div>
              </div>
            </div>
            
            {/* Total Wagered Card */}
            <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-gray-400 font-medium mb-1">Total Wagered</h3>
                  <p className="text-3xl font-bold text-white">{stats.totalWagered.toFixed(2)} SOL</p>
                  <p className="text-xs text-gray-400 mt-1">≈ ${(stats.totalWagered * 180).toFixed(2)}</p>
                </div>
                <div className="bg-green-900/20 p-2 rounded-lg">
                  <Tag size={20} className="text-green-400" />
                </div>
              </div>
            </div>
            
            {/* Win Rate Card */}
            <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-gray-400 font-medium mb-1">Win Rate</h3>
                  <p className="text-3xl font-bold text-white">{calculateWinRate()}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {userProfile?.wins || 0} wins / {userProfile ? (userProfile.wins + userProfile.losses) : 0} settled
                  </p>
                </div>
                <div className="bg-blue-900/20 p-2 rounded-lg">
                  <TrendingUp size={20} className="text-blue-400" />
                </div>
              </div>
            </div>
            
            {/* Net Profit Card */}
            <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-gray-400 font-medium mb-1">Net Profit</h3>
                  <p className={`text-3xl font-bold ${userProfile?.profit_amount && userProfile.profit_amount < 0 ? 'text-red-400' : 'text-white'}`}>
                    {userProfile?.profit_amount && userProfile.profit_amount < 0 ? '-' : ''}{Math.abs(userProfile?.profit_amount || 0).toFixed(2)} SOL
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    ≈ ${Math.abs((userProfile?.profit_amount || 0) * 180).toFixed(2)}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${userProfile?.profit_amount && userProfile.profit_amount < 0 ? 'bg-red-900/20' : 'bg-green-900/20'}`}>
                  <span className={`text-xl ${userProfile?.profit_amount && userProfile.profit_amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    $
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile & Wallet Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Profile Card - Spans 3 columns on large screens */}
            <div className="lg:col-span-3 bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-full bg-dark-850 border-2 border-primary-500 overflow-hidden">
                    {userProfile?.profile_image_url ? (
                      <img 
                        src={userProfile.profile_image_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_USER_IMAGE;
                          (e.target as HTMLImageElement).onerror = () => {
                            (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                          };
                        }}
                      />
                    ) : (
                      <img 
                        src={DEFAULT_USER_IMAGE} 
                        alt="WagerFi Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                        }}
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">{getDisplayUsername(userProfile?.username, walletAddress)}</h2>
                      <div className="flex items-center text-xs text-gray-400">
                        <span>{walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 4)}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(walletAddress);
                            notifyAddressCopied();
                          }}
                          className="ml-2 text-primary-400 hover:text-primary-300 transition-colors"
                          title="Copy address"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="12" 
                            height="12" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button 
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                      onClick={() => openProfile(userProfile)}
                    >
                      <div className="flex items-center gap-1">
                        <Edit size={14} />
                        <span className="text-xs font-medium">Edit Profile</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-center mt-3 gap-x-6 gap-y-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-xs text-gray-400">Account age: 3 days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-400 mr-2">Rank:</span>
                        <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium">
                          Top 6%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400 mr-1">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Wallet Balance Card - Spans 1 column on large screens */}
            <div className="lg:col-span-1 bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-5">
              <h3 className="text-base font-bold text-white mb-4">Wallet Balance</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Current Balance:</p>
                  <p className="text-2xl font-bold text-primary-400">{balance?.toFixed(3) || '0.000'} SOL</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">USD Value:</p>
                  <p className="text-base font-medium text-white">${stats.usdValue.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">Network:</p>
                  <p className="text-sm font-medium text-white">Solana Devnet</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-slate-700/40 flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Recent Activity</h3>
              <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors text-xs flex items-center gap-1">
                View All
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : wagers.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 mb-4">No activity yet</p>
                <button 
                  onClick={() => navigate('/wagers?create=true')}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-colors"
                >
                  Create Your First Wager
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-700/40">
                {wagers.slice(0, 5).map(wager => {
                  const status = getWagerStatus(wager);
                  const wagerType = isCryptoWager(wager) ? 'Crypto' : 'Sports';
                  
                  return (
                    <div key={wager.id} className="p-3 hover:bg-dark-850/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-1.5 py-0.5 bg-dark-850 rounded-md text-gray-400">
                              {wagerType}
                            </span>
                            <h4 className="text-sm font-medium text-gray-200">
                              {isCryptoWager(wager) 
                                ? `${wager.token_snapshot?.name || wager.token_symbol || 'Crypto'} Prediction` 
                                : `${wager.creator_team_name || ''} vs ${wager.opponent_team_name || ''}`}
                            </h4>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(wager.created_at)}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-medium ${status.color}`}>{status.text}</span>
                          <span className="text-base font-bold text-white">{wager.sol_amount.toFixed(2)} SOL</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboardPage;