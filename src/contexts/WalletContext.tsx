import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getProfile, createOrUpdateProfile, UserProfile } from '../lib/supabase';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Context interface
interface WalletContextType {
  connected: boolean;
  publicKey: PublicKey | null;
  walletAddress: string | null;
  connecting: boolean;
  disconnecting: boolean;
  balance: number | null;
  userProfile: UserProfile | null;
  isFetchingProfile: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<UserProfile | null>;
}

// Create the context with a default value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Custom provider component
export const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set up network
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Set up wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletContextContent>
            {children}
          </WalletContextContent>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

// Inner content component that uses the useWallet hook
const WalletContextContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWallet();
  const {
    publicKey,
    connected,
    connecting,
    disconnecting,
    select,
    disconnect,
  } = wallet;
  
  const [balance, setBalance] = useState<number | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [connection] = useState(new Connection(clusterApiUrl(WalletAdapterNetwork.Devnet)));
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Wait for wallet to be initialized
  useEffect(() => {
    if (wallet) {
      setIsInitialized(true);
    }
  }, [wallet]);
  
  const walletAddress = useMemo(() => 
    publicKey ? publicKey.toString() : null, 
    [publicKey]
  );
  
  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !connected) {
        setBalance(null);
        return;
      }
      
      try {
        const walletBalance = await connection.getBalance(publicKey);
        setBalance(walletBalance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(null);
      }
    };
    
    fetchBalance();
    
    // Set up interval to refresh balance
    const intervalId = setInterval(fetchBalance, 30000); // Every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [publicKey, connected, connection]);
  
  // Fetch user profile function
  const fetchProfile = useCallback(async (): Promise<UserProfile | null> => {
    if (!walletAddress) {
      return null;
    }
    
    setIsFetchingProfile(true);
    
    try {
      // First, check if the profile exists
      const profile = await getProfile(walletAddress);
      
      if (profile) {
        // If profile exists, update state and return it
        setUserProfile(profile);
        return profile;
      } else {
        // If profile doesn't exist, create a new one
        console.log('Creating new user profile for wallet:', walletAddress);
        
        // Retry profile creation up to 3 times
        for (let i = 0; i < 3; i++) {
          const newProfile = await createOrUpdateProfile({
            wallet_address: walletAddress,
            wins: 0,
            losses: 0,
            profit_amount: 0
          });
          
          if (newProfile) {
            setUserProfile(newProfile);
            return newProfile;
          }
          
          console.warn(`Attempt ${i + 1} to create profile failed, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        }
        
        console.error('Failed to create new user profile after multiple attempts');
        return null;
      }
    } catch (error) {
      console.error('Error fetching/creating user profile:', error);
      return null;
    } finally {
      setIsFetchingProfile(false);
    }
  }, [walletAddress]);
  
  // Refresh profile on demand
  const refreshProfile = useCallback(async (): Promise<UserProfile | null> => {
    return fetchProfile();
  }, [fetchProfile]);
  
  // Fetch user profile when wallet connects
  useEffect(() => {
    if (walletAddress && connected) {
      fetchProfile();
    } else if (!connected) {
      // Clear profile when disconnected
      setUserProfile(null);
    }
  }, [walletAddress, connected, fetchProfile]);
  
  // Connect wallet function
  const connectWallet = useCallback(async () => {
    try {
      // First try Phantom
      select('Phantom');
    } catch (error) {
      try {
        // Fall back to Solflare if Phantom fails
        select('Solflare');
      } catch (innerError) {
        console.error('Failed to connect wallet:', innerError);
      }
    }
  }, [select]);
  
  // Disconnect wallet function
  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
      // Clear user profile on disconnect
      setUserProfile(null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  }, [disconnect]);
  
  // Update user profile
  const updateProfile = useCallback(async (profile: Partial<UserProfile>): Promise<UserProfile | null> => {
    if (!walletAddress) return null;
    
    try {
      const updatedProfile = await createOrUpdateProfile({
        ...profile,
        wallet_address: walletAddress
      });
      
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        return updatedProfile;
      }
      
      return null;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }, [walletAddress]);
  
  const contextValue = {
    connected,
    publicKey,
    walletAddress,
    connecting,
    disconnecting,
    balance,
    userProfile,
    isFetchingProfile,
    connectWallet,
    disconnectWallet,
    updateProfile,
    refreshProfile
  };
  
  // Don't render children until wallet is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <h2 className="text-xl titillium-web-bold text-white mb-4">Initializing Wallet...</h2>
          <p className="titillium-web-regular text-gray-400">Please wait while we set up the wallet connection.</p>
        </div>
      </div>
    );
  }
  
  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the wallet context
export const useWalletContext = (): WalletContextType => {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletContextProvider');
  }
  
  return context;
};