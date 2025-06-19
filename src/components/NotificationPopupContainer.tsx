import React, { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Notification } from '../types/notifications';
import NotificationPopup from './NotificationPopup';

const NotificationPopupContainer: React.FC = () => {
  const { markAsRead, deleteNotificationById, newNotifications, clearNewNotifications } = useNotifications();
  const [activePopups, setActivePopups] = useState<Notification[]>([]);
  const [shownNotificationIds, setShownNotificationIds] = useState<Set<string>>(new Set());

  // Process new notifications and add them to popups
  useEffect(() => {
    if (newNotifications.length > 0) {
      const notificationsToShow = newNotifications.filter(
        notification => !shownNotificationIds.has(notification.id)
      );

      if (notificationsToShow.length > 0) {
        // Add new notifications to active popups (limit to 3)
        setActivePopups(prev => {
          const combined = [...notificationsToShow, ...prev];
          return combined.slice(0, 3);
        });

        // Mark these notifications as shown
        setShownNotificationIds(prev => {
          const newSet = new Set(prev);
          notificationsToShow.forEach(notification => {
            newSet.add(notification.id);
          });
          return newSet;
        });

        // Clear the new notifications from context
        clearNewNotifications();
      }
    }
  }, [newNotifications, shownNotificationIds, clearNewNotifications]);

  const handleClosePopup = (notificationId: string) => {
    setActivePopups(prev => prev.filter(popup => popup.id !== notificationId));
  };

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteNotificationById(notificationId);
      // Remove from active popups as well
      setActivePopups(prev => prev.filter(popup => popup.id !== notificationId));
    } catch (error) {
      console.error('Failed to delete notification from popup:', error);
      throw error; // Re-throw to let the popup handle the error
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="flex flex-col-reverse gap-3">
        {activePopups.map((notification, index) => (
          <div
            key={notification.id}
            className="pointer-events-auto"
            style={{
              transform: `translateY(${index * -10}px)`,
              zIndex: 50 - index
            }}
          >
            <NotificationPopup
              notification={notification}
              onClose={() => handleClosePopup(notification.id)}
              onMarkAsRead={() => handleMarkAsRead(notification.id)}
              onDelete={handleDeleteNotification}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPopupContainer; 