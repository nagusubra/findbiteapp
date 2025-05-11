import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define the restaurant data type
export interface RestaurantItem {
  name: string;
  cuisine: string;
  dietaryOptions: string[];
  rating: number;
}

// Sample data for nearby restaurants
export const sampleNearbyRestaurants: RestaurantItem[] = [
  { 
    name: "GreenLeaf Kitchen", 
    cuisine: "Vegetarian, Vegan", 
    dietaryOptions: ["Gluten-Free", "Dairy-Free"], 
    rating: 4.7 
  },
  { 
    name: "Pure Bites Café", 
    cuisine: "American, Health Food", 
    dietaryOptions: ["Keto", "Paleo"], 
    rating: 4.5 
  },
  { 
    name: "Harmonic Eats", 
    cuisine: "Mediterranean", 
    dietaryOptions: ["Nut-Free", "Halal"], 
    rating: 4.3 
  },
];

interface NearbyRestaurantsProps {
  restaurants?: RestaurantItem[];
}

export default function NearbyRestaurants({ restaurants = sampleNearbyRestaurants }: NearbyRestaurantsProps) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Restaurants Nearby</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {restaurants.map((restaurant, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{restaurant.name}</CardTitle>
              <CardDescription>{restaurant.cuisine}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-1">
                {restaurant.dietaryOptions.map((option, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{option}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium">⭐ {restaurant.rating}</span>
              </div>
              <Button variant="ghost" size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
