import { supabase, supabaseAdmin } from './supabase';
import { ChatMessage, ChatMessageWithUserInfo, ChatMessageCreate, ChatMessageUpdate } from '../types/chat';

// Get display username with fallback to last 8 digits of wallet address
export function getDisplayUsername(username: string | null | undefined, walletAddress: string): string {
    if (username && username.trim()) {
        return username.trim();
    }

    // Return last 8 digits of wallet address as fallback
    return walletAddress.slice(-8);
}

// Send a new chat message
export async function sendChatMessage(
    message: string,
    userAddress: string,
    replyToId?: string
): Promise<string | null> {
    try {
        // Additional validation
        if (!userAddress || userAddress.trim().length === 0) {
            console.error('User address is required');
            return null;
        }

        const validation = validateMessage(message);
        if (!validation.isValid) {
            console.error('Invalid message:', validation.error);
            return null;
        }

        // Verify user exists in the users table and get user info
        const { data: userExists } = await supabaseAdmin
            .from('users')
            .select('wallet_address, username, profile_image_url')
            .eq('wallet_address', userAddress)
            .single();

        if (!userExists) {
            console.error('User not found in database');
            return null;
        }

        // Get display username with fallback
        const displayUsername = getDisplayUsername(userExists.username, userAddress);

        // Use admin client to bypass RLS issues
        const { data, error } = await supabaseAdmin
            .from('chat_messages')
            .insert({
                message: message.trim(),
                user_address: userAddress,
                username: displayUsername,
                profile_image_url: userExists.profile_image_url || null,
                reply_to_id: replyToId || null
            })
            .select('id')
            .single();

        if (error) {
            console.error('Error sending chat message:', error);
            return null;
        }

        return data?.id || null; // Returns the new message ID
    } catch (err) {
        console.error('Failed to send chat message:', err);
        return null;
    }
}

// Get recent chat messages with user information
export async function getRecentChatMessages(
    limit: number = 50,
    beforeTimestamp?: string
): Promise<ChatMessageWithUserInfo[]> {
    try {
        // Use direct query with admin client to bypass RLS
        let query = supabaseAdmin
            .from('chat_messages')
            .select(`
        id,
        message,
        user_address,
        username,
        profile_image_url,
        reply_to_id,
        created_at,
        updated_at
      `)
            .eq('is_deleted', false)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (beforeTimestamp) {
            query = query.lt('created_at', beforeTimestamp);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching chat messages:', error);
            return [];
        }

        // Transform to ChatMessageWithUserInfo format with username fallback
        return (data || []).map(msg => ({
            ...msg,
            username: getDisplayUsername(msg.username, msg.user_address),
            reply_to_message: null,
            reply_to_username: null
        }));
    } catch (err) {
        console.error('Failed to fetch chat messages:', err);
        return [];
    }
}

