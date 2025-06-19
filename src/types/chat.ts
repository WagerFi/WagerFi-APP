// Chat message types for the live chat functionality

export interface ChatMessage {
    id: string;
    message: string;
    user_address: string;
    username?: string | null;
    profile_image_url?: string | null;
    reply_to_id?: string | null;
    reply_to_message?: string | null;
    reply_to_username?: string | null;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface ChatMessageCreate {
    message: string;
    user_address: string;
    reply_to_id?: string | null;
}

export interface ChatMessageUpdate {
    message?: string;
    is_deleted?: boolean;
}

// For the enhanced message with user info from the database function
export interface ChatMessageWithUserInfo {
    id: string;
    message: string;
    user_address: string;
    username: string; // Always resolved from COALESCE
    profile_image_url?: string | null;
    reply_to_id?: string | null;
    reply_to_message?: string | null;
    reply_to_username?: string | null;
    created_at: string;
    updated_at: string;
}

// Chat context/state types
export interface ChatState {
    messages: ChatMessageWithUserInfo[];
    isLoading: boolean;
    error: string | null;
    hasMore: boolean;
    isConnected: boolean;
}

export interface ChatContextType {
    messages: ChatMessageWithUserInfo[];
    isLoading: boolean;
    error: string | null;
    hasMore: boolean;
    sendMessage: (message: string, replyToId?: string) => Promise<void>;
    loadMoreMessages: () => Promise<void>;
    editMessage: (messageId: string, newMessage: string) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<void>;
    clearError: () => void;
} 