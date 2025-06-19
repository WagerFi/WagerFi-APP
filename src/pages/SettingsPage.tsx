import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle,
  Shield,
  Clock,
  Bell,
  User,
  ExternalLink,
  Copy,
  Key,
  HelpCircle,
  FileText,
  MessageSquare,
  ChevronRight,
  Camera,
  Upload
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import { useWalletContext } from '../contexts/WalletContext';
import { getDisplayUsername } from '../lib/chat';
import { useNotificationHelpers } from '../hooks/useNotificationHelpers';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { connected, walletAddress, userProfile, updateProfile } = useWalletContext();
  const { notifyAddressCopied, notifyUsernameUpdated, notifyProfileUpdated } = useNotificationHelpers();
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Notification settings
  const [notifyWagerAccepted, setNotifyWagerAccepted] = useState(true);
  const [notifyWagerSettled, setNotifyWagerSettled] = useState(true);
  const [notifyMarketingUpdates, setNotifyMarketingUpdates] = useState(false);
  
  // Profile edit state
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameValue, setUsernameValue] = useState(userProfile?.username || '');
  
  // Profile image state
  const [selectedImage, setSelectedImage] = useState<string>(userProfile?.profile_image_url || '');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle username update
  const handleUsernameUpdate = async () => {
    if (!userProfile || !connected) return;
    
    const newUsername = usernameValue.trim() || null; // Allow null for empty username
    if (newUsername !== userProfile.username) {
      await updateProfile({
        username: newUsername
      });
      if (newUsername) {
        notifyUsernameUpdated(newUsername);
      }
    }
    
    setIsEditingUsername(false);
  };

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      notifyAddressCopied();
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle profile image update
  const handleImageUpdate = async () => {
    if (!userProfile || !connected || !selectedImage || selectedImage === userProfile.profile_image_url) return;
    
    setIsUploadingImage(true);
    try {
      await updateProfile({
        profile_image_url: selectedImage
      });
      notifyProfileUpdated();
    } catch (error) {
      console.error('Error updating profile image:', error);
      alert('Failed to update profile image');
    } finally {
      setIsUploadingImage(false);
    }
  };
  
  // Sync selectedImage with userProfile changes
  React.useEffect(() => {
    setSelectedImage(userProfile?.profile_image_url || '');
  }, [userProfile?.profile_image_url]);
  
  // Check if user is authenticated, if not redirect to homepage
  React.useEffect(() => {
    if (!connected || !walletAddress) {
      navigate('/');
    }
  }, [connected, walletAddress, navigate]);

  // If not connected, show a message to connect wallet
  if (!connected || !walletAddress) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-gradient">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-8 text-center max-w-md">
            <AlertCircle size={48} className="mx-auto mb-4 text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Wallet Not Connected</h2>
            <p className="text-gray-300 mb-6">Please connect your wallet to view your settings.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-5 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-lg font-medium"
            >
              Return to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      {/* Unified Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-600/15 to-primary-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-gradient-to-br from-primary-600/10 to-secondary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Connecting lines/grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <Header />
      <DashboardSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={`flex-1 px-6 py-8 transition-all duration-300 ${isSidebarOpen ? 'ml-80 mt-[85px]' : 'ml-0 mt-[85px]'}`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-100 mb-8">Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Settings */}
            <div className="lg:col-span-2">
              <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-100 mb-6">Profile Settings</h2>
                
                {/* Profile Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Profile Image
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-dark-850 border-2 border-primary-500 flex items-center justify-center">
                        {selectedImage ? (
                          <img 
                            src={selectedImage} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/default-avatar.png';
                            }}
                          />
                        ) : (
                          <User size={36} className="text-gray-500" />
                        )}
                      </div>
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      <button 
                        onClick={handleUploadClick}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center border-2 border-dark-850 text-white hover:bg-primary-500 transition-colors"
                      >
                        <Camera size={16} />
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={handleUploadClick}
                          className="px-3 py-2 bg-dark-850 hover:bg-dark-800 text-gray-300 border border-slate-700/40 rounded-md transition-colors flex items-center gap-2 text-sm"
                        >
                          <Upload size={16} />
                          Choose Image
                        </button>
                        
                        {selectedImage && selectedImage !== userProfile?.profile_image_url && (
                          <button
                            onClick={handleImageUpdate}
                            disabled={isUploadingImage}
                            className="px-3 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploadingImage ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              'Save Image'
                            )}
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 5MB.</p>
                    </div>
                  </div>
                </div>
                
                {/* Username */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Username
                  </label>
                  {isEditingUsername ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={usernameValue}
                        onChange={(e) => setUsernameValue(e.target.value)}
                        placeholder={`Leave empty to use ${walletAddress?.slice(-8) || 'wallet address'}`}
                        className="w-full px-3 py-2 bg-dark-850 border border-slate-700/40 rounded-md text-gray-200 
                                 focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600/50 focus:outline-none
                                 placeholder-gray-500"
                      />
                      <button
                        onClick={handleUsernameUpdate}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingUsername(false);
                          setUsernameValue(userProfile?.username || '');
                        }}
                        className="px-4 py-2 bg-dark-850 hover:bg-dark-800 text-gray-400 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="w-full px-3 py-2 bg-dark-850 border border-slate-700/40 rounded-md text-gray-200">
                        {getDisplayUsername(userProfile?.username, walletAddress || '')}
                      </div>
                      <button
                        onClick={() => setIsEditingUsername(true)}
                        className="ml-2 px-4 py-2 bg-dark-850 hover:bg-dark-800 text-primary-400 border border-slate-700/40 rounded-md transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {userProfile?.username 
                      ? 'Your custom username is displayed in chat and wagers' 
                      : `Currently showing last 8 digits of wallet address (${walletAddress?.slice(-8)})`
                    }
                  </p>
                </div>
                
                {/* Wallet Address */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Wallet Address
                  </label>
                  <div className="flex items-center">
                    <div className="w-full px-3 py-2 bg-dark-850 border border-slate-700/40 rounded-md text-gray-200 overflow-hidden text-ellipsis">
                      {walletAddress}
                    </div>
                    <button
                      onClick={copyWalletAddress}
                      className="ml-2 w-10 h-10 flex items-center justify-center bg-dark-850 hover:bg-dark-800 
                               text-primary-400 border border-slate-700/40 rounded-md transition-colors"
                      title="Copy wallet address"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                
                <button className="px-4 py-2 text-gray-300 hover:text-primary-400 transition-colors">
                  Manage Profile
                </button>
              </div>
              
              {/* Notification Settings */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-100 mb-6">Notification Settings</h2>
                
                <div className="space-y-5">
                  {/* Wager Accepted */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Wager Accepted</p>
                      <p className="text-sm text-gray-400">Notify when someone accepts your wager</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifyWagerAccepted}
                        onChange={() => setNotifyWagerAccepted(!notifyWagerAccepted)}
                      />
                      <div className="w-11 h-6 bg-dark-850 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray-400 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-checked:after:bg-white peer-checked:after:border-white"></div>
                    </label>
                  </div>
                  
                  {/* Wager Settled */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Wager Settled</p>
                      <p className="text-sm text-gray-400">Notify when a wager is settled</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifyWagerSettled}
                        onChange={() => setNotifyWagerSettled(!notifyWagerSettled)}
                      />
                      <div className="w-11 h-6 bg-dark-850 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray-400 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-checked:after:bg-white peer-checked:after:border-white"></div>
                    </label>
                  </div>
                  
                  {/* Marketing Updates */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Marketing Updates</p>
                      <p className="text-sm text-gray-400">Receive updates about new features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifyMarketingUpdates}
                        onChange={() => setNotifyMarketingUpdates(!notifyMarketingUpdates)}
                      />
                      <div className="w-11 h-6 bg-dark-850 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray-400 after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 peer-checked:after:bg-white peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Security & Help and Resources */}
            <div className="lg:col-span-1">
              {/* Security Settings */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                  <Shield size={18} className="text-primary-400" />
                  Security
                </h2>
                
                <div className="space-y-5">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Two-Factor Authentication</p>
                    </div>
                    <div className="px-3 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      Coming Soon
                    </div>
                  </div>
                  
                  {/* Transaction Signing */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Transaction Signing</p>
                    </div>
                    <div className="px-3 py-1 bg-green-900/30 text-green-400 rounded-md text-xs font-medium border border-green-700/30">
                      Enabled
                    </div>
                  </div>
                  
                  {/* Session Timeout */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-200 font-medium">Session Timeout</p>
                    </div>
                    <div className="text-gray-300 text-sm">
                      30 minutes
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Help and Resources */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-slate-700/40 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                  <HelpCircle size={18} className="text-primary-400" />
                  Help & Resources
                </h2>
                
                <div className="space-y-3">
                  {/* FAQ */}
                  <a href="#" className="flex items-center justify-between p-3 bg-dark-850 hover:bg-dark-900 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gray-400" />
                      <span className="text-gray-300">FAQ</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                  </a>
                  
                  {/* Documentation */}
                  <a href="#" className="flex items-center justify-between p-3 bg-dark-850 hover:bg-dark-900 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gray-400" />
                      <span className="text-gray-300">Documentation</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                  </a>
                  
                  {/* Contact Support */}
                  <a href="#" className="flex items-center justify-between p-3 bg-dark-850 hover:bg-dark-900 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare size={18} className="text-gray-400" />
                      <span className="text-gray-300">Contact Support</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;