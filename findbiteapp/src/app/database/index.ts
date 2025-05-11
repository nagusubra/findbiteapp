/**
 * Database services index file
 * Exports all database services for easy import throughout the application
 */

export { createBrowserSupabaseClient, type SupabaseClient } from './supabase';
export { type SupabaseServerClient } from './supabase-server';
export { UserService, type UserProfile, type AuthUser } from './user-service';
export { DietaryService } from './dietary-service';
export { RestaurantService, type Restaurant, type RestaurantFilter } from './restaurant-service';

// Helper function to initialize all services with a single Supabase client
import { SupabaseClient, createBrowserSupabaseClient } from './supabase';
import { UserService } from './user-service';
import { DietaryService } from './dietary-service';
import { RestaurantService } from './restaurant-service';

export interface DatabaseServices {
  userService: UserService;
  dietaryService: DietaryService;
  restaurantService: RestaurantService;
}

export function createDatabaseServices(supabaseClient?: SupabaseClient): DatabaseServices {
  const client = supabaseClient || createBrowserSupabaseClient();
  
  return {
    userService: new UserService(client),
    dietaryService: new DietaryService(client),
    restaurantService: new RestaurantService(client)
  };
}

/**
 * Create server-side database services
 * For use in Server Components, Server Actions, and Route Handlers
 */
// Do not export server actions from this file
// Server actions should be imported directly from supabase-server-actions.ts
