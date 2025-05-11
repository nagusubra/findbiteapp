'use server';

/**
 * Server-only Supabase actions
 * This file must only be imported by server components
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Create a Supabase client for server-side operations
 * Uses the async cookies() API from Next.js 15
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
            });
          } catch (error) {
            // This can be ignored if you have middleware refreshing user sessions
            console.error('Error setting cookie:', error);
          }
        },
        remove(name) {
          try {
            cookieStore.delete(name);
          } catch (error) {
            // This can be ignored if you have middleware refreshing user sessions
            console.error('Error removing cookie:', error);
          }
        },
      },
    }
  );
}

/**
 * Simplified export to use in server components
 */
export const createClient = createServerSupabaseClient;

/**
 * Create database services for server-side components
 */
export async function createServerDatabaseServices() {
  const client = await createServerSupabaseClient();
  
  // Import these directly to avoid circular dependencies
  const { UserService } = await import('./user-service');
  const { DietaryService } = await import('./dietary-service');
  const { RestaurantService } = await import('./restaurant-service');
  
  return {
    userService: new UserService(client),
    dietaryService: new DietaryService(client),
    restaurantService: new RestaurantService(client)
  };
}
