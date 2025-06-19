import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../lib/supabase';
import ProfilePopover from '../components/ProfilePopover';

interface ProfileContextType {
  showProfile: boolean;
  openProfile: (profile: UserProfile | null) => void;
  closeProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  const openProfile = (profile: UserProfile | null) => {
    setCurrentProfile(profile);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
    setCurrentProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ showProfile, openProfile, closeProfile }}>
      {children}
      {showProfile && (
        <ProfilePopover 
          userProfile={currentProfile}
          onClose={closeProfile}
        />
      )}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};