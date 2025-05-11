/**
 * Main Supabase server module
 * This file provides type definitions for server components
 * The actual implementation is in supabase-server-actions.ts
 */

import type { SupabaseClient } from '@supabase/supabase-js';

// Re-export server client type for use in type annotations
export type SupabaseServerClient = SupabaseClient;

// Do not export any actual server functions from this file
// Types only in this file to be safe for client components