// Get chat messages using direct table query (alternative method)
export async function getChatMessages(
    limit: number = 50,
    beforeTimestamp?: string
): Promise<ChatMessage[]> {
    try {
        let query = supabase
            .from('chat_messages')
            .select('*')
            .eq('is_deleted', false)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (beforeTimestamp) {
            query = query.lt('created_at', beforeTimestamp);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching chat messages:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('Failed to fetch chat messages:', err);
        return [];
    }
}

// Edit a chat message
export async function editChatMessage(
    messageId: string,
    newMessage: string,
    userAddress: string
): Promise<boolean> {
    try {
        // Validate inputs
        if (!messageId || !userAddress || userAddress.trim().length === 0) {
            console.error('Message ID and user address are required');
            return false;
        }

        const validation = validateMessage(newMessage);
        if (!validation.isValid) {
            console.error('Invalid message:', validation.error);
            return false;
        }

        // Verify the message exists and belongs to the user
        const { data: existingMessage } = await supabaseAdmin
            .from('chat_messages')
            .select('user_address')
            .eq('id', messageId)
            .eq('is_deleted', false)
            .single();

        if (!existingMessage) {
            console.error('Message not found or already deleted');
            return false;
        }

        if (existingMessage.user_address !== userAddress) {
            console.error('User can only edit their own messages');
            return false;
        }

        const { error } = await supabaseAdmin
            .from('chat_messages')
            .update({
                message: newMessage.trim(),
                updated_at: new Date().toISOString()
            })
            .eq('id', messageId)
            .eq('user_address', userAddress)
            .eq('is_deleted', false);

        if (error) {
            console.error('Error editing chat message:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Failed to edit chat message:', err);
        return false;
    }
}

// Delete a chat message (soft delete)
export async function deleteChatMessage(
    messageId: string,
    userAddress: string
): Promise<boolean> {
    try {
        // Validate inputs
        if (!messageId || !userAddress || userAddress.trim().length === 0) {
            console.error('Message ID and user address are required');
            return false;
        }

        // Verify the message exists and belongs to the user
        const { data: existingMessage } = await supabaseAdmin
            .from('chat_messages')
            .select('user_address, is_deleted')
            .eq('id', messageId)
            .single();

        if (!existingMessage) {
            console.error('Message not found');
            return false;
        }

        if (existingMessage.is_deleted) {
            console.error('Message already deleted');
            return false;
        }

        if (existingMessage.user_address !== userAddress) {
            console.error('User can only delete their own messages');
            return false;
        }

        const { error } = await supabaseAdmin
            .from('chat_messages')
            .update({
                is_deleted: true,
                updated_at: new Date().toISOString()
            })
            .eq('id', messageId)
            .eq('user_address', userAddress);

        if (error) {
            console.error('Error deleting chat message:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Failed to delete chat message:', err);
        return false;
    }
}

// Subscribe to real-time chat messages
export function subscribeToChatMessages(
    onMessage: (message: ChatMessage) => void,
    onError?: (error: any) => void
) {
    try {
        const subscription = supabase
            .channel(`chat_messages_${Date.now()}`) // Unique channel name
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'chat_messages',
                    filter: 'is_deleted=eq.false'
                },
                (payload) => {
                    try {
                        console.log('New chat message received:', payload);
                        onMessage(payload.new as ChatMessage);
                    } catch (err) {
                        console.error('Error processing new message:', err);
                        if (onError) onError(err);
                    }
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'chat_messages'
                },
                (payload) => {
                    try {
                        if (!payload.new.is_deleted) {
                            console.log('Chat message updated:', payload);
                            onMessage(payload.new as ChatMessage);
                        }
                    } catch (err) {
                        console.error('Error processing updated message:', err);
                        if (onError) onError(err);
                    }
                }
            )
            .subscribe((status, err) => {
                console.log('Subscription status:', status);
                if (status === 'SUBSCRIBED') {
                    console.log('Successfully subscribed to chat messages');
                } else if (status === 'CHANNEL_ERROR') {
                    console.error('Error subscribing to chat messages:', err);
                    if (onError) onError({ status, error: err });
                } else if (status === 'TIMED_OUT') {
                    console.error('Chat subscription timed out');
                    if (onError) onError({ status, error: 'Subscription timed out' });
                } else if (status === 'CLOSED') {
                    console.log('Chat subscription closed');
                }
            });

        return subscription;
    } catch (err) {
        console.error('Failed to create chat subscription:', err);
        if (onError) onError(err);
        return null;
    }
}

// Unsubscribe from chat messages
export function unsubscribeFromChatMessages(subscription: any) {
    if (subscription) {
        supabase.removeChannel(subscription);
    }
}

// Get message count for pagination
export async function getChatMessageCount(): Promise<number> {
    try {
        const { count, error } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('is_deleted', false);

        if (error) {
            console.error('Error getting chat message count:', error);
            return 0;
        }

        return count || 0;
    } catch (err) {
        console.error('Failed to get chat message count:', err);
        return 0;
    }
}

// Format relative time for message display
export function formatMessageTime(timestamp: string): string {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
        return 'Just now';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) { // 24 hours
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return messageTime.toLocaleDateString();
    }
}

// Test database connection and table access
export async function testChatConnection(): Promise<{ success: boolean; error?: string; details?: any }> {
    try {
        console.log('Testing chat database connection...');

        // Test basic table access
        const { data, error } = await supabase
            .from('chat_messages')
            .select('id, created_at')
            .limit(1);

        if (error) {
            console.error('Database connection test failed:', error);
            return {
                success: false,
                error: error.message,
                details: {
                    code: error.code,
                    hint: error.hint,
                    details: error.details
                }
            };
        }

        // Test if we can access users table (needed for joins)
        const { error: usersError } = await supabase
            .from('users')
            .select('wallet_address')
            .limit(1);

        if (usersError) {
            console.warn('Users table access test failed:', usersError);
            return {
                success: false,
                error: `Users table access failed: ${usersError.message}`,
                details: usersError
            };
        }

        console.log('Database connection test successful');
        return { success: true };
    } catch (err) {
        console.error('Database connection test error:', err);
        return { success: false, error: String(err) };
    }
}

// Enhanced function to test real-time capabilities
export async function testRealtimeConnection(): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
        try {
            const testChannel = supabase
                .channel('connection_test')
                .subscribe((status, err) => {
                    console.log('Realtime connection test status:', status);

                    if (status === 'SUBSCRIBED') {
                        supabase.removeChannel(testChannel);
                        resolve({ success: true });
                    } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                        supabase.removeChannel(testChannel);
                        resolve({
                            success: false,
                            error: `Realtime connection failed: ${status} - ${err}`
                        });
                    }
                });

            // Timeout after 10 seconds
            setTimeout(() => {
                supabase.removeChannel(testChannel);
                resolve({
                    success: false,
                    error: 'Realtime connection test timed out'
                });
            }, 10000);

        } catch (err) {
            resolve({
                success: false,
                error: `Realtime test error: ${err}`
            });
        }
    });
}

// Validate message content
export function validateMessage(message: string): { isValid: boolean; error?: string } {
    const trimmed = message.trim();

    if (trimmed.length === 0) {
        return { isValid: false, error: 'Message cannot be empty' };
    }

    if (trimmed.length > 2000) {
        return { isValid: false, error: 'Message is too long (max 2000 characters)' };
    }

    return { isValid: true };
} 