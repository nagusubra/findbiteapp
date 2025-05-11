/**
 * React hooks for database services
 * Provides easy access to database services in React components
 */

"use client";

import { useCallback, useMemo } from 'react';
import { createDatabaseServices, DatabaseServices, UserProfile } from '.';
import { createBrowserSupabaseClient } from './supabase';

/**
 * Hook to access all database services
 */
export function useDatabase(): DatabaseServices {
  // Create a new Supabase client instance
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  
  // Create database services with the Supabase client
  const services = useMemo(() => createDatabaseServices(supabase), [supabase]);
  
  return services;
}

/**
 * Hook to access user service
 */
export function useUserService() {
  const { userService } = useDatabase();
  return userService;
}

/**
 * Hook to access dietary service
 */
export function useDietaryService() {
  const { dietaryService } = useDatabase();
  return dietaryService;
}

/**
 * Hook to access restaurant service
 */
export function useRestaurantService() {
  const { restaurantService } = useDatabase();
  return restaurantService;
}

/**
 * Hook for user profile data and operations
 */
export function useUserProfile() {
  const userService = useUserService();
  
  const getCurrentUser = useCallback(async () => {
    return await userService.getCurrentUser();
  }, [userService]);
  
  const getUserProfile = useCallback(async (userId: string) => {
    return await userService.getUserProfile(userId);
  }, [userService]);
    const updateUserProfile = useCallback(async (profileData: Partial<UserProfile> & { user_id: string }) => {
    return await userService.updateUserProfile(profileData);
  }, [userService]);
  
  return {
    getCurrentUser,
    getUserProfile,
    updateUserProfile
  };
}
