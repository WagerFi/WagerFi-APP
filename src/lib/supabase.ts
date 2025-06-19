import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Check for required environment variables
if (!supabaseUrl || supabaseUrl.trim() === '') {
  throw new Error('VITE_SUPABASE_URL is required');
}

if (!supabaseAnonKey || supabaseAnonKey.trim() === '') {
  throw new Error('VITE_SUPABASE_ANON_KEY is required');
}
  
// Validate service role key
if (!supabaseServiceKey) {
  console.error('VITE_SUPABASE_SERVICE_ROLE_KEY is missing - admin operations will fail');
}

// Regular client for authenticated users (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for bypassing RLS - ensure we have a valid service role key
export const supabaseAdmin = supabaseServiceKey ? 
  createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }) : 
  supabase; // Fallback to regular client if service key is missing

export interface UserProfile {
  wallet_address: string;
  username?: string | null;
  profile_image_url?: string | null;
  wins: number;
  losses: number;
  profit_amount: number;
  win_streak: number;
  loss_streak: number;
  created_at: string;
  updated_at: string;
}

export async function getProfile(walletAddress: string): Promise<UserProfile | null> {
  try {
    // Always use admin client to bypass RLS for profile retrieval
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (error) {
      if (error.code !== 'PGRST116') { // Ignore "no rows" error
        console.error('Error fetching profile:', error);
      }
      return null;
    }

    return data;
  } catch (err) {
    console.error('Failed to get profile:', err);
    return null;
  }
}

export async function createOrUpdateProfile(
  profile: Partial<UserProfile> & { wallet_address: string }
): Promise<UserProfile | null> {
  try {
    if (!profile.wallet_address) {
      console.error('Wallet address is required for profile creation/update');
      return null;
    }

    // Check if profile exists
    const existingProfile = await getProfile(profile.wallet_address);
    
    // Update the updated_at timestamp
    const updatedProfile = {
      ...profile,
      updated_at: new Date().toISOString()
    };

    let result;
    
    // Always use admin client to bypass RLS
    if (existingProfile) {
      // Update existing profile
      result = await supabaseAdmin
        .from('users')
        .update(updatedProfile)
        .eq('wallet_address', profile.wallet_address)
        .select('*')
        .maybeSingle();
    } else {
      // Create new profile with default values
      const newProfile = {
        ...updatedProfile,
        wins: profile.wins ?? 0,
        losses: profile.losses ?? 0,
        profit_amount: profile.profit_amount ?? 0,
        win_streak: profile.win_streak ?? 0,
        loss_streak: profile.loss_streak ?? 0,
        created_at: new Date().toISOString()
      };

      result = await supabaseAdmin
        .from('users')
        .insert(newProfile)
        .select('*')
        .maybeSingle();
    }

    if (result.error) {
      console.error('Error saving profile:', result.error);
      return null;
    }

    return result.data;
  } catch (err) {
    console.error('Failed to save profile:', err);
    return null;
  }
}

export async function getAllUsers(): Promise<UserProfile[]> {
  try {
    // Always use admin client to bypass RLS
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('profit_amount', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Failed to get users:', err);
    return [];
  }
}

export async function updateUserStats(
  walletAddress: string,
  isWin: boolean,
  profitChange: number
): Promise<boolean> {
  try {
    if (!walletAddress) {
      console.error('Wallet address is required for updating stats');
      return false;
    }

    // Always use admin client to bypass RLS
    const { error } = await supabaseAdmin
      .from('users')
      .update({
        wins: isWin ? supabaseAdmin.rpc('increment', { value: 1 }) : undefined,
        losses: !isWin ? supabaseAdmin.rpc('increment', { value: 1 }) : undefined,
        profit_amount: supabaseAdmin.rpc('add_to_column', { value: profitChange }),
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', walletAddress);

    if (error) {
      console.error('Error updating user stats:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to update user stats:', err);
    return false;
  }
}