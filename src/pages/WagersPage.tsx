import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Zap, Filter, Calendar, ChevronDown, TrendingUp, Tag, AlertCircle, X, RefreshCw, User, Clock, Lock, Scale, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchContainer from '../components/SearchContainer';
import MatchesModal from '../components/MatchesModal';
import WagerModal from '../components/WagerModal';
import WagerConfirmationModal from '../components/WagerConfirmationModal';
import CryptoWagerConfirmationModal from '../components/CryptoWagerConfirmationModal';
import ShareWagerModal from '../components/ShareWagerModal';
import { TeamResult, Game } from '../types/sports';
import { getWagers, Wager, WagerFilter, isCryptoWager, isSportsWager, acceptWager, cancelWager, SportsWager, CryptoWager } from '../lib/wagers';
import { useWalletContext } from '../contexts/WalletContext';
import LeaderboardModal from '../components/LeaderboardModal';
import WagerCard from '../components/WagerCard';
import { formatDateString, formatTimeString } from '../utils/DateUtils';
import UpcomingGamesPanel from '../components/UpcomingGamesPanel';
import { useNotificationHelpers } from '../hooks/useNotificationHelpers';
import { supabase } from '../lib/supabase';
import CustomDropdown, { DropdownOption } from '../components/CustomDropdown';
import { getTodayDate } from '../lib/dailyGames';

