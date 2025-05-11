/**
 * Server component for loading user profile data
 * This demonstrates how to use the server-side Supabase client
 * in a Server Component with Next.js 15
 */

import { createServerSupabaseClient } from '@/app/database/supabase-server-actions';
import { type UserProfile } from '@/app/database';

export async function getServerProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Create a server-side Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Get the user's profile data
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Error in server profile loader:', error);
    return null;
  }
}

/**
 * Server component that gets the current user and their profile
 */
export async function getCurrentUserWithProfile() {
  try {
    // Create a server-side Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Get the current user
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
      return { user: null, profile: null };
    }
    
    // Get the user's profile
    const profile = await getServerProfile(data.user.id);
    
    return {
      user: {
        id: data.user.id,
        email: data.user.email
      },
      profile
    };
  } catch (error) {
    console.error('Error in getCurrentUserWithProfile:', error);
    return { user: null, profile: null };
  }
}
