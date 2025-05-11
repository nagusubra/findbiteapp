/**
 * Dietary restrictions database operations helper module
 * Handles all dietary restriction related database interactions
 */

import { SupabaseClient, createBrowserSupabaseClient } from './supabase';

export class DietaryService {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || createBrowserSupabaseClient();
  }

  /**
   * Get all dietary restrictions from the database
   */
  async getAllDietaryRestrictions(): Promise<string[]> {
    try {
      const { data, error } = await this.supabase
        .from("dietary_restrictions")
        .select("dietary_restriction_name");
      
      if (error) {
        console.error("Error fetching dietary restrictions:", error);
        return [];
      }
        // Extract restriction names and filter out any null values
      interface DietaryRestrictionItem {
        dietary_restriction_name: string;
      }
      
      return (data as DietaryRestrictionItem[])
        .map(item => item.dietary_restriction_name)
        .filter(Boolean) as string[];
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }

  /**
   * Search for dietary restrictions by name pattern
   */
  async searchDietaryRestrictions(searchQuery: string): Promise<string[]> {
    try {
      const { data, error } = await this.supabase
        .from("dietary_restrictions")
        .select("dietary_restriction_name")
        .ilike("dietary_restriction_name", `%${searchQuery}%`);
        if (error) {
        console.error("Error searching dietary restrictions:", error);
        return [];
      }
      
      interface DietaryRestrictionItem {
        dietary_restriction_name: string;
      }
      
      return (data as DietaryRestrictionItem[])
        .map(item => item.dietary_restriction_name)
        .filter(Boolean) as string[];
    } catch (err) {
      console.error("Error:", err);
      return [];
    }
  }
}
