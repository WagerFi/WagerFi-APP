import { supabase } from './supabase';
import { Notification, NotificationType, CreateNotificationData, NotificationPreferences } from '../types/notifications';

// Create a new notification
export async function createNotification(data: CreateNotificationData): Promise<Notification | null> {
    try {
        const { data: notification, error } = await supabase
            .from('notifications')
            .insert([{
                user_address: data.user_address,
                type: data.type,
                title: data.title,
                message: data.message,
                data: data.data || {},
                read: false,
                expires_at: data.expires_at
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating notification:', error);
            return null;
        }

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
        return null;
    }
}

// Get notifications for a user
export async function getUserNotifications(userAddress: string, limit: number = 50): Promise<Notification[]> {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_address', userAddress)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId);

        if (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return false;
    }
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsRead(userAddress: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_address', userAddress)
            .eq('read', false);

        if (error) {
            console.error('Error marking all notifications as read:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        return false;
    }
}

// Delete a notification
export async function deleteNotification(notificationId: string): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', notificationId);

        if (error) {
            console.error('Error deleting notification:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting notification:', error);
        return false;
    }
}

// Get unread notification count
export async function getUnreadNotificationCount(userAddress: string): Promise<number> {
    try {
        const { count, error } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_address', userAddress)
            .eq('read', false);

        if (error) {
            console.error('Error getting unread count:', error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error('Error getting unread count:', error);
        return 0;
    }
}

// Subscribe to real-time notifications
export function subscribeToNotifications(userAddress: string, callback: (notification: Notification) => void) {
    const subscription = supabase
        .channel(`notifications:${userAddress}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_address=eq.${userAddress}`
            },
            (payload) => {
                callback(payload.new as Notification);
            }
        )
        .subscribe();

    return subscription;
}

// Unsubscribe from notifications
export function unsubscribeFromNotifications(subscription: any) {
    if (subscription) {
        supabase.removeChannel(subscription);
    }
}

// Get or create notification preferences
export async function getNotificationPreferences(userAddress: string): Promise<NotificationPreferences | null> {
    try {
        const { data, error } = await supabase
            .from('notification_preferences')
            .select('*')
            .eq('user_address', userAddress)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error fetching notification preferences:', error);
            return null;
        }

        // If no preferences exist, create default ones
        if (!data) {
            const defaultPreferences = {
                user_address: userAddress,
                wager_updates: true,
                profile_updates: true,
                system_announcements: true,
                achievements: true,
                sound_enabled: true
            };

            const { data: newPrefs, error: createError } = await supabase
                .from('notification_preferences')
                .insert([defaultPreferences])
                .select()
                .single();

            if (createError) {
                console.error('Error creating notification preferences:', createError);
                return null;
            }

            return newPrefs;
        }

        return data;
    } catch (error) {
        console.error('Error with notification preferences:', error);
        return null;
    }
}

// Update notification preferences
export async function updateNotificationPreferences(
    userAddress: string,
    preferences: Partial<Omit<NotificationPreferences, 'user_address' | 'created_at' | 'updated_at'>>
): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('notification_preferences')
            .update(preferences)
            .eq('user_address', userAddress);

        if (error) {
            console.error('Error updating notification preferences:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating notification preferences:', error);
        return false;
    }
}

// Helper functions for creating specific notification types
export const NotificationHelpers = {
    // Wager notifications
    wagerCreated: (userAddress: string, wagerAmount: number, wagerType: string) =>
        createNotification({
            user_address: userAddress,
            type: 'wager_created',
            title: 'Wager Created Successfully',
            message: `Your ${wagerAmount} SOL ${wagerType} wager has been created and is now live!`,
            data: { amount: wagerAmount, type: wagerType }
        }),

    wagerAccepted: (userAddress: string, opponentAddress: string, wagerAmount: number) =>
        createNotification({
            user_address: userAddress,
            type: 'wager_accepted',
            title: 'Wager Accepted!',
            message: `Your ${wagerAmount} SOL wager has been accepted by ${opponentAddress.slice(0, 8)}...`,
            data: { opponent: opponentAddress, amount: wagerAmount }
        }),

    wagerWon: (userAddress: string, wagerAmount: number, winnings: number) =>
        createNotification({
            user_address: userAddress,
            type: 'wager_won',
            title: '🎉 You Won!',
            message: `Congratulations! You won ${winnings} SOL from your ${wagerAmount} SOL wager!`,
            data: { amount: wagerAmount, winnings }
        }),

    wagerLost: (userAddress: string, wagerAmount: number) =>
        createNotification({
            user_address: userAddress,
            type: 'wager_lost',
            title: 'Wager Lost',
            message: `Your ${wagerAmount} SOL wager didn't go your way this time. Better luck next time!`,
            data: { amount: wagerAmount }
        }),

    wagerExpired: (userAddress: string, wagerAmount: number) =>
        createNotification({
            user_address: userAddress,
            type: 'wager_expired',
            title: 'Wager Expired',
            message: `Your ${wagerAmount} SOL wager has expired and been automatically cancelled.`,
            data: { amount: wagerAmount }
        }),

    // Profile notifications
    profileUpdated: (userAddress: string) =>
        createNotification({
            user_address: userAddress,
            type: 'profile_updated',
            title: 'Profile Updated',
            message: 'Your profile has been successfully updated!',
            expires_at: new Date(Date.now() + 5000).toISOString() // 5 seconds
        }),

    usernameUpdated: (userAddress: string, newUsername: string) =>
        createNotification({
            user_address: userAddress,
            type: 'username_updated',
            title: 'Username Updated',
            message: `Your username has been changed to "${newUsername}"`,
            data: { username: newUsername },
            expires_at: new Date(Date.now() + 5000).toISOString()
        }),

    // System notifications
    addressCopied: (userAddress: string) =>
        createNotification({
            user_address: userAddress,
            type: 'address_copied',
            title: 'Address Copied',
            message: 'Wallet address copied to clipboard!',
            expires_at: new Date(Date.now() + 3000).toISOString() // 3 seconds
        }),

    transactionSuccess: (userAddress: string, type: string) =>
        createNotification({
            user_address: userAddress,
            type: 'transaction_success',
            title: 'Transaction Successful',
            message: `Your ${type} transaction has been confirmed on the blockchain.`,
            expires_at: new Date(Date.now() + 5000).toISOString()
        })
}; 