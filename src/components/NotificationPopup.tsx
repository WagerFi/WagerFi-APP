import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Notification, NotificationType } from '../types/notifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationPopupProps {
  notification: Notification;
  onClose: () => void;
  onMarkAsRead: () => void;
  onDelete?: (notificationId: string) => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ 
  notification, 
  onClose, 
  onMarkAsRead,
  onDelete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close after 5 seconds for non-important notifications
    const autoCloseTimer = setTimeout(() => {
      if (!['wager_won', 'wager_lost', 'wager_accepted'].includes(notification.type)) {
        handleClose();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [notification.type]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onDelete || isDeleting) return;
    
    setIsDeleting(true);
    try {
      await onDelete(notification.id);
      handleClose(); // Close the popup after successful deletion
    } catch (error) {
      console.error('Failed to delete notification:', error);
      setIsDeleting(false);
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead();
    }
    handleClose();
  };

  const getNotificationIcon = (type: NotificationType): string => {
    switch (type) {
      case 'wager_created': return '🎯';
      case 'wager_accepted': return '🤝';
      case 'wager_won': return '🎉';
      case 'wager_lost': return '😔';
      case 'wager_expired': return '⏰';
      case 'wager_cancelled': return '❌';
      case 'profile_updated': return '👤';
      case 'username_updated': return '✏️';
      case 'profile_image_updated': return '📸';
      case 'address_copied': return '📋';
      case 'transaction_success': return '✅';
      case 'transaction_failed': return '❌';
      case 'system_announcement': return '📢';
      case 'achievement_unlocked': return '🏆';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type: NotificationType): string => {
    switch (type) {
      case 'wager_won': return 'border-l-green-500 bg-green-900/20';
      case 'wager_lost': return 'border-l-red-500 bg-red-900/20';
      case 'wager_accepted': return 'border-l-blue-500 bg-blue-900/20';
      case 'wager_expired': return 'border-l-yellow-500 bg-yellow-900/20';
      case 'transaction_success': return 'border-l-green-500 bg-green-900/20';
      case 'transaction_failed': return 'border-l-red-500 bg-red-900/20';
      case 'achievement_unlocked': return 'border-l-purple-500 bg-purple-900/20';
      default: return 'border-l-primary-500 bg-dark-800/90';
    }
  };

  const getIconColor = (type: NotificationType): string => {
    switch (type) {
      case 'wager_won': return 'text-green-400';
      case 'wager_lost': return 'text-red-400';
      case 'wager_accepted': return 'text-blue-400';
      case 'wager_expired': return 'text-yellow-400';
      case 'transaction_success': return 'text-green-400';
      case 'transaction_failed': return 'text-red-400';
      case 'achievement_unlocked': return 'text-purple-400';
      default: return 'text-primary-400';
    }
  };

  return (
    <div
      className={`
        fixed bottom-4 right-4 w-80 max-w-sm z-50 
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      <div
        onClick={handleClick}
        className={`
          relative p-4 rounded-xl border-l-4 cursor-pointer
          backdrop-blur-xl shadow-2xl border border-slate-700/50
          hover:shadow-glow transition-all duration-200
          ${getNotificationColor(notification.type)}
        `}
      >
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex gap-1">
          {onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`p-1 transition-colors rounded ${
                isDeleting
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10'
              }`}
              title="Delete notification"
            >
              <Trash2 size={14} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="p-1 text-gray-400 hover:text-gray-300 hover:bg-slate-700/40 transition-colors rounded"
            title="Close notification"
          >
            <X size={14} />
          </button>
        </div>

        {/* Unread indicator */}
        {!notification.read && (
          <div className="absolute top-3 right-16 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
        )}

        <div className="flex items-start gap-3 pr-12">
          {/* Icon */}
          <div className={`text-2xl flex-shrink-0 ${getIconColor(notification.type)}`}>
            {getNotificationIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-200 mb-1 text-sm">
              {notification.title}
            </h3>
            <p className="text-xs text-gray-400 mb-2 leading-relaxed line-clamp-2">
              {notification.message}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
              </span>
              {!notification.read && (
                <span className="text-xs text-primary-400 font-medium">
                  New
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar for auto-close */}
        {!['wager_won', 'wager_lost', 'wager_accepted'].includes(notification.type) && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700/30 rounded-b-xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-secondary-500 to-primary-500 rounded-b-xl animate-progress" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup; 