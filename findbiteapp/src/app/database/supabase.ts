/**
 * Main Supabase client module for browser context
 * Provides access to Supabase client instances for browser contexts
 */

import { createBrowserClient } from '@supabase/ssr';

// Types for the Supabase client
export type SupabaseClient = ReturnType<typeof createBrowserClient>;

// Create a browser client (for client-side operations)
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// For backward compatibility
export const createClient = createBrowserSupabaseClient;
