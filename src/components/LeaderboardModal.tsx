import React, { useState, useEffect } from 'react';
import { X, Trophy, ArrowDown, ArrowUp, Medal } from 'lucide-react';
import { getAllUsers, UserProfile } from '../lib/supabase';
import { getDisplayUsername } from '../lib/chat';
import UserStatsTooltip from './UserStatsTooltip';

interface LeaderboardModalProps {
  onClose: () => void;
}

type SortField = 'profit_amount' | 'wins' | 'win_rate';
type SortOrder = 'asc' | 'desc';
type PageSize = 10 | 25 | 50 | 100;

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>('profit_amount');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [pageSize, setPageSize] = useState<PageSize>(25);
  
  // Tooltip state for user stats
  const [hoveredUser, setHoveredUser] = useState<{
    userAddress: string;
    username: string;
    profileImageUrl?: string | null;
    position: { x: number; y: number };
  } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users for leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Calculate win rate for a user
  const calculateWinRate = (user: UserProfile): number => {
    const totalGames = user.wins + user.losses;
    if (totalGames === 0) return 0;
    return (user.wins / totalGames) * 100;
  };

  // Handle username hover for tooltip
  const handleUsernameHover = (
    event: React.MouseEvent,
    userAddress: string,
    username: string,
    profileImageUrl?: string | null
  ) => {
    // Clear any existing timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    
    // Capture the position immediately
    const clientX = event.clientX;
    const clientY = event.clientY;
    
    // Set a delay before showing tooltip
    const timeout = setTimeout(() => {
      setHoveredUser({
        userAddress,
        username,
        profileImageUrl,
        position: {
          x: clientX,
          y: clientY
        }
      });
    }, 200); // 200ms delay
    
    setHoverTimeout(timeout);
  };

  // Handle username hover leave
  const handleUsernameHoverLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    // Close tooltip after a longer delay to prevent flashing
    const timeout = setTimeout(() => {
      setHoveredUser(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  // Close tooltip
  const closeTooltip = () => {
    setHoveredUser(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [hoverTimeout, closeTimeout]);

  // Sort users based on current sort field and order
  const sortedUsers = [...users].sort((a, b) => {
    let valueA, valueB;
    
    if (sortField === 'win_rate') {
      valueA = calculateWinRate(a);
      valueB = calculateWinRate(b);
    } else {
      valueA = a[sortField];
      valueB = b[sortField];
    }
    
    // For sorting
    if (sortOrder === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  // Apply pagination
  const paginatedUsers = sortedUsers.slice(0, pageSize);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-850 rounded-lg shadow-xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden border border-slate-700/40">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-4 text-white flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-yellow-300" />
            <h3 className="text-xl font-semibold">Leaderboard</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content with proper scrolling */}
        <div className="overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Trophy size={48} className="text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg font-medium">No users have placed wagers yet</p>
              <p className="text-gray-500 mt-2">Be the first to create a wager and appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Pagination Selector */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Show top:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value) as PageSize)}
                    className="bg-dark-800 border border-slate-700/40 text-gray-200 text-sm rounded-md px-3 py-1 
                             focus:outline-none focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-gray-400">users</span>
                </div>
                <div className="text-sm text-gray-400">
                  Showing {Math.min(pageSize, sortedUsers.length)} of {sortedUsers.length} users
                </div>
              </div>
              
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-700/40">
                    <th className="p-3 text-gray-400 font-medium text-sm">Rank</th>
                    <th className="p-3 text-gray-400 font-medium text-sm">User</th>
                    <th 
                      className="p-3 text-gray-400 font-medium text-sm cursor-pointer hover:text-gray-300"
                      onClick={() => handleSort('wins')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Wins</span>
                        {sortField === 'wins' && (
                          sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-3 text-gray-400 font-medium text-sm cursor-pointer hover:text-gray-300"
                      onClick={() => handleSort('win_rate')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Win Rate</span>
                        {sortField === 'win_rate' && (
                          sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-3 text-gray-400 font-medium text-sm cursor-pointer hover:text-gray-300"
                      onClick={() => handleSort('profit_amount')}
                    >
                      <div className="flex items-center gap-1">
                        <span>Profit/Loss</span>
                        {sortField === 'profit_amount' && (
                          sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-gray-400 font-medium text-sm">Streaks</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => {
                    const winRate = calculateWinRate(user);
                    const totalGames = user.wins + user.losses;
                    
                    return (
                      <tr 
                        key={user.wallet_address} 
                        className="border-b border-slate-700/20 hover:bg-dark-800/40"
                      >
                        <td className="p-3">
                          {index < 3 ? (
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center
                              ${index === 0 ? 'bg-yellow-500/20 text-yellow-300' : 
                                index === 1 ? 'bg-gray-400/20 text-gray-300' : 
                                'bg-amber-700/20 text-amber-600'}`}
                            >
                              <Medal size={14} />
                            </div>
                          ) : (
                            <span className="text-gray-400">{index + 1}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-dark-800 overflow-hidden">
                              {user.profile_image_url ? (
                                <img 
                                  src={user.profile_image_url} 
                                  alt={user.username || 'User'} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary-900/40 text-primary-300">
                                  {(user.username?.charAt(0) || 'U').toUpperCase()}
                                </div>
                              )}
                            </div>
                            <span 
                              className="font-medium text-gray-200 truncate max-w-[150px] cursor-pointer hover:text-primary-400 transition-colors select-none hover:underline"
                              onMouseEnter={(e) => handleUsernameHover(
                                e, 
                                user.wallet_address, 
                                getDisplayUsername(user.username, user.wallet_address),
                                user.profile_image_url
                              )}
                              onMouseLeave={handleUsernameHoverLeave}
                            >
                              {getDisplayUsername(user.username, user.wallet_address)}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-200 font-medium">{user.wins}</span>
                          {totalGames > 0 && (
                            <span className="text-gray-500 text-sm ml-1">/ {totalGames}</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <div className="w-16 h-1.5 rounded-full bg-dark-800 overflow-hidden">
                              <div 
                                className="h-full bg-primary-500" 
                                style={{width: `${winRate}%`}}
                              ></div>
                            </div>
                            <span className="ml-2 text-gray-300">{winRate.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`font-medium ${
                            user.profit_amount > 0 ? 'text-green-400' : 
                            user.profit_amount < 0 ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {user.profit_amount > 0 ? '+' : ''}
                            {user.profit_amount.toFixed(2)} SOL
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {(user.win_streak || 0) > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-orange-500/20 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                </div>
                                <span className="text-xs text-orange-400 font-medium">
                                  {user.win_streak || 0}W
                                </span>
                              </div>
                            )}
                            {(user.loss_streak || 0) > 0 && (
                              <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                </div>
                                <span className="text-xs text-blue-400 font-medium">
                                  {user.loss_streak || 0}L
                                </span>
                              </div>
                            )}
                            {(user.win_streak || 0) === 0 && (user.loss_streak || 0) === 0 && (
                              <span className="text-xs text-gray-500">-</span>
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
      
      {/* User Stats Tooltip */}
      {hoveredUser && (
        <UserStatsTooltip
          userAddress={hoveredUser.userAddress}
          username={hoveredUser.username}
          profileImageUrl={hoveredUser.profileImageUrl || undefined}
          position={hoveredUser.position}
          onClose={closeTooltip}
        />
      )}
    </div>
  );
};

export default LeaderboardModal;