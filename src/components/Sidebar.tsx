import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare, FileText, Shield, Scale, X, MessageCircle, ExternalLink, User, Zap, ArrowRight, Send, AlertCircle } from 'lucide-react';
import { useWalletContext } from '../contexts/WalletContext';
import { 
  getRecentChatMessages, 
  sendChatMessage, 
  subscribeToChatMessages, 
  unsubscribeFromChatMessages,
  formatMessageTime,
  validateMessage,
  getDisplayUsername,
  testChatConnection,
  testRealtimeConnection
} from '../lib/chat';
import { ChatMessageWithUserInfo } from '../types/chat';
import UserStatsTooltip from './UserStatsTooltip';
import { DEFAULT_USER_IMAGE, FALLBACK_USER_IMAGE } from '../utils/constants';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { connected, walletAddress } = useWalletContext();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessageWithUserInfo[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatSubscription, setChatSubscription] = useState<any>(null);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Tooltip state
  const [hoveredUser, setHoveredUser] = useState<{
    userAddress: string;
    username: string;
    profileImageUrl?: string | null;
    position: { x: number; y: number };
  } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Load messages when chat opens
  useEffect(() => {
    if (showChat && connected) {
      loadMessages();
      setupRealTimeSubscription();
    } else {
      // Clean up subscription and polling when chat closes
      if (chatSubscription) {
        unsubscribeFromChatMessages(chatSubscription);
        setChatSubscription(null);
      }
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    }

    return () => {
      if (chatSubscription) {
        unsubscribeFromChatMessages(chatSubscription);
      }
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [showChat, connected]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (showChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showChat]);

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    setError(null);

    try {
      // Test database connection first
      const connectionTest = await testChatConnection();
      if (!connectionTest.success) {
        console.error('Database connection test failed:', connectionTest);
        throw new Error(`Database connection failed: ${connectionTest.error}`);
      }

      const fetchedMessages = await getRecentChatMessages(50);
      // Reverse to show oldest first (chronological order)
      setMessages(fetchedMessages.reverse());
      
      // Test realtime connection after successful message load
      const realtimeTest = await testRealtimeConnection();
      if (!realtimeTest.success) {
        console.warn('Realtime connection test failed:', realtimeTest.error);
        // Don't throw error, just log warning - chat will work without realtime
      }
      
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const startPollingMode = () => {
    // Clear any existing interval
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    // Poll for new messages every 10 seconds
    const interval = setInterval(async () => {
      if (showChat && connected) {
        try {
          const fetchedMessages = await getRecentChatMessages(50);
          const newMessages = fetchedMessages.reverse();
          
          // Only update if we have different messages (to avoid unnecessary re-renders)
          if (JSON.stringify(newMessages) !== JSON.stringify(messages)) {
            setMessages(newMessages);
          }
        } catch (err) {
          console.error('Error polling for messages:', err);
        }
      }
    }, 10000); // Poll every 10 seconds

    setRefreshInterval(interval);
    console.log('Polling mode enabled - checking for new messages every 10 seconds');
  };

  const setupRealTimeSubscription = () => {
    if (chatSubscription) {
      unsubscribeFromChatMessages(chatSubscription);
    }

    const subscription = subscribeToChatMessages(
      (newMessage) => {
        try {
          // Convert to ChatMessageWithUserInfo format
          const messageWithUserInfo: ChatMessageWithUserInfo = {
            id: newMessage.id,
            message: newMessage.message,
            user_address: newMessage.user_address,
            username: getDisplayUsername(newMessage.username, newMessage.user_address),
            profile_image_url: newMessage.profile_image_url,
            reply_to_id: newMessage.reply_to_id,
            reply_to_message: null,
            reply_to_username: null,
            created_at: newMessage.created_at,
            updated_at: newMessage.updated_at
          };

          setMessages(prev => [...prev, messageWithUserInfo]);
        } catch (err) {
          console.error('Error processing real-time message:', err);
        }
      },
      (error) => {
        console.error('Real-time subscription error:', error);
        // Fall back to polling mode instead of retrying
        console.log('Falling back to polling mode due to subscription error');
        startPollingMode();
      }
    );

    if (subscription) {
      setChatSubscription(subscription);
      // Clear any existing polling interval since real-time is working
      if (refreshInterval) {
        clearInterval(refreshInterval);
        setRefreshInterval(null);
      }
    } else {
      console.warn('Failed to create chat subscription, enabling polling mode');
      startPollingMode();
    }
  };

  const handleSendMessage = async () => {
    if (!connected || !walletAddress) {
      setError('Please connect your wallet to send messages.');
      return;
    }

    const validation = validateMessage(messageInput);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid message');
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const messageId = await sendChatMessage(messageInput.trim(), walletAddress);
      
      if (messageId) {
        setMessageInput('');
        // Message will be added via real-time subscription
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getUserInitials = (username: string): string => {
    return username
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const openChat = () => {
    if (!connected) {
      setError('Please connect your wallet to use live chat.');
      return;
    }
    setShowChat(true);
    setError(null);
  };

  // Handle username hover
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
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div className={`fixed left-0 top-[85px] h-[calc(100%-85px)] z-30 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Main Sidebar */}
      <div className="h-full w-80 bg-dark-800/95 backdrop-blur-sm border-r border-slate-700/40 flex flex-col">
        {/* Content - No top padding, no gap */}
        <div className="flex-1 px-4 pb-4 flex flex-col">
          {/* User Dashboard Button - With balanced margins */}
          <div className="mt-4 mb-4">
            <Link 
              to="/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-secondary-600 to-primary-600 
                      hover:from-secondary-500 hover:to-primary-500 text-white rounded-lg transition-all duration-200
                      shadow-lg hover:shadow-glow transform hover:-translate-y-0.5 font-medium"
            >
              <User size={20} />
              <span>User Dashboard</span>
              <ArrowRight size={16} className="ml-auto" />
            </Link>
          </div>
          
          {/* Divider */}
          <div className="border-t border-slate-700/40 mb-4"></div>
          
          {/* Community Section */}
          <nav className="space-y-2 mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Community</h3>
            <button 
              onClick={openChat}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-gray-100 hover:bg-dark-850/70 rounded-lg transition-all duration-200"
            >
              <MessageSquare size={20} className="text-gray-400" />
              <span className="font-medium">Live Chat</span>
              <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </button>
          </nav>
          
          {/* Spacer to push the bottom sections down */}
          <div className="flex-grow"></div>
          
          {/* Resources Section */}
          <div className="mb-6">
            <div className="border-t border-slate-700/40 pt-6 mb-4"></div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Resources</h3>
            <nav className="space-y-2">
              <a 
                href="https://wagerfi.gitbook.io/wagerfi-docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-gray-100 hover:bg-dark-850/70 rounded-lg transition-all duration-200"
              >
                <FileText size={20} className="text-gray-400" />
                <span className="font-medium">Documentation</span>
                <ExternalLink size={14} className="ml-auto text-gray-500" />
              </a>
              
              <a 
                href="https://wagerfi.gitbook.io/wagerfi-docs/roadmap" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-gray-100 hover:bg-dark-850/70 rounded-lg transition-all duration-200"
              >
                <Zap size={20} className="text-gray-400" />
                <span className="font-medium">Roadmap</span>
                <ExternalLink size={14} className="ml-auto text-gray-500" />
              </a>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-gray-100 hover:bg-dark-850/70 rounded-lg transition-all duration-200">
                <Shield size={20} className="text-gray-400" />
                <span className="font-medium">Privacy Policy</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-gray-100 hover:bg-dark-850/70 rounded-lg transition-all duration-200">
                <Scale size={20} className="text-gray-400" />
                <span className="font-medium">Terms & Conditions</span>
              </button>
            </nav>
          </div>
          
          {/* Social Media Links */}
          <div className="border-t border-slate-700/40 pt-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Connect</h3>
            <div className="flex justify-center gap-3 px-3">
              <a 
                href="https://x.com/WagerDefi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-dark-850 hover:bg-gradient-to-r hover:from-secondary-600/20 hover:to-primary-600/20 rounded-lg text-gray-400 hover:text-gray-300 transition-all duration-200 border border-slate-700/40 hover:border-secondary-600/30"
                title="Follow us on X"
              >
                <X size={18} />
              </a>
              
              <button 
                className="w-10 h-10 flex items-center justify-center bg-dark-850 rounded-lg text-gray-500 cursor-not-allowed border border-slate-700/40 opacity-50"
                title="Discord - Coming Soon"
                disabled
              >
                <MessageCircle size={18} />
              </button>
              
              <button 
                className="w-10 h-10 flex items-center justify-center bg-dark-850 rounded-lg text-gray-500 cursor-not-allowed border border-slate-700/40 opacity-50"
                title="Telegram - Coming Soon"
                disabled
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Chat Panel */}
      {showChat && (
        <div className="absolute inset-0 bg-dark-800/95 backdrop-blur-sm border-r border-slate-700/40">
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700/40 flex items-center gap-3 bg-gradient-to-r from-secondary-600/10 to-primary-600/10">
              <button 
                onClick={() => setShowChat(false)}
                className="p-1 hover:bg-dark-850 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-400" />
              </button>
              <h2 className="font-semibold text-gray-200">Live Chat</h2>
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={loadMessages}
                  disabled={isLoadingMessages}
                  className="p-1 hover:bg-dark-850 rounded-lg transition-colors text-gray-400 hover:text-gray-300"
                  title="Refresh messages"
                >
                  <svg 
                    className={`w-4 h-4 ${isLoadingMessages ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <div className={`w-2 h-2 rounded-full ${
                  chatSubscription ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></div>
              </div>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/20 border-b border-red-700/30 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="ml-auto text-red-400 hover:text-red-300"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoadingMessages ? (
                <div className="flex justify-center items-center h-full">
                  <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border border-primary-600/30 flex items-center justify-center text-primary-300 text-sm font-medium flex-shrink-0">
                        {message.profile_image_url ? (
                          <img 
                            src={message.profile_image_url} 
                            alt={message.username}
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DEFAULT_USER_IMAGE;
                              (e.target as HTMLImageElement).onerror = () => {
                                (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                              };
                            }}
                          />
                        ) : (
                          <img 
                            src={DEFAULT_USER_IMAGE} 
                            alt="WagerFi Profile" 
                            className="w-full h-full rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p 
                            className="text-sm font-medium text-gray-300 truncate cursor-pointer hover:text-primary-400 transition-colors select-none hover:underline"
                            onMouseEnter={(e) => handleUsernameHover(e, message.user_address, message.username, message.profile_image_url)}
                            onMouseLeave={handleUsernameHoverLeave}
                          >
                            {message.username}
                          </p>
                          {message.user_address === walletAddress && (
                            <span className="text-xs bg-primary-900/30 text-primary-400 px-1.5 py-0.5 rounded-full">You</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 break-words">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatMessageTime(message.created_at)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare size={48} className="text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-2">No messages yet</p>
                  <p className="text-sm text-gray-500">Be the first to start the conversation!</p>
                </div>
              )}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-slate-700/40 bg-dark-850/50">
              {connected ? (
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={isSending}
                    maxLength={2000}
                    className="flex-1 bg-dark-850 border border-slate-700/40 rounded-lg px-3 py-2 text-gray-200 
                             placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600/50
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isSending || !messageInput.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 hover:from-secondary-500 hover:to-primary-500 
                             text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-glow
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-secondary-600 disabled:hover:to-primary-600
                             disabled:transform-none disabled:shadow-none flex items-center gap-2"
                  >
                    {isSending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    Send
                  </button>
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-sm text-gray-400">Connect your wallet to join the chat</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* User Stats Tooltip */}
      {hoveredUser && (
        <UserStatsTooltip
          userAddress={hoveredUser.userAddress}
          username={hoveredUser.username}
          profileImageUrl={hoveredUser.profileImageUrl}
          position={hoveredUser.position}
          onClose={closeTooltip}
        />
      )}
    </div>
  );
};

export default Sidebar;