const WagersPage: React.FC = () => {
  const { connected, walletAddress } = useWalletContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [filter, setFilter] = useState<WagerFilter>({ type: 'all', status: 'all', sort: 'newest' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for loading wagers
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [filteredWagers, setFilteredWagers] = useState<Wager[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'live' | 'settled'>('all');
  
  // State variables to manage the team selection and match display flow
  const [selectedTeam, setSelectedTeam] = useState<TeamResult | null>(null);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showWagerModal, setShowWagerModal] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [cancellingWagerId, setCancellingWagerId] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // State for wager confirmation modals
  const [wagerToConfirm, setWagerToConfirm] = useState<SportsWager | null>(null);
  const [cryptoWagerToConfirm, setCryptoWagerToConfirm] = useState<CryptoWager | null>(null);

  // State for crypto reserved wager tooltip
  const [showCryptoReservedTooltip, setShowCryptoReservedTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
  // State for share wager modal
  const [wagerToShare, setWagerToShare] = useState<SportsWager | CryptoWager | null>(null);

  const { notifyWagerAccepted, createLocalNotification } = useNotificationHelpers();

  // Dropdown options
  const statusOptions: DropdownOption[] = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: '🟢 Open' },
    { value: 'live', label: '🔵 Live' },
    { value: 'settled', label: '🟣 Settled' }
  ];

  const sortOptions: DropdownOption[] = [
    { value: 'newest', label: '⏰ Newest First' },
    { value: 'oldest', label: '📅 Oldest First' },
    { value: 'amount', label: '💰 Highest Amount' }
  ];

  const typeOptions: DropdownOption[] = [
    { value: 'all', label: 'All Types' },
    { value: 'crypto', label: '🪙 Crypto Predictions' },
    { value: 'sports', label: '🏆 Sports Wagers' }
  ];


  // Fetch wagers on mount and when filters change
  useEffect(() => {
    fetchWagers();
  }, [filter, statusFilter, filter.sort]);

  // Check for create query parameter and open modal automatically
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('create') === 'true') {
      // Remove the query parameter from URL
      navigate('/wagers', { replace: true });
      // Open the create wager modal
      if (connected) {
        openSearchModal();
      }
    }
  }, [location.search, connected, navigate]);

  // Function to fetch wagers with current filters
  const fetchWagers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const filterParams: WagerFilter = {
        type: filter.type === 'all' ? undefined : filter.type,
        status: statusFilter === 'all' ? undefined : statusFilter,
        sort: filter.sort
      };

      const fetchedWagers = await getWagers(filterParams);
      setWagers(fetchedWagers);
      setFilteredWagers(fetchedWagers);
    } catch (err) {
      console.error('Error fetching wagers:', err);
      setError('Failed to load wagers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time subscription for wager updates
  useEffect(() => {
    if (!connected || !walletAddress) return;

    console.log('Setting up real-time wager subscriptions for user:', walletAddress);

    // Helper function to fetch complete wager data with profiles
    const fetchCompleteWagerData = async (wagerId: string, type: 'sports' | 'crypto') => {
      try {
        const table = type === 'sports' ? 'sports_wagers' : 'crypto_wagers';
        const { data, error } = await supabase
          .from(table)
          .select(`
            *,
            creator_profile:users!${table}_creator_address_fkey(wallet_address, username, profile_image_url),
            opponent_profile:users!${table}_opponent_address_fkey(wallet_address, username, profile_image_url)
          `)
          .eq('id', wagerId)
          .single();

        if (error) {
          console.error(`Error fetching ${type} wager:`, error);
          return null;
        }

        return data;
      } catch (err) {
        console.error(`Error fetching complete wager data:`, err);
        return null;
      }
    };

    // Subscribe to sports wagers changes
    const sportsWagersSubscription = supabase
      .channel('sports_wagers_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'sports_wagers'
        },
        async (payload) => {
          console.log('New sports wager created:', payload);
          // Fetch complete wager data with profiles
          const completeWager = await fetchCompleteWagerData(payload.new.id, 'sports');
          if (completeWager) {
            setWagers(prev => [completeWager, ...prev]);
            setFilteredWagers(prev => [completeWager, ...prev]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sports_wagers'
        },
        async (payload) => {
          console.log('Sports wager updated:', payload);
          // Fetch complete wager data with profiles
          const completeWager = await fetchCompleteWagerData(payload.new.id, 'sports');
          if (completeWager) {
            setWagers(prev => prev.map(w => w.id === completeWager.id ? completeWager : w));
            setFilteredWagers(prev => prev.map(w => w.id === completeWager.id ? completeWager : w));
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'sports_wagers'
        },
        (payload) => {
          console.log('Sports wager deleted:', payload);
          // Remove the wager from the list
          const deletedWagerId = payload.old.id;
          setWagers(prev => prev.filter(w => w.id !== deletedWagerId));
          setFilteredWagers(prev => prev.filter(w => w.id !== deletedWagerId));
        }
      )
      .subscribe();

    // Subscribe to crypto wagers changes
    const cryptoWagersSubscription = supabase
      .channel('crypto_wagers_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'crypto_wagers'
        },
        async (payload) => {
          console.log('New crypto wager created:', payload);
          // Fetch complete wager data with profiles
          const completeWager = await fetchCompleteWagerData(payload.new.id, 'crypto');
          if (completeWager) {
            setWagers(prev => [completeWager, ...prev]);
            setFilteredWagers(prev => [completeWager, ...prev]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'crypto_wagers'
        },
        async (payload) => {
          console.log('Crypto wager updated:', payload);
          // Fetch complete wager data with profiles
          const completeWager = await fetchCompleteWagerData(payload.new.id, 'crypto');
          if (completeWager) {
            setWagers(prev => prev.map(w => w.id === completeWager.id ? completeWager : w));
            setFilteredWagers(prev => prev.map(w => w.id === completeWager.id ? completeWager : w));
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'crypto_wagers'
        },
        (payload) => {
          console.log('Crypto wager deleted:', payload);
          // Remove the wager from the list
          const deletedWagerId = payload.old.id;
          setWagers(prev => prev.filter(w => w.id !== deletedWagerId));
          setFilteredWagers(prev => prev.filter(w => w.id !== deletedWagerId));
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      console.log('Cleaning up wager subscriptions');
      supabase.removeChannel(sportsWagersSubscription);
      supabase.removeChannel(cryptoWagersSubscription);
    };
  }, [connected, walletAddress]); // Dependencies - fetchWagers is stable

  const openSearchModal = () => {
    if (!connected) {
      // Show message to connect wallet first
      alert('Please connect your wallet to create a wager');
      return;
    }

    // Reset any existing state when opening the search modal
    setSelectedTeam(null);
    setUpcomingGames([]);
    setSelectedGame(null);
    setShowWagerModal(false);
    setSearchError(null);
    setSearchResult(null);
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    // Real-time will update the list automatically when new wagers are created
  };

  // Function to handle creating a wager from a match
  const handleCreateWager = (game: Game) => {
    setSelectedGame(game);
    setShowWagerModal(true);
  };

  // Function to close the wager modal
  const closeWagerModal = () => {
    setShowWagerModal(false);
    setSelectedGame(null);
    setSelectedTeam(null);
    setUpcomingGames([]);
    closeSearchModal();
    // Real-time will update the list automatically when new wagers are created
  };

  // Function to go back to search
  const backToSearch = () => {
    setSelectedTeam(null);
    setUpcomingGames([]);
    setSearchError(null);
    setSearchResult(null);
    setIsSearchModalOpen(true);
  };

  // Format score for matches
  const formatScore = (score: {home: number | null; away: number | null}): string => {
    if (score.home === null || score.away === null) return '-';
    return `${score.home} - ${score.away}`;
  };

  // Handle crypto lock icon click
  const handleCryptoLockClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Calculate position for the tooltip - center of the screen
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    setTooltipPosition({
      top: windowHeight / 2 - 50,
      left: windowWidth / 2 - 125
    });
    
    setShowCryptoReservedTooltip(true);
    
    // Hide tooltip after 3 seconds
    setTimeout(() => {
      setShowCryptoReservedTooltip(false);
    }, 3000);
  };

  // Show confirmation modal for a sports wager
  const handleConfirmWager = (wager: SportsWager) => {
    setWagerToConfirm(wager);
  };

  // Show confirmation modal for a crypto wager
  const handleConfirmCryptoWager = (wager: CryptoWager) => {
    setCryptoWagerToConfirm(wager);
  };
  
  // Show share modal for a wager
  const handleShareWager = (wager: SportsWager | CryptoWager) => {
    setWagerToShare(wager);
  };

  // Type-safe handlers for WagerCard components
  const handleSportsWagerConfirm = (wager: SportsWager | CryptoWager) => {
    if (isSportsWager(wager)) {
      handleConfirmWager(wager);
    }
  };

  const handleCryptoWagerConfirm = (wager: SportsWager | CryptoWager) => {
    if (isCryptoWager(wager)) {
      handleConfirmCryptoWager(wager);
    }
  };

  // Close confirmation modals
  const closeConfirmationModal = () => {
    setWagerToConfirm(null);
    setCryptoWagerToConfirm(null);
  };
  
  // Close share modal
  const closeShareModal = () => {
    setWagerToShare(null);
  };

  // Handle accepting a wager
  const handleAcceptWager = async (wagerId: string, type: 'sports' | 'crypto' = 'sports') => {
    if (!connected || !walletAddress) {
      alert('Please connect your wallet to accept a wager');
      return;
    }
    
    setIsAccepting(true);
    setActionError(null);
    
    try {
      // Get wager details before accepting for notification
      const wagerTable = type === 'sports' ? 'sports_wagers' : 'crypto_wagers';
      const { data: wagerData, error: queryError } = await supabase
        .from(wagerTable)
        .select('creator_address, sol_amount')
        .eq('id', wagerId)
        .single();

      if (queryError) {
        console.error('Error fetching wager data:', queryError);
      }

      const success = await acceptWager(wagerId, type, walletAddress);
      if (success) {
        // Close the confirmation modals if open - real-time will update the list
        setWagerToConfirm(null);
        setCryptoWagerToConfirm(null);
      } else {
        setActionError(`Failed to accept ${type} wager. Please try again.`);
      }
    } catch (err) {
      console.error(`Error accepting ${type} wager:`, err);
      if (err instanceof Error) {
        if (err.message.includes('reserved for another user')) {
          setActionError('This wager is reserved for a specific wallet address and cannot be accepted by you.');
        } else {
          setActionError(`Error accepting ${type} wager: ` + err.message);
        }
      } else {
        setActionError(`Unknown error accepting ${type} wager`);
      }
    } finally {
      setIsAccepting(false);
    }
  };
  
  // Handle cancelling a wager
  const handleCancelWager = async (wagerId: string, type: 'sports' | 'crypto' = 'sports') => {
    if (!connected || !walletAddress) {
      alert('Please connect your wallet to cancel a wager');
      return;
    }
    
    setCancellingWagerId(wagerId);
    setActionError(null);
    
    try {
      const success = await cancelWager(wagerId, type, walletAddress);
      if (success) {
        // Real-time will update the list automatically
      } else {
        setActionError(`Failed to cancel ${type} wager. Please try again.`);
      }
    } catch (err) {
      console.error(`Error cancelling ${type} wager:`, err);
      setActionError(`Error cancelling ${type} wager: ` + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setCancellingWagerId(null);
    }
  };

  // Handle resolving a wager
  const handleResolveWager = () => {
    // Real-time will update the list automatically
  };

  // Get appropriate status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-900/40 text-green-400 border border-green-700/30';
      case 'matched':
      case 'live':
        return 'bg-blue-900/40 text-blue-400 border border-blue-700/30';
      case 'settled':
        return 'bg-purple-900/40 text-purple-400 border border-purple-700/30';
      case 'cancelled':
        return 'bg-gray-800/40 text-gray-400 border border-gray-700/30';
      default:
        return 'bg-gray-800/40 text-gray-400 border border-gray-700/30';
    }
  };

  // Format date string
  const formatDate = (dateString: string) => {
    return formatDateString(dateString);
  };

  // Format time string
  const formatTime = (timeString: string | null) => {
    return formatTimeString(timeString);
  };

  // Render sports wagers using the WagerCard component
  const renderSportsWagers = () => {
    const sportsWagers = wagers.filter(wager => isSportsWager(wager)) as SportsWager[];
    
    if (sportsWagers.length === 0) {
      return null;
    }
    
    return sportsWagers.map((wager) => (
      <WagerCard 
        key={wager.id}
        wager={wager}
        onAcceptWager={handleAcceptWager}
        onCancelWager={handleCancelWager}
        onResolveWager={handleResolveWager}
        userWalletAddress={walletAddress}
        isAccepting={isAccepting}
        isCancelling={cancellingWagerId === wager.id}
        isResolving={isResolving}
        onConfirmWager={handleSportsWagerConfirm}
        onShareWager={handleShareWager}
      />
    ));
  };

  // Render crypto wagers using the WagerCard component
  const renderCryptoWagers = () => {
    const cryptoWagers = wagers.filter(wager => isCryptoWager(wager)) as CryptoWager[];
    
    if (cryptoWagers.length === 0) {
      return null;
    }
    
    return cryptoWagers.map((wager) => (
      <WagerCard 
        key={wager.id}
        wager={wager}
        onAcceptWager={(id) => handleAcceptWager(id, 'crypto')}
        onCancelWager={(id) => handleCancelWager(id, 'crypto')}
        onResolveWager={handleResolveWager}
        userWalletAddress={walletAddress}
        isAccepting={isAccepting}
        isCancelling={cancellingWagerId === wager.id}
        isResolving={isResolving}
        onConfirmWager={handleCryptoWagerConfirm}
        onShareWager={handleShareWager}
      />
    ));
  };

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
      
      {/* Unified Dashboard Layout */}
      <div className={`relative flex transition-all duration-500 ease-in-out ${isSidebarOpen ? 'ml-80' : 'ml-0'} mt-[85px]`}>
        
        {/* Integrated Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Dashboard Content */}
        <div className="flex-1 min-h-[calc(100vh-85px)] relative">
          <div className="flex h-full">
            
            {/* Central Wagers Area */}
            <div className="flex-1 p-6 space-y-8 overflow-y-auto">
              
              {/* Unified Dashboard Header */}
              <div className="relative">
                {/* Header background with seamless integration */}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-600/10 via-primary-600/10 to-secondary-600/10 rounded-3xl blur-2xl"></div>
                <div className="relative bg-gradient-to-r from-dark-900/80 via-dark-850/80 to-dark-900/80 backdrop-blur-2xl border border-slate-600/40 rounded-3xl p-8 shadow-2xl">
                  
                  {/* Dashboard title and controls */}
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <Zap size={24} className="text-white" />
                        </div>
                        <div>
                          <h1 className="text-4xl xl:text-5xl titillium-web-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-400">
                            WagerFi Dashboard
                          </h1>
                          <p className="text-lg titillium-web-regular text-gray-300 mt-1">
                            Peer-to-peer wagering on sports and crypto markets
                          </p>
                        </div>
                      </div>
                      
                      {/* Live stats bar */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/30 rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="titillium-web-semibold text-green-300">{wagers.filter(w => w.status === 'open').length} Open</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/30 rounded-full">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="titillium-web-semibold text-blue-300">{wagers.filter(w => w.status === 'live' || w.status === 'matched').length} Live</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/30 rounded-full">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="titillium-web-semibold text-purple-300">{wagers.filter(w => w.status === 'settled').length} Settled</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setShowLeaderboard(true)}
                        className="group flex items-center gap-3 bg-gradient-to-r from-dark-800/60 to-dark-850/60 
                                  hover:from-dark-700/80 hover:to-dark-800/80 text-gray-300 hover:text-white 
                                  titillium-web-semibold py-3 px-6 rounded-xl border border-slate-600/40 hover:border-slate-500/60
                                  backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                      >
                        <User size={20} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                        <span>Leaderboard</span>
                      </button>
                      
                      <button 
                        onClick={openSearchModal}
                        className="group flex items-center gap-3 bg-gradient-to-r from-secondary-600 to-primary-600 
                                  hover:from-secondary-500 hover:to-primary-500 text-white titillium-web-bold py-3 px-6 rounded-xl
                                  shadow-xl hover:shadow-glow-strong transform hover:-translate-y-1 transition-all duration-300
                                  relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Zap size={20} className="animate-pulse group-hover:scale-110 transition-transform relative z-10" />
                        <span className="relative z-10">Create Wager</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unified Filter System */}
              <div className="bg-gradient-to-r from-dark-800/40 via-dark-850/40 to-dark-800/40 backdrop-blur-2xl border border-slate-600/30 rounded-2xl p-6 shadow-xl">
                <div className="space-y-6">
                  {/* Filter header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 rounded-lg flex items-center justify-center">
                        <Filter size={16} className="text-primary-400" />
                      </div>
                      <h3 className="text-xl titillium-web-bold text-gray-200">Filter & Sort Wagers</h3>
                    </div>
                    <button 
                      onClick={fetchWagers}
                      className="group flex items-center gap-2 bg-dark-850/60 hover:bg-dark-800/80 
                                border border-slate-700/40 hover:border-slate-600/60 rounded-lg px-4 py-2 
                                text-gray-400 hover:text-gray-200 transition-all duration-200 backdrop-blur-sm"
                    >
                      <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                      <span className="text-sm titillium-web-regular">Refresh</span>
                    </button>
                  </div>
                  
                  {/* Filter controls in a unified grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Type Filter */}
                    <CustomDropdown
                      options={typeOptions}
                      value={filter.type}
                      onChange={(value) => setFilter({ ...filter, type: value as any })}
                      label="Wager Type"
                      icon={<Tag size={16} />}
                    />
                    
                    {/* Status Filter */}
                    <CustomDropdown
                      options={statusOptions}
                      value={statusFilter}
                      onChange={(value) => setStatusFilter(value as any)}
                      label="Status"
                      icon={<Clock size={16} />}
                    />
                    
                    {/* Sort Filter */}
                    <CustomDropdown
                      options={sortOptions}
                      value={filter.sort}
                      onChange={(value) => setFilter({ ...filter, sort: value as any })}
                      label="Sort By"
                      icon={<TrendingUp size={16} />}
                    />
                  </div>
                  
                  {/* Active filters display */}
                  {(filter.type !== 'all' || statusFilter !== 'all' || filter.sort !== 'newest') && (
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-700/20">
                      <span className="text-sm titillium-web-extralight text-gray-400">Active filters:</span>
                      <div className="flex flex-wrap gap-2">
                        {filter.type !== 'all' && (
                          <span className="px-3 py-1 bg-secondary-900/30 text-secondary-300 rounded-full text-xs titillium-web-regular border border-secondary-700/30">
                            {filter.type === 'crypto' ? 'Crypto' : 'Sports'}
                          </span>
                        )}
                        {statusFilter !== 'all' && (
                          <span className="px-3 py-1 bg-primary-900/30 text-primary-300 rounded-full text-xs titillium-web-regular border border-primary-700/30">
                            {statusFilter}
                          </span>
                        )}
                        {filter.sort !== 'newest' && (
                          <span className="px-3 py-1 bg-dark-700/40 text-gray-300 rounded-full text-xs titillium-web-regular border border-slate-600/30">
                            {filter.sort === 'oldest' ? 'Oldest' : 'Highest Amount'}
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setFilter({ type: 'all', status: 'all', sort: 'newest' });
                          }}
                          className="px-3 py-1 bg-red-900/30 text-red-300 hover:bg-red-900/50 rounded-full text-xs titillium-web-regular border border-red-700/30 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action error message */}
              {actionError && (
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gradient-to-r from-red-900/40 to-red-800/40 backdrop-blur-xl border border-red-700/50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                      <p className="text-red-300 titillium-web-regular">{actionError}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Wagers Content Area */}
              {isLoading ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-600/10 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-gradient-to-r from-dark-800/40 to-dark-850/40 backdrop-blur-2xl border border-slate-600/30 rounded-3xl p-16 text-center">
                    <div className="space-y-6">
                      <div className="w-20 h-20 mx-auto border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="space-y-3">
                        <h3 className="text-2xl titillium-web-bold text-gray-200">Loading Dashboard</h3>
                        <p className="text-gray-400 titillium-web-regular">Fetching the latest peer-to-peer wagers...</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/20 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-gradient-to-r from-red-900/40 to-red-800/40 backdrop-blur-2xl border border-red-700/40 rounded-3xl p-12 text-center">
                    <div className="space-y-6">
                      <div className="w-24 h-24 mx-auto bg-red-900/40 rounded-full flex items-center justify-center border border-red-700/50">
                        <AlertCircle size={32} className="text-red-400" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl titillium-web-bold text-red-300">Dashboard Error</h3>
                        <p className="text-red-400 titillium-web-regular max-w-md mx-auto">{error}</p>
                      </div>
                      <button 
                        onClick={fetchWagers}
                        className="group flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-red-800/60 to-red-700/60 
                                  hover:from-red-700/80 hover:to-red-600/80 text-red-200 hover:text-white 
                                  titillium-web-semibold py-3 px-6 rounded-xl border border-red-600/50 hover:border-red-500/70
                                  backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                        <span>Retry Loading</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : wagers.length > 0 ? (
                <div className="space-y-6">
                  {/* Wagers section header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 rounded-xl flex items-center justify-center">
                        <Scale size={20} className="text-primary-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl titillium-web-bold text-gray-200">Active Wagers</h2>
                        <p className="text-sm text-gray-400 titillium-web-extralight">
                          {wagers.length} {wagers.length === 1 ? 'wager' : 'wagers'} • Last updated: {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced wagers grid */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {filter.type === 'sports' || filter.type === 'all' ? renderSportsWagers() : null}
                    {(filter.type === 'crypto' || filter.type === 'all') ? renderCryptoWagers() : null}
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-600/10 rounded-3xl blur-2xl"></div>
                  <div className="relative bg-gradient-to-r from-dark-800/40 to-dark-850/40 backdrop-blur-2xl border border-slate-600/30 rounded-3xl p-12 text-center">
                    <div className="space-y-8">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-900/30 to-secondary-900/30 rounded-full flex items-center justify-center border border-primary-700/30">
                        <Zap size={40} className="text-primary-400" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl titillium-web-bold text-gray-200">Ready to Start Wagering?</h3>
                        <p className="text-gray-400 titillium-web-regular max-w-lg mx-auto text-lg">
                          {filter.type === 'all' && statusFilter === 'all' 
                            ? "Be the first to create a wager! Start by clicking the 'Create Wager' button above."
                            : "No wagers match your current filter criteria. Try adjusting your filters or create a new wager."
                          }
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={() => {
                            setFilter({ type: 'all', status: 'all', sort: 'newest' });
                          }}
                          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-dark-800/60 to-dark-850/60 
                                    hover:from-dark-700/80 hover:to-dark-800/80 text-gray-300 hover:text-white 
                                    titillium-web-semibold py-4 px-8 rounded-xl border border-slate-600/40 hover:border-slate-500/60
                                    backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                          <span>Reset Filters</span>
                        </button>
                        <button 
                          onClick={openSearchModal}
                          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-600 to-primary-600 
                                    hover:from-secondary-500 hover:to-primary-500 text-white titillium-web-bold py-4 px-8 rounded-xl
                                    shadow-xl hover:shadow-glow-strong transform hover:-translate-y-1 transition-all duration-300"
                        >
                          <Zap size={20} className="animate-pulse group-hover:scale-110 transition-transform" />
                          <span>Create First Wager</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Integrated Upcoming Events Panel */}
            <div className="w-96 xl:w-[420px] border-l border-slate-600/30 bg-gradient-to-b from-dark-900/60 via-dark-850/60 to-dark-900/60 backdrop-blur-2xl">
              <div className="sticky top-0 h-[calc(100vh-85px)] overflow-hidden flex flex-col">
                {/* Panel header */}
                <div className="p-6 border-b border-slate-600/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-secondary-600/20 to-primary-600/20 rounded-xl flex items-center justify-center">
                      <Calendar size={20} className="text-secondary-400" />
                    </div>
                    <div>
                      <h3 className="text-xl titillium-web-bold text-gray-200">Upcoming Events</h3>
                      <p className="text-sm text-gray-400 titillium-web-extralight">Live sports & markets</p>
                      <span className="text-sm text-gray-400 titillium-web-extralight">{getTodayDate()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Panel content */}
                <div className="flex-1 overflow-hidden">
                  <UpcomingGamesPanel onCreateWager={handleCreateWager} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* External toggle button for reopening closed sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-[100px] left-0 z-50 w-8 h-16 bg-gradient-to-r from-secondary-600 to-primary-600 
                   hover:from-secondary-500 hover:to-primary-500 text-white rounded-r-xl shadow-xl hover:shadow-glow-strong
                   transition-all duration-300 hover:scale-110 flex items-center justify-center"
        style={{
          transform: `translateX(${isSidebarOpen ? '320px' : '0px'})`,
        }}
      >
        {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <Footer />
      
      {/* All modals remain the same */}
      {isSearchModalOpen && !upcomingGames.length && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-gradient-to-r from-dark-900/95 to-dark-850/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-600/50">
            <div className="p-6 bg-gradient-to-r from-secondary-700 to-primary-700 flex justify-between items-center">
              <h2 className="text-2xl titillium-web-bold text-white">Create New Wager</h2>
              <button 
                onClick={closeSearchModal}
                className="text-white hover:text-indigo-100 transition-colors p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              <SearchContainer 
                setSelectedTeam={setSelectedTeam} 
                setUpcomingGames={setUpcomingGames}
                setError={setSearchError}
                setResult={setSearchResult}
                closeSearchModal={closeSearchModal}
              />
            </div>
          </div>
        </div>
      )}
      
      {upcomingGames.length > 0 && selectedTeam && !showWagerModal && (
        <MatchesModal
          team={selectedTeam}
          games={upcomingGames}
          onClose={() => {
            setSelectedTeam(null);
            setUpcomingGames([]);
            setIsSearchModalOpen(false);
          }}
          onCreateWager={handleCreateWager}
          isLoading={false}
          error={searchError}
          result={searchResult}
          formatScore={formatScore}
        />
      )}
      
      {showWagerModal && selectedGame && (
        <WagerModal game={selectedGame} onClose={closeWagerModal} />
      )}
      
      {wagerToConfirm && (
        <WagerConfirmationModal
          wager={wagerToConfirm}
          onClose={closeConfirmationModal}
          onConfirm={(wagerId) => handleAcceptWager(wagerId, 'sports')}
          isConfirming={isAccepting}
        />
      )}
      
      {cryptoWagerToConfirm && (
        <CryptoWagerConfirmationModal
          wager={cryptoWagerToConfirm}
          onClose={closeConfirmationModal}
          onConfirm={(wagerId) => handleAcceptWager(wagerId, 'crypto')}
          isConfirming={isAccepting}
        />
      )}
      
      {wagerToShare && (
        <ShareWagerModal
          wager={wagerToShare}
          onClose={closeShareModal}
        />
      )}
      
      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
      )}
      
      {showCryptoReservedTooltip && (
        <div className="fixed z-50 bg-gradient-to-r from-dark-800/95 to-dark-850/95 backdrop-blur-xl border border-yellow-700/30 rounded-xl p-4 shadow-2xl max-w-xs" 
             style={{ 
               top: tooltipPosition.top, 
               left: tooltipPosition.left,
             }}>
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-900/40 rounded-full flex items-center justify-center border border-yellow-700/50">
                <Lock size={16} className="text-yellow-400" />
              </div>
            </div>
            <div>
              <p className="text-sm text-yellow-400 titillium-web-semibold">Reserved Wager</p>
              <p className="text-xs text-gray-300 titillium-web-regular mt-1">This wager is reserved for a specific wallet address and cannot be accepted by you.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WagersPage;