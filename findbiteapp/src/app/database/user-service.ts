/**
 * User database operations helper module
 * Handles all user profile related database interactions
 */

import { SupabaseClient, createBrowserSupabaseClient } from './supabase';

// Types
export interface UserProfile {
  user_id: string;
  user_full_name: string | null;
  user_dietary_restrictions: string[] | null;
  user_goals: string[] | null;
  user_referral_source: string | null;
  user_home_address: string | null;
  user_home_latitude: number | null;
  user_home_longitude: number | null;
  updated_at: string | null;
}

export interface AuthUser {
  id: string;
  email?: string;
}

export class UserService {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || createBrowserSupabaseClient();
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    
    if (error || !user) {
      console.error("Error fetching user:", error);
      return null;
    }
    
    return {
      id: user.id,
      email: user.email
    };
  }

  /**
   * Get user profile by user ID
   */
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    
    return data as UserProfile;
  }

  /**
   * Update or create user profile
   */
  async updateUserProfile(profile: Partial<UserProfile> & { user_id: string }): Promise<{success: boolean, error?: string}> {
    try {
      // Check if profile exists
      const { data: existingProfile } = await this.supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", profile.user_id)
        .single();
      
      // Set updated timestamp
      const profileWithTimestamp = {
        ...profile,
        updated_at: new Date().toISOString()
      };
      
      let error;
      
      if (existingProfile) {
        // Update existing profile
        const result = await this.supabase
          .from("profiles")
          .update(profileWithTimestamp)
          .eq("user_id", profile.user_id);
          
        error = result.error;
      } else {
        // Insert new profile
        const result = await this.supabase
          .from("profiles")
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
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  }
}
