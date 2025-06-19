import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification } from '../types/notifications';
import { 
  getUserNotifications, 
  getUnreadNotificationCount, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification,
  subscribeToNotifications,
  unsubscribeFromNotifications
} from '../lib/notifications';
import { useWalletContext } from './WalletContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  newNotifications: Notification[]; // Track new notifications for popups
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotificationById: (notificationId: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  playNotificationSound: () => void;
  clearNewNotifications: () => void; // Clear the new notifications list
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { walletAddress, connected } = useWalletContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  // Load notifications when wallet connects
  const loadNotifications = useCallback(async () => {
    if (!walletAddress || !connected) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setIsLoading(true);
    try {
      const [notifs, count] = await Promise.all([
        getUserNotifications(walletAddress),
        getUnreadNotificationCount(walletAddress)
      ]);
      
      setNotifications(notifs);
      setUnreadCount(count);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, connected]);

  // Set up real-time subscription
  useEffect(() => {
    if (!walletAddress || !connected) {
      if (subscription) {
        unsubscribeFromNotifications(subscription);
        setSubscription(null);
      }
      return;
    }

    // Load initial notifications
    loadNotifications();

    // Set up real-time subscription
    const newSubscription = subscribeToNotifications(walletAddress, (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
      setNewNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
      playNotificationSound();
    });

    setSubscription(newSubscription);

    return () => {
      if (newSubscription) {
        unsubscribeFromNotifications(newSubscription);
      }
    };
  }, [walletAddress, connected, loadNotifications]);

  // Clean up subscription on unmount
  useEffect(() => {
    return () => {
      if (subscription) {
        unsubscribeFromNotifications(subscription);
      }
    };
  }, [subscription]);

  // Add notification manually (for local notifications like clipboard copy)
  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
    setNewNotifications(prev => [notification, ...prev]);
    if (!notification.read) {
      setUnreadCount(prev => prev + 1);
    }
    playNotificationSound();
  }, []);

  // Clear new notifications (called by popup container after showing)
  const clearNewNotifications = useCallback(() => {
    setNewNotifications([]);
  }, []);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    const success = await markNotificationAsRead(notificationId);
    if (success) {
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!walletAddress) return;
    
    const success = await markAllNotificationsAsRead(walletAddress);
    if (success) {
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    }
  }, [walletAddress]);

  // Delete notification
  const deleteNotificationById = useCallback(async (notificationId: string) => {
    const success = await deleteNotification(notificationId);
    if (success) {
      const notification = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      setNewNotifications(prev => prev.filter(notif => notif.id !== notificationId));
      if (notification && !notification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    }
  }, [notifications]);

  // Refresh notifications
  const refreshNotifications = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    try {
      // Create a subtle notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Silently fail if audio context is not available
      console.debug('Could not play notification sound:', error);
    }
  }, []);

  const value: NotificationContextType = {
    notifications,
    newNotifications,
    unreadCount,
    isLoading,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotificationById,
    refreshNotifications,
    playNotificationSound,
    clearNewNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 