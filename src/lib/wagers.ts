import { supabase, supabaseAdmin } from './supabase';
import { UserProfile } from './supabase';

// Types for crypto and sports wagers
export interface TokenSnapshot {
  id: number;
  name: string;
  symbol: string;
  logo?: string;
  slug?: string;
  current_price?: number;
}

export interface CryptoWager {
  id: string;
  creator_address: string;
  opponent_address: string | null;
  token_id: number;
  sol_amount: number;
  description: string;
  creator_position: string;
  opponent_position: string | null;
  status: 'open' | 'matched' | 'settled' | 'cancelled';
  created_at: string;
  updated_at: string;
  expires_at: string;
  resolved_at: string | null;
  winner_address: string | null;
  reserved_address: string | null;
  token_snapshot?: TokenSnapshot; // New field for storing token details
  target_price?: number; // New field for storing target price
  wager_type?: 'reach_target' | 'price_at_deadline'; // New field for wager resolution type

  // Joined data (not in DB)
  creator_profile?: UserProfile;
  opponent_profile?: UserProfile;
  token_name?: string;
  token_symbol?: string;
}

export interface TeamSnapshot {
  id: number;
  name: string;
  logo?: string;
  country?: string;
  league?: string;
}

export interface EventSnapshot {
  id: number;
  name?: string;
  league?: {
    id?: number;
    name?: string;
    country?: string;
    logo?: string;
  };
  date?: string;
  time?: string;
  timezone?: string;
  venue?: {
    id?: number;
    name?: string;
    city?: string;
    country?: string;
  };
  slug?: string;
}

export interface SportsWager {
  id: string;
  creator_address: string;
  opponent_address: string | null;
  creator_team_id: number;
  opponent_team_id: number | null;
  sol_amount: number;
  event_id: number;
  sport_type: string;
  status: 'open' | 'live' | 'settled' | 'cancelled';
  expires_at: string;
  event_date: string;
  event_time: string | null;
  event_timezone: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  winner_address: string | null;
  description: string;
  reserved_address: string | null;

  // Snapshot data (stored in DB as JSONB)
  creator_team_snapshot?: TeamSnapshot;
  opponent_team_snapshot?: TeamSnapshot;
  event_snapshot?: EventSnapshot;

  // Joined data (not in DB)
  creator_profile?: UserProfile;
  opponent_profile?: UserProfile;
  creator_team_name?: string;
  creator_team_logo?: string;
  opponent_team_name?: string;
  opponent_team_logo?: string;
  event_name?: string;
  league_name?: string;
  league_logo?: string;
}

export type Wager = CryptoWager | SportsWager;

export interface WagerFilter {
  type?: 'all' | 'crypto' | 'sports';
  status?: 'all' | 'open' | 'live' | 'settled' | 'cancelled';
  sort?: 'newest' | 'oldest' | 'amount';
}

// Helper to determine if a wager is a crypto wager
export function isCryptoWager(wager: Wager): wager is CryptoWager {
  return 'token_id' in wager;
}

// Helper to determine if a wager is a sports wager
export function isSportsWager(wager: Wager): wager is SportsWager {
  return 'sport_type' in wager;
}

// Token cache for reducing API calls
interface TokenCacheEntry {
  data: TokenSnapshot;
  timestamp: number;
}
const tokenCache = new Map<number, TokenCacheEntry>();
const TOKEN_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Token list cache for reducing API calls
interface TokenListCacheEntry {
  data: any[];
  timestamp: number;
}
let tokenListCache: TokenListCacheEntry | null = null;
const TOKEN_LIST_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Function to get the cached token list or fetch a new one
export async function getCachedTokenList(): Promise<any[]> {
  // Check if we have valid cached data
  const now = Date.now();
  if (tokenListCache && now - tokenListCache.timestamp < TOKEN_LIST_CACHE_TTL) {
    console.log('Using cached token list');
    return tokenListCache.data;
  }

  // Need to fetch new data
  const cmcApiKey = import.meta.env.VITE_CMC_API_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!cmcApiKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('API keys not found');
    return [];
  }

  try {
    console.log('Fetching token list from API');

    const response = await fetch(`${supabaseUrl}/functions/v1/token-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        apiKey: cmcApiKey,
        limit: 1000, // Top 1000 tokens by market cap
        listingStatus: 'active'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token list: ${response.status}`);
    }

    const data = await response.json();

    if (data.data) {
      // Sort by CMC rank
      const sortedTokens = [...data.data].sort((a, b) => (a.rank || 9999) - (b.rank || 9999));

      // Update cache
      tokenListCache = {
        data: sortedTokens,
        timestamp: now
      };

      return sortedTokens;
    }

    return [];
  } catch (err) {
    console.error('Error fetching token list:', err);

    // Return empty array on error, or cached data if available
    return tokenListCache?.data || [];
  }
}

