import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, Check, User, Trophy, BarChart3 } from 'lucide-react';
import { UserProfile } from '../lib/supabase';
import { useWalletContext } from '../contexts/WalletContext';
import { DEFAULT_USER_IMAGE, FALLBACK_USER_IMAGE } from '../utils/constants';
import { getDisplayUsername } from '../lib/chat';

interface ProfilePopoverProps {
  userProfile: UserProfile | null;
  onClose: () => void;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({ userProfile, onClose }) => {
  const navigate = useNavigate();
  const { updateProfile, walletAddress } = useWalletContext();
  const [username, setUsername] = useState(userProfile?.username || '');
  const [isEditing, setIsEditing] = useState(!userProfile?.username);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const defaultProfileImage = DEFAULT_USER_IMAGE;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string>(userProfile?.profile_image_url || defaultProfileImage);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image must be less than 5MB');
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

  // Handle save profile
  const saveProfile = async () => {
    // Username is now optional since we have fallback to wallet address
    // if (!username.trim()) {
    //   setError('Username is required');
    //   return;
    // }
    
    setIsSaving(true);
    setError('');
    
    try {
      const updated = await updateProfile({
        username: username.trim() || null, // Allow null for empty username
        profile_image_url: selectedImage
      });
      
      if (updated) {
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate win rate
  const calculateWinRate = (): string => {
    if (!userProfile) return '0%';
    
    const totalGames = userProfile.wins + userProfile.losses;
    if (totalGames === 0) return '0%';
    
    const winRate = (userProfile.wins / totalGames) * 100;
    return `${winRate.toFixed(0)}%`;
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative min-h-[calc(100vh-8rem)] flex items-center my-16">
      <div className="relative bg-dark-850 rounded-lg shadow-xl w-full max-w-md border border-slate-700/40">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-700 to-primary-700 p-4 text-white flex justify-between items-center rounded-t-lg">
          <h3 className="text-xl font-semibold">My Profile</h3>
          <button 
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-dark-800 border-2 border-primary-500 flex items-center justify-center">
                <img 
                  src={selectedImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                                  onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_USER_IMAGE;
                  (e.target as HTMLImageElement).onerror = () => {
                    (e.target as HTMLImageElement).src = FALLBACK_USER_IMAGE;
                  };
                }}
                />
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
          </div>
          
          
          {/* Username */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-300">Username</label>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-primary-400 hover:text-primary-300"
                >
                  Edit
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={`Enter a username or leave empty to use ${walletAddress?.slice(-8) || 'wallet address'}`}
                  className="w-full px-3 py-2 bg-dark-800 border border-slate-700/40 rounded-md text-gray-200 
                           focus:ring-2 focus:ring-primary-600/50 focus:border-primary-600 focus:outline-none
                           placeholder-gray-500"
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              </div>
            ) : (
              <p className="text-lg font-medium text-gray-200">{getDisplayUsername(userProfile?.username, walletAddress || '')}</p>
            )}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-dark-800/60 border border-slate-700/40 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Wins</p>
              <p className="text-xl font-bold text-green-400">{userProfile?.wins || 0}</p>
            </div>
            
            <div className="bg-dark-800/60 border border-slate-700/40 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Losses</p>
              <p className="text-xl font-bold text-red-400">{userProfile?.losses || 0}</p>
            </div>
            
            <div className="bg-dark-800/60 border border-slate-700/40 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">Win Rate</p>
              <p className="text-xl font-bold text-primary-400">{calculateWinRate()}</p>
            </div>
          </div>
          
          {/* P/L */}
          <div className="bg-dark-800/60 border border-slate-700/40 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-400">Total Profit/Loss</p>
              <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                userProfile?.profit_amount ? (
                  userProfile.profit_amount > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                ) : 'bg-gray-800 text-gray-400'
              }`}>
                {userProfile?.profit_amount ? (
                  userProfile.profit_amount > 0 ? 'Profit' : 'Loss'
                ) : 'Neutral'}
              </div>
            </div>
            <p className={`text-xl font-bold ${
              userProfile?.profit_amount ? (
                userProfile.profit_amount > 0 ? 'text-green-400' : 'text-red-400'
              ) : 'text-gray-300'
            }`}>
              {userProfile?.profit_amount ? (
                userProfile.profit_amount > 0 ? 
                `+${userProfile.profit_amount.toFixed(2)}` : 
                userProfile.profit_amount.toFixed(2)
              ) : '0.00'} SOL
            </p>
          </div>
          
          {/* Dashboard Link */}
          <div className="pt-2">
            <button
              onClick={goToDashboard}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-secondary-600 to-primary-600 
                      hover:from-secondary-500 hover:to-primary-500 text-white font-medium rounded-lg 
                      shadow hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <BarChart3 size={18} />
              <span>View Dashboard</span>
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-700/40 flex justify-end bg-dark-850">
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setUsername(userProfile?.username || '');
                  setSelectedImage(userProfile?.profile_image_url || defaultProfileImage);
                  setIsEditing(false);
                  setError('');
                }}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={saveProfile}
                disabled={isSaving}
                className="px-4 py-2 bg-gradient-to-r from-secondary-600 to-primary-600 
                         hover:from-secondary-500 hover:to-primary-500 text-white rounded-lg 
                         shadow hover:shadow-glow transition-all flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePopover;