/**
 * Restaurant database operations helper module
 * Handles all restaurant related database interactions
 */

import { SupabaseClient, createBrowserSupabaseClient } from './supabase';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cuisine_types: string[];
  dietary_accommodations: string[];
  price_range: string;
  average_rating: number;
  image_url?: string;
  website_url?: string;
  phone_number?: string;
  hours_of_operation?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RestaurantFilter {
  cuisine_types?: string[];
  dietary_accommodations?: string[];
  price_range?: string[];
  min_rating?: number;
  max_distance_km?: number;
  latitude?: number;
  longitude?: number;
}

export class RestaurantService {
  private supabase: SupabaseClient;

  constructor(supabaseClient?: SupabaseClient) {
    this.supabase = supabaseClient || createBrowserSupabaseClient();
  }

  /**
   * Get all restaurants
   */
  async getAllRestaurants(): Promise<Restaurant[]> {
    try {
      const { data, error } = await this.supabase
        .from('restaurants')
        .select('*');

      if (error) {
        console.error('Error fetching restaurants:', error);
        return [];
      }

      return data as Restaurant[];
    } catch (err) {
      console.error('Error:', err);
      return [];
    }
  }

  /**
   * Get restaurant by ID
   */
  async getRestaurantById(id: string): Promise<Restaurant | null> {
    const { data, error } = await this.supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching restaurant:', error);
      return null;
    }
    
    return data as Restaurant;
  }

  /**
   * Search restaurants by filter
   */
  async searchRestaurants(filter: RestaurantFilter): Promise<Restaurant[]> {
    try {
      let query = this.supabase
        .from('restaurants')
        .select('*');

      // Apply filters
      if (filter.cuisine_types && filter.cuisine_types.length > 0) {
        // Overlap operator for arrays - match any elements
        query = query.overlaps('cuisine_types', filter.cuisine_types);
      }

      if (filter.dietary_accommodations && filter.dietary_accommodations.length > 0) {
        // Containment operator for arrays - ensure all filter elements are in the column
        query = query.contains('dietary_accommodations', filter.dietary_accommodations);
      }

      if (filter.price_range && filter.price_range.length > 0) {
        query = query.in('price_range', filter.price_range);
      }

      if (filter.min_rating !== undefined) {
        query = query.gte('average_rating', filter.min_rating);
      }

      // Execute the query
      const { data, error } = await query;

      if (error) {
        console.error('Error searching restaurants:', error);
        return [];
      }

      // If distance filtering is requested and coordinates are provided
      if (filter.max_distance_km && filter.latitude && filter.longitude) {
        return this.filterByDistance(
          data as Restaurant[], 
          filter.latitude, 
          filter.longitude, 
          filter.max_distance_km
        );
      }

      return data as Restaurant[];
    } catch (err) {
      console.error('Error:', err);
      return [];
    }
  }

  /**
   * Filter restaurants by distance from a point
   * Using the Haversine formula to calculate distance
   */
  private filterByDistance(
    restaurants: Restaurant[], 
    latitude: number, 
    longitude: number, 
    maxDistanceKm: number
  ): Restaurant[] {
    return restaurants.filter(restaurant => {
      const distance = this.calculateDistance(
        latitude, 
        longitude, 
        restaurant.latitude, 
        restaurant.longitude
      );
      
      return distance <= maxDistanceKm;
    });
  }

  /**
   * Calculate distance between two coordinates in kilometers (Haversine formula)
   */
  private calculateDistance(
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