// Get all wagers with filters
export async function getWagers(filter: WagerFilter = {}): Promise<Wager[]> {
  const cryptoWagers = await getCryptoWagers(filter);
  const sportsWagers = await getSportsWagers(filter);

  let allWagers: Wager[] = [];

  if (filter.type === 'crypto') {
    allWagers = cryptoWagers;
  } else if (filter.type === 'sports') {
    allWagers = sportsWagers;
  } else {
    allWagers = [...cryptoWagers, ...sportsWagers];
  }

  // Sort wagers
  if (filter.sort === 'newest') {
    allWagers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (filter.sort === 'oldest') {
    allWagers.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  } else if (filter.sort === 'amount') {
    allWagers.sort((a, b) => b.sol_amount - a.sol_amount);
  } else {
    // Default to newest first
    allWagers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return allWagers;
}

// Get crypto wagers
async function getCryptoWagers(filter: WagerFilter = {}): Promise<CryptoWager[]> {
  let query = supabase
    .from('crypto_wagers')
    .select(`
      *,
      creator_profile:users!crypto_wagers_creator_address_fkey(wallet_address, username, profile_image_url),
      opponent_profile:users!crypto_wagers_opponent_address_fkey(wallet_address, username, profile_image_url)
    `);

  // Apply status filter
  if (filter.status && filter.status !== 'all') {
    // Map 'live' to 'matched' for crypto wagers if filter is 'live'
    const cryptoStatus = filter.status === 'live' ? 'matched' : filter.status;
    query = query.eq('status', cryptoStatus);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching crypto wagers:', error);
    return [];
  }

  // Transform data to match our CryptoWager interface
  const cryptoWagers: CryptoWager[] = data.map(wager => {
    // Extract and format nested creator profile
    const creatorProfile = wager.creator_profile as any;
    const opponentProfile = wager.opponent_profile as any;

    // DO NOT convert 'matched' status to 'live' for crypto wagers
    // This was causing the issue with the resolve button not showing

    // Parse token_snapshot if it exists
    const tokenSnapshot = wager.token_snapshot ?
      (typeof wager.token_snapshot === 'string'
        ? JSON.parse(wager.token_snapshot)
        : wager.token_snapshot) : undefined;

    const transformedWager: CryptoWager = {
      ...wager,
      id: wager.id,
      status: wager.status as any, // Keep original status
      creator_profile: creatorProfile ? {
        wallet_address: creatorProfile.wallet_address,
        username: creatorProfile.username,
        profile_image_url: creatorProfile.profile_image_url,
        wins: 0, // These will be filled with actual data if needed
        losses: 0,
        profit_amount: 0,
        created_at: '',
        updated_at: ''
      } : undefined,
      opponent_profile: opponentProfile ? {
        wallet_address: opponentProfile.wallet_address,
        username: opponentProfile.username,
        profile_image_url: opponentProfile.profile_image_url,
        wins: 0,
        losses: 0,
        profit_amount: 0,
        created_at: '',
        updated_at: ''
      } : undefined,
      token_snapshot: tokenSnapshot,
      target_price: wager.target_price
    };

    // If we have token snapshot data, use it for token_name and token_symbol
    if (tokenSnapshot) {
      transformedWager.token_name = tokenSnapshot.name;
      transformedWager.token_symbol = tokenSnapshot.symbol;
    }

    return transformedWager;
  });

  // For wagers without token snapshots, fetch token details
  const tokenDetailsPromises = cryptoWagers.map(async (wager) => {
    if (!wager.token_snapshot) {
      try {
        const tokenDetails = await getTokenDetails(wager.token_id);
        if (tokenDetails) {
          wager.token_name = tokenDetails.name;
          wager.token_symbol = tokenDetails.symbol;
        }
      } catch (err) {
        console.error(`Error fetching token details for ID ${wager.token_id}:`, err);
      }
    }
    return wager;
  });

  // Wait for all token details to be fetched
  return Promise.all(tokenDetailsPromises);
}

// Get sports wagers
async function getSportsWagers(filter: WagerFilter = {}): Promise<SportsWager[]> {
  let query = supabase
    .from('sports_wagers')
    .select(`
      *,
      creator_profile:users!sports_wagers_creator_address_fkey(wallet_address, username, profile_image_url),
      opponent_profile:users!sports_wagers_opponent_address_fkey(wallet_address, username, profile_image_url)
    `);

  // Apply status filter
  if (filter.status && filter.status !== 'all') {
    query = query.eq('status', filter.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching sports wagers:', error);
    return [];
  }

  // Transform data to match our SportsWager interface
  const sportsWagers: SportsWager[] = data.map(wager => {
    // Extract and format nested creator profile
    const creatorProfile = wager.creator_profile as any;
    const opponentProfile = wager.opponent_profile as any;

    // Parse the snapshot JSON data if available
    const creatorTeamSnapshot = wager.creator_team_snapshot ?
      (typeof wager.creator_team_snapshot === 'string'
        ? JSON.parse(wager.creator_team_snapshot)
        : wager.creator_team_snapshot) : undefined;

    const opponentTeamSnapshot = wager.opponent_team_snapshot ?
      (typeof wager.opponent_team_snapshot === 'string'
        ? JSON.parse(wager.opponent_team_snapshot)
        : wager.opponent_team_snapshot) : undefined;

    const eventSnapshot = wager.event_snapshot ?
      (typeof wager.event_snapshot === 'string'
        ? JSON.parse(wager.event_snapshot)
        : wager.event_snapshot) : undefined;

    const transformedWager: SportsWager = {
      ...wager,
      id: wager.id,
      creator_profile: creatorProfile ? {
        wallet_address: creatorProfile.wallet_address,
        username: creatorProfile.username,
        profile_image_url: creatorProfile.profile_image_url,
        wins: 0, // These will be filled with actual data if needed
        losses: 0,
        profit_amount: 0,
        created_at: '',
        updated_at: ''
      } : undefined,
      opponent_profile: opponentProfile ? {
        wallet_address: opponentProfile.wallet_address,
        username: opponentProfile.username,
        profile_image_url: opponentProfile.profile_image_url,
        wins: 0,
        losses: 0,
        profit_amount: 0,
        created_at: '',
        updated_at: ''
      } : undefined,
      creator_team_snapshot: creatorTeamSnapshot,
      opponent_team_snapshot: opponentTeamSnapshot,
      event_snapshot: eventSnapshot
    };

    // Use snapshot data if available, otherwise leave existing fields as is
    if (creatorTeamSnapshot) {
      transformedWager.creator_team_name = creatorTeamSnapshot.name;
      transformedWager.creator_team_logo = creatorTeamSnapshot.logo;
    }

    if (opponentTeamSnapshot) {
      transformedWager.opponent_team_name = opponentTeamSnapshot.name;
      transformedWager.opponent_team_logo = opponentTeamSnapshot.logo;
    }

    if (eventSnapshot) {
      transformedWager.event_name = eventSnapshot.name;

      // Set league name and logo from event snapshot
      if (eventSnapshot.league) {
        transformedWager.league_name = eventSnapshot.league.name;
        transformedWager.league_logo = eventSnapshot.league.logo;
      }
    }

    return transformedWager;
  });

  // Only fetch additional details for wagers that don't have snapshot data
  const wagersNeedingDetails = sportsWagers.filter(wager =>
    !wager.creator_team_snapshot ||
    !wager.event_snapshot
  );

  if (wagersNeedingDetails.length > 0) {
    console.log(`Fetching additional details for ${wagersNeedingDetails.length} legacy sports wagers without snapshots`);

    // Fetch team names, logos, and event details for each sports wager that needs them
    const enhancedWagersPromises = wagersNeedingDetails.map(async (wager) => {
      try {
        // Fetch creator team details if not already set from snapshot
        if (!wager.creator_team_name || !wager.creator_team_logo) {
          const creatorTeamDetails = await getTeamDetails(wager.creator_team_id, wager.sport_type);
          if (creatorTeamDetails) {
            wager.creator_team_name = creatorTeamDetails.name;
            wager.creator_team_logo = creatorTeamDetails.logo;
          }
        }

        // Fetch opponent team details if available and not already set from snapshot
        if (wager.opponent_team_id && (!wager.opponent_team_name || !wager.opponent_team_logo)) {
          const opponentTeamDetails = await getTeamDetails(wager.opponent_team_id, wager.sport_type);
          if (opponentTeamDetails) {
            wager.opponent_team_name = opponentTeamDetails.name;
            wager.opponent_team_logo = opponentTeamDetails.logo;
          }
        }

        // Fetch event details if not already set from snapshot
        if (!wager.league_name) {
          const eventDetails = await getEventDetails(wager.event_id, wager.sport_type);
          if (eventDetails) {
            wager.event_name = eventDetails.name;
            // Set the league name from event details
            wager.league_name = eventDetails.league;
            wager.league_logo = eventDetails.leagueLogo;
            // Only update date/time if not already set
            if (!wager.event_date) wager.event_date = eventDetails.date;
            if (!wager.event_time) wager.event_time = eventDetails.time;
          }
        }

        // For baseball, make sure league name is set
        if (wager.sport_type === 'baseball' && !wager.league_name) {
          wager.league_name = 'MLB';
        }
      } catch (err) {
        console.error(`Error fetching additional details for sports wager ${wager.id}:`, err);
      }

      return wager;
    });

    // Process legacy wagers that need details fetching
    const enhancedWagers = await Promise.all(enhancedWagersPromises);

    // Replace the wagers that needed enhancement
    const wagerMap = new Map(sportsWagers.map(w => [w.id, w]));
    enhancedWagers.forEach(w => {
      wagerMap.set(w.id, w);
    });

    return Array.from(wagerMap.values());
  }

  // Return wagers as is if they already have snapshot data
  return sportsWagers;
}

// Create a sports wager
export async function createSportsWager(wager: Partial<SportsWager>): Promise<SportsWager | null> {
  try {
    // Make sure required fields are present
    if (!wager.creator_address || !wager.creator_team_id || !wager.sol_amount ||
      !wager.event_id || !wager.sport_type || !wager.expires_at ||
      !wager.event_date || !wager.description) {
      throw new Error('Missing required fields for sports wager');
    }

    // Format the event_date to YYYY-MM-DD if it's not already
    let formattedEventDate = wager.event_date;

    // Check if the date is in DD/MM/YYYY format
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(wager.event_date)) {
      // Convert DD/MM/YYYY to YYYY-MM-DD
      const parts = wager.event_date.split('/');
      formattedEventDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    console.log('Creating sports wager with date:', formattedEventDate);

    // Prepare the wager data including snapshots
    const wagerData = {
      creator_address: wager.creator_address,
      creator_team_id: wager.creator_team_id,
      opponent_team_id: wager.opponent_team_id, // This might be undefined, which is OK for a new wager
      sol_amount: wager.sol_amount,
      event_id: wager.event_id,
      sport_type: wager.sport_type,
      expires_at: wager.expires_at,
      event_date: formattedEventDate,
      event_time: wager.event_time || null,
      event_timezone: wager.event_timezone || null,
      description: wager.description,
      status: 'open', // Default status for new wagers
      creator_team_snapshot: wager.creator_team_snapshot || null,
      opponent_team_snapshot: wager.opponent_team_snapshot || null,
      event_snapshot: wager.event_snapshot || null,
      reserved_address: wager.reserved_address || null
    };

    // Use supabaseAdmin to bypass RLS policies
    const { data, error } = await supabaseAdmin
      .from('sports_wagers')
      .insert(wagerData)
      .select()
      .single();

    if (error) {
      console.error('Error creating sports wager:', error);
      throw error;
    }

    // If successful, trigger notifications
    try {
      // Call the notification service
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        await fetch(`${supabaseUrl}/functions/v1/wager-notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            type: 'wager_created',
            data: {
              wager_id: data.id,
              creator_address: wager.creator_address,
              sol_amount: wager.sol_amount,
              wager_type: 'Sports'
            }
          })
        });
      }
    } catch (notificationError) {
      console.error('Error sending wager creation notification:', notificationError);
      // Don't fail the wager creation if notification fails
    }

    return data as SportsWager;
  } catch (err) {
    console.error('Failed to create sports wager:', err);
    throw new Error(`Failed to create sports wager: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// Create a crypto wager
export async function createCryptoWager(wager: Partial<CryptoWager>): Promise<CryptoWager | null> {
  try {
    // Make sure required fields are present
    if (!wager.creator_address || !wager.token_id || !wager.sol_amount ||
      !wager.description || !wager.creator_position || !wager.expires_at) {
      throw new Error('Missing required fields for crypto wager');
    }

    // Use supabaseAdmin to bypass RLS policies
    const { data, error } = await supabaseAdmin
      .from('crypto_wagers')
      .insert({
        creator_address: wager.creator_address,
        token_id: wager.token_id,
        sol_amount: wager.sol_amount,
        description: wager.description,
        creator_position: wager.creator_position,
        expires_at: wager.expires_at,
        status: 'open', // Default status for new wagers
        token_snapshot: wager.token_snapshot, // Include token snapshot data
        reserved_address: wager.reserved_address || null,
        target_price: wager.target_price, // Store the target price for the crypto wager
        wager_type: wager.wager_type // Store the wager type
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating crypto wager:', error);
      throw error;
    }

    // If successful, trigger notifications
    try {
      // Call the notification service
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        await fetch(`${supabaseUrl}/functions/v1/wager-notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            type: 'wager_created',
            data: {
              wager_id: data.id,
              creator_address: wager.creator_address,
              sol_amount: wager.sol_amount,
              wager_type: 'Crypto'
            }
          })
        });
      }
    } catch (notificationError) {
      console.error('Error sending wager creation notification:', notificationError);
      // Don't fail the wager creation if notification fails
    }

    return data as CryptoWager;
  } catch (err) {
    console.error('Failed to create crypto wager:', err);
    throw new Error(`Failed to create crypto wager: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// Accept a wager
export async function acceptWager(wagerId: string, type: 'crypto' | 'sports', walletAddress: string): Promise<boolean> {
  try {
    if (!walletAddress) {
      console.error('No wallet address provided');
      return false;
    }

    // First check if wager is reserved for a specific address and get wager details
    const table = type === 'crypto' ? 'crypto_wagers' : 'sports_wagers';
    const { data: wagerData, error: wagerError } = await supabase
      .from(table)
      .select('reserved_address, creator_address, sol_amount')
      .eq('id', wagerId)
      .single();

    if (wagerError) {
      console.error(`Error checking wager reservation:`, wagerError);
      return false;
    }

    // If wager is reserved for a specific address, check if the accepting user matches
    if (wagerData.reserved_address && wagerData.reserved_address !== walletAddress) {
      console.error(`This wager is reserved for a specific address: ${wagerData.reserved_address}`);
      throw new Error('This wager is reserved for another user');
    }

    // Using supabaseAdmin to bypass RLS policies
    const { data, error } = await supabaseAdmin.rpc(
      type === 'crypto' ? 'accept_crypto_wager' : 'accept_sports_wager',
      {
        wager_id: wagerId,
        accepting_address: walletAddress
      }
    );

    if (error) {
      console.error(`Error accepting ${type} wager:`, error);
      return false;
    }

    const success = data as boolean;

    // If successful, trigger notifications
    if (success && wagerData) {
      try {
        // Call the notification service
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseAnonKey) {
          await fetch(`${supabaseUrl}/functions/v1/wager-notifications`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseAnonKey}`
            },
            body: JSON.stringify({
              type: 'wager_accepted',
              data: {
                wager_id: wagerId,
                creator_address: wagerData.creator_address,
                opponent_address: walletAddress,
                sol_amount: wagerData.sol_amount
              }
            })
          });
        }
      } catch (notificationError) {
        console.error('Error sending wager acceptance notification:', notificationError);
        // Don't fail the wager acceptance if notification fails
      }
    }

    return success;
  } catch (err) {
    console.error(`Failed to accept ${type} wager:`, err);
    throw err;
  }
}

// Cancel a wager
export async function cancelWager(wagerId: string, type: 'crypto' | 'sports', walletAddress: string): Promise<boolean> {
  try {
    if (!walletAddress) {
      console.error('No wallet address provided');
      return false;
    }

    // Using supabaseAdmin to bypass RLS policies
    const { data, error } = await supabaseAdmin.rpc(
      type === 'crypto' ? 'cancel_crypto_wager' : 'cancel_sports_wager',
      {
        wager_id: wagerId,
        cancelling_address: walletAddress
      }
    );

    if (error) {
      console.error(`Error cancelling ${type} wager:`, error);
      return false;
    }

    return data as boolean;
  } catch (err) {
    console.error(`Failed to cancel ${type} wager:`, err);
    return false;
  }
}

// Settle a sports wager
export async function settleSportsWager(wagerId: string, winnerAddress: string): Promise<boolean> {
  try {
    if (!winnerAddress) {
      console.error('No winner address provided');
      return false;
    }

    // Get wager details before settling
    const { data: wagerData, error: wagerError } = await supabase
      .from('sports_wagers')
      .select('creator_address, opponent_address, sol_amount')
      .eq('id', wagerId)
      .single();

    if (wagerError) {
      console.error(`Error fetching sports wager:`, wagerError);
      return false;
    }

    // Using supabaseAdmin to bypass RLS policies
    const { data, error } = await supabaseAdmin.rpc(
      'settle_sports_wager',
      {
        wager_id: wagerId,
        input_winner_address: winnerAddress
      }
    );

    if (error) {
      console.error(`Error settling sports wager:`, error);
      return false;
    }

    const success = data as boolean;

    // If successful, trigger notifications
    if (success && wagerData) {
      try {
        // Call the notification service
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseAnonKey) {
          await fetch(`${supabaseUrl}/functions/v1/wager-notifications`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseAnonKey}`
            },
            body: JSON.stringify({
              type: 'wager_settled',
              data: {
                wager_id: wagerId,
                creator_address: wagerData.creator_address,
                opponent_address: wagerData.opponent_address,
                winner_address: winnerAddress,
                sol_amount: wagerData.sol_amount,
                winnings: wagerData.sol_amount * 2 // Winner gets double their stake
              }
            })
          });
        }
      } catch (notificationError) {
        console.error('Error sending wager settlement notification:', notificationError);
        // Don't fail the settlement if notification fails
      }
    }

    return success;
  } catch (err) {
    console.error(`Failed to settle sports wager:`, err);
    throw err;
  }
}

// Resolve a crypto wager based on current price
export async function resolveCryptoWager(wagerId: string): Promise<boolean> {
  try {
    if (!wagerId) {
      console.error('No wager ID provided');
      return false;
    }

    // Fetch the wager details first
    const { data: wager, error: wagerError } = await supabase
      .from('crypto_wagers')
      .select('*')
      .eq('id', wagerId)
      .single();

    if (wagerError) {
      console.error(`Error fetching crypto wager:`, wagerError);
      return false;
    }

    if (!wager) {
      console.error(`Crypto wager not found: ${wagerId}`);
      return false;
    }

    if (wager.status !== 'matched') {
      console.error(`Crypto wager is not in 'matched' status: ${wagerId}`);
      return false;
    }

    // Get current price from CMC API
    const currentPrice = await getCurrentTokenPrice(wager.token_id);
    if (currentPrice === null) {
      console.error(`Failed to get current price for token ID: ${wager.token_id}`);
      return false;
    }

    console.log(`Current price for token ${wager.token_id}: ${currentPrice}`);
    console.log(`Target price: ${wager.target_price}, Creator position: ${wager.creator_position}`);

    // Determine winner based on price and conditions
    const isTargetMet =
      wager.creator_position === ">=" ? currentPrice >= (wager.target_price || 0) :
        wager.creator_position === "<=" ? currentPrice <= (wager.target_price || 0) :
          false;

    console.log(`Target met: ${isTargetMet}`);

    const winnerAddress = isTargetMet ? wager.creator_address : wager.opponent_address;

    if (!winnerAddress) {
      console.error('Could not determine winner address');
      return false;
    }

    // Call the settle_crypto_wager function
    const { data, error } = await supabaseAdmin.rpc(
      'settle_crypto_wager',
      {
        wager_id: wagerId,
        input_winner_address: winnerAddress,
        current_price: currentPrice
      }
    );

    if (error) {
      console.error(`Error settling crypto wager:`, error);
      return false;
    }

    // If successful, trigger notifications
    try {
      // Call the notification service
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        await fetch(`${supabaseUrl}/functions/v1/wager-notifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            type: 'wager_settled',
            data: {
              wager_id: wagerId,
              creator_address: wager.creator_address,
              opponent_address: wager.opponent_address,
              winner_address: winnerAddress,
              sol_amount: wager.sol_amount,
              winnings: wager.sol_amount * 2 // Winner gets double their stake
            }
          })
        });
      }
    } catch (notificationError) {
      console.error('Error sending crypto wager settlement notification:', notificationError);
      // Don't fail the settlement if notification fails
    }

    return true;
  } catch (err) {
    console.error(`Failed to resolve crypto wager:`, err);
    return false;
  }
}

// Helper function to get current token price from CoinMarketCap
export async function getCurrentTokenPrice(tokenId: number): Promise<number | null> {
  const cmcApiKey = import.meta.env.VITE_CMC_API_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!cmcApiKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('API keys not found');
    return null;
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/price-by-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        apiKey: cmcApiKey,
        id: tokenId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token price: ${response.status}`);
    }

    const data = await response.json();

    if (data.data && data.data[tokenId]) {
      return data.data[tokenId].quote?.USD?.price || null;
    }

    return null;
  } catch (err) {
    console.error('Error fetching token price:', err);
    return null;
  }
}

// Get token details (for crypto wagers) with caching
export async function getTokenDetails(tokenId: number): Promise<TokenSnapshot | null> {
  // Check if we have valid cached data
  const cachedEntry = tokenCache.get(tokenId);
  if (cachedEntry) {
    const now = Date.now();
    // If cache hasn't expired, return cached data
    if (now - cachedEntry.timestamp < TOKEN_CACHE_TTL) {
      console.log(`Using cached token details for ID ${tokenId}`);
      return cachedEntry.data;
    } else {
      // Remove expired cache entry
      console.log(`Token cache expired for ID ${tokenId}`);
      tokenCache.delete(tokenId);
    }
  }

  const cmcApiKey = import.meta.env.VITE_CMC_API_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!cmcApiKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('API keys not found');
    return null;
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/token-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        apiKey: cmcApiKey,
        id: tokenId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token details: ${response.status}`);
    }

    const data = await response.json();

    if (data.data && data.data[tokenId]) {
      const token = data.data[tokenId];

      // Create token snapshot
      const tokenSnapshot: TokenSnapshot = {
        id: tokenId,
        name: token.name,
        symbol: token.symbol,
        logo: token.logo,
        slug: token.slug,
        current_price: token.quote?.USD?.price
      };

      // Store in cache
      tokenCache.set(tokenId, {
        data: tokenSnapshot,
        timestamp: Date.now()
      });

      return tokenSnapshot;
    }

    return null;
  } catch (err) {
    console.error('Error fetching token details:', err);
    return null;
  }
}

// Get team details (for sports wagers)
export async function getTeamDetails(teamId: number, sportType: string): Promise<{ name: string; logo: string } | null> {
  const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!apiKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('API keys not found');
    return null;
  }

  // Create a retry mechanism
  const maxRetries = 3;
  let retryCount = 0;
  let lastError: any = null;

  while (retryCount < maxRetries) {
    try {
      console.log(`Fetching team details for ID: ${teamId}, sport: ${sportType} (Attempt ${retryCount + 1}/${maxRetries})`);

      // Add a timeout to the fetch operation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${supabaseUrl}/functions/v1/sports-api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          endpoint: 'teams',
          params: { id: teamId },
          sportId: sportType,
          apiKey
        }),
        signal: controller.signal
      });

      // Clear timeout
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch team details (${response.status}): ${errorText}`);
        lastError = new Error(`Failed to fetch team details: ${response.status}`);
        retryCount++;

        // Add exponential backoff
        if (retryCount < maxRetries) {
          const backoffTime = Math.pow(2, retryCount) * 500; // 500ms, 1000ms, 2000ms
          console.log(`Retrying in ${backoffTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffTime));
          continue;
        } else {
          throw lastError;
        }
      }

      const data = await response.json();

      if (data.response && Array.isArray(data.response) && data.response.length > 0) {
        const team = data.response[0];

        // Handle different API response formats
        if (sportType === 'soccer') {
          return {
            name: team.team.name,
            logo: team.team.logo
          };
        } else {
          return {
            name: team.name,
            logo: team.logo
          };
        }
      }

      // For baseball, set default league info if no team was found
      if (sportType === 'baseball') {
        return {
          name: `Team #${teamId}`,
          logo: ''
        };
      }

      return null;
    } catch (err) {
      console.error(`Attempt ${retryCount + 1} failed:`, err);
      lastError = err;
      retryCount++;

      // Add exponential backoff if we're going to retry
      if (retryCount < maxRetries) {
        const backoffTime = Math.pow(2, retryCount) * 500; // 500ms, 1000ms, 2000ms
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      } else {
        console.error(`Failed to fetch team details after ${maxRetries} attempts:`, err);

        // For baseball, return default values to prevent complete failure
        if (sportType === 'baseball') {
          console.log('Returning fallback MLB team data');
          return {
            name: `Team #${teamId}`,
            logo: ''
          };
        }
      }
    }
  }

  return null;
}

// Get event details (for sports wagers)
export async function getEventDetails(eventId: number, sportType: string): Promise<{ name: string; date: string; time: string; league: string; leagueLogo?: string } | null> {
  const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!apiKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('API keys not found');
    return null;
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/sports-api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        endpoint: 'fixtures',
        params: { id: eventId },
        sportId: sportType,
        apiKey
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch event details: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Event details for ${sportType} eventId ${eventId}:`, data.response?.[0]);

    if (data.response && data.response.length > 0) {
      const fixture = data.response[0];

      // Handle different API response formats
      if (sportType === 'soccer') {
        const fixtureDate = new Date(fixture.fixture.date);
        return {
          name: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
          date: fixtureDate.toLocaleDateString(),
          time: fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          league: fixture.league.name,
          leagueLogo: fixture.league.logo
        };
      } else {
        const fixtureDate = new Date(fixture.date);

        // Extract league info based on sport type and API response structure
        let leagueName = "Sports Event"; // Default fallback
        let leagueLogo = null;

        // Special handling for baseball/MLB
        if (sportType === 'baseball') {
          leagueName = "MLB"; // Always set MLB for baseball

          // Try to get league logo if available
          if (fixture.league?.logo) {
            leagueLogo = fixture.league.logo;
          }
        }
        // Handle other sports
        else if (fixture.league?.name) {
          leagueName = fixture.league.name;
          leagueLogo = fixture.league.logo;
        } else if (fixture.league) {
          // For some sports, 'league' might be a string directly
          if (typeof fixture.league === 'string') {
            leagueName = fixture.league;
          }
          // For MMA events, category might be the main event name
          else if (fixture.category) {
            leagueName = fixture.category;
          }
        } else if (fixture.competition?.name) {
          leagueName = fixture.competition.name;
          leagueLogo = fixture.competition.logo;
        } else if (fixture.championship?.name) {
          leagueName = fixture.championship.name;
          leagueLogo = fixture.championship.logo;
        } else {
          // Fallback to sport-specific defaults
          if (sportType === 'basketball') {
            leagueName = "NBA";
          } else if (sportType === 'baseball') {
            leagueName = "MLB";
          } else if (sportType === 'american-football') {
            leagueName = "NFL";
          } else if (sportType === 'hockey') {
            leagueName = "NHL";
          } else if (sportType === 'mma') {
            leagueName = "MMA";
          }
        }

        return {
          name: `${fixture.teams.home.name} vs ${fixture.teams.away.name}`,
          date: fixtureDate.toLocaleDateString(),
          time: fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          league: leagueName,
          leagueLogo: leagueLogo
        };
      }
    }

    // If no event details found but we know the sport type is baseball, return default MLB info
    if (sportType === 'baseball') {
      return {
        name: "MLB Game",
        date: new Date().toLocaleDateString(), // Default to current date
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        league: "MLB",
        leagueLogo: null
      };
    }

    return null;
  } catch (err) {
    console.error('Error fetching event details:', err);

    // If error occurred but we know the sport type is baseball, return default MLB info
    if (sportType === 'baseball') {
      return {
        name: "MLB Game",
        date: new Date().toLocaleDateString(), // Default to current date
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        league: "MLB",
        leagueLogo: null
      };
    }

    return null;
  }
}

// Get game details for resolving wagers
export async function getGameDetails(eventId: number, sportType: string): Promise<any | null> {
  const apiKey = import.meta.env.VITE_FOOTBALL_API_KEY;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!apiKey || !supabaseUrl || !supabaseAnonKey) {
    console.error('API keys not found');
    return null;
  }

  try {
    // Different endpoint mappings based on sport type
    let endpoint = 'fixtures';
    if (sportType === 'baseball') {
      endpoint = 'games';
    } else if (sportType === 'basketball' || sportType === 'american-football' || sportType === 'hockey') {
      endpoint = 'games';
    } else if (sportType === 'mma') {
      endpoint = 'fights';
    }

    const response = await fetch(`${supabaseUrl}/functions/v1/sports-api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        endpoint,
        params: { id: eventId },
        sportId: sportType,
        apiKey
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch game details: ${response.status}`);
    }

    const data = await response.json();

    if (data.response && data.response.length > 0) {
      return data.response[0];
    }

    return null;
  } catch (err) {
    console.error(`Error fetching game details for ${sportType} event ${eventId}:`, err);
    return null;
  }
}