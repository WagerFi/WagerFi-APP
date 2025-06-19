import React from 'react';
import { X, Bell, Trophy, AlertCircle, Info, DollarSign, User, Copy, Zap } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationType } from '../types/notifications';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotificationById
  } = useNotifications();

  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
  const [deletingIds, setDeletingIds] = React.useState<Set<string>>(new Set());

  const filteredNotifications = React.useMemo(() => {
    const filtered = filter === 'unread' 
      ? notifications.filter(n => !n.read)
      : notifications;
    
    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [notifications, filter]);

  const getNotificationIcon = (type: NotificationType) => {
    const iconProps = { size: 14 };
    
    switch (type) {
      case 'wager_created':
      case 'wager_accepted':
      case 'wager_cancelled':
        return <Zap {...iconProps} className="text-blue-400" />;
      case 'wager_won':
        return <Trophy {...iconProps} className="text-green-400" />;
      case 'wager_lost':
        return <AlertCircle {...iconProps} className="text-red-400" />;
      case 'transaction_success':
        return <DollarSign {...iconProps} className="text-green-400" />;
      case 'transaction_failed':
        return <DollarSign {...iconProps} className="text-red-400" />;
      case 'profile_updated':
      case 'username_updated':
      case 'profile_image_updated':
        return <User {...iconProps} className="text-blue-400" />;
      case 'address_copied':
        return <Copy {...iconProps} className="text-gray-400" />;
      case 'system_announcement':
        return <Info {...iconProps} className="text-blue-400" />;
      case 'achievement_unlocked':
        return <Trophy {...iconProps} className="text-purple-400" />;
      default:
        return <Bell {...iconProps} className="text-gray-400" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  const handleDelete = async (notificationId: string) => {
    if (deletingIds.has(notificationId)) return; // Prevent double-clicking
    
    setDeletingIds(prev => new Set(prev).add(notificationId));
    
    try {
      await deleteNotificationById(notificationId);
    } catch (error) {
      console.error('Failed to delete notification:', error);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Panel - styled exactly like UserStatsTooltip */}
      <div 
        className="fixed right-4 top-16 bg-dark-850 border border-slate-700/40 rounded-lg shadow-xl p-4 w-80 z-50 max-h-96 flex flex-col"
        style={{
          opacity: 0,
          animation: 'fadeIn 0.2s ease-out forwards'
        }}
      >
        {/* Header with user info style */}
        <div className="flex items-center gap-3 pb-2 border-b border-slate-700/40">
          <Bell size={16} className="text-gray-300" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-200">
              Notifications
            </p>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-400">
                {unreadCount} unread
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700/40 rounded transition-colors"
          >
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Filter tabs - styled like stats grid */}
        <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center justify-center gap-1 p-2 rounded text-xs font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-900/40 text-primary-300 border border-primary-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/40'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex items-center justify-center gap-1 p-2 rounded text-xs font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-primary-900/40 text-primary-300 border border-primary-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/40'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Mark all as read button */}
        {unreadCount > 0 && (
          <div className="pb-2 border-b border-slate-700/40 mb-3">
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List - styled like stats grid */}
        <div className="flex-1 overflow-y-auto space-y-2 max-h-64">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-4">
              <Bell size={24} className="text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {filter === 'unread' 
                  ? 'All caught up!'
                  : 'Activity will appear here'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-2 p-2 rounded cursor-pointer transition-colors ${
                  notification.read
                    ? 'hover:bg-slate-800/40'
                    : 'bg-primary-900/20 border border-primary-500/20 hover:bg-primary-900/30'
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-xs text-gray-400 font-medium line-clamp-1">
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.created_at)}
                      </span>
                      {!notification.read && (
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification.id);
                    }}
                    disabled={deletingIds.has(notification.id)}
                    className={`text-xs transition-colors mt-1 ${
                      deletingIds.has(notification.id)
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-600 hover:text-red-400'
                    }`}
                  >
                    {deletingIds.has(notification.id) ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel; 