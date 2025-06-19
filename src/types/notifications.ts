export interface Notification {
    id: string;
    user_address: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, any>; // Additional data like wager_id, amount, etc.
    read: boolean;
    created_at: string;
    expires_at?: string; // Optional expiration for temporary notifications
}

export type NotificationType =
    | 'wager_created'
    | 'wager_accepted'
    | 'wager_won'
    | 'wager_lost'
    | 'wager_expired'
    | 'wager_cancelled'
    | 'profile_updated'
    | 'username_updated'
    | 'profile_image_updated'
    | 'address_copied'
    | 'transaction_success'
    | 'transaction_failed'
    | 'system_announcement'
    | 'achievement_unlocked';

export interface NotificationPreferences {
    user_address: string;
    wager_updates: boolean;
    profile_updates: boolean;
    system_announcements: boolean;
    achievements: boolean;
    sound_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateNotificationData {
    user_address: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: Record<string, any>;
    expires_at?: string;
} 