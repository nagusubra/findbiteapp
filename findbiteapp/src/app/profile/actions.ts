"use server";

/**
 * Server-side actions for the profile page
 * These actions run on the server and can use the server-side Supabase client
 */

import { createServerSupabaseClient } from '@/app/database/supabase-server-actions';
import { type UserProfile } from '@/app/database';

/**
 * Get the current authenticated user on the server
 */
export async function getServerUser() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
      return null;
    }
    
    return {
      id: data.user.id,
      email: data.user.email
    };
  } catch (error) {
    console.error('Error getting server user:', error);
    return null;
  }
}

/**
 * Get the profile of a user on the server
 */
export async function getServerProfile(userId: string) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Error getting server profile:', error);
    return null;
  }
}

/**
 * Update a user profile on the server
 */
export async function updateServerProfile(profileData: Partial<UserProfile> & { user_id: string }) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('user_id', profileData.user_id)
      .single();
    
    // Set updated timestamp
    const profileWithTimestamp = {
      ...profileData,
      updated_at: new Date().toISOString()
    };
    
    let error;
    
    if (existingProfile) {
      // Update existing profile
      const result = await supabase
        .from('profiles')
        .update(profileWithTimestamp)
        .eq('user_id', profileData.user_id);
        
      error = result.error;
    } else {
      // Insert new profile
      const result = await supabase
        .from('profiles')
        .insert([profileWithTimestamp]);
        
      error = result.error;
    }
    
    if (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
    
    return { success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    return { 
      success: false, 
      error: errorMessage 
    };
  }
}
