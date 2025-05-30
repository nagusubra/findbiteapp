import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import NearbyRestaurants from "@/app/components/restaurants/nearby-restaurants";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo/findbite_logo.png"
              alt="FindBite Logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-semibold text-xl">FindBite</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button
                variant="outline"
                size="sm"
                className="border-red-200 hover:border-red-300 hover:bg-red-50 dark:border-red-900 dark:hover:border-red-800 dark:hover:bg-red-900/20"
              >
                <span className="mr-2">👤</span> Profile
              </Button>
            </Link>
            <form action={async () => {
              "use server";
              const supabase = await createClient();
              await supabase.auth.signOut();
              redirect("/login");
            }}>              <Button
                type="submit"
                variant="ghost"
                size="sm"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Welcome, {user.email?.split('@')[0]}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Find restaurants that suit your unique dietary needs
          </p>
        </div>
        
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Restaurants</CardTitle>
            <CardDescription>Discover places that cater to your dietary requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  type="text" 
                  placeholder="Location or cuisine" 
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input 
                  type="text" 
                  placeholder="Dietary restrictions (e.g., gluten-free, vegan)" 
                  className="w-full"
                />
              </div>              <Button className="bg-red-600 hover:bg-red-700 text-white" size="default">
                Search
              </Button>
            </div>
              <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer">Gluten-Free</Badge>
              <Badge variant="secondary" className="cursor-pointer">Dairy-Free</Badge>
              <Badge variant="secondary" className="cursor-pointer">Vegan</Badge>
              <Badge variant="secondary" className="cursor-pointer">Vegetarian</Badge>
              <Badge variant="secondary" className="cursor-pointer">Nut-Free</Badge>
              <Badge variant="secondary" className="cursor-pointer">Pescatarian</Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Map View */}
        <div className="mb-8">
          <div className="relative w-full rounded-lg overflow-hidden shadow-md">
            <div className="aspect-[16/9] max-h-[500px]">
              <Image
                src="/map.png"
                alt="Restaurant Map"
                fill={true}
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 py-2 px-4 rounded-lg shadow-lg flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Your Location</span>
            </div>
          </div>
        </div>
        
        {/* Restaurants Nearby Component */}
        <NearbyRestaurants />
        
        {/* Quick Links */}
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="#" className="no-underline">
            <Card className="h-full hover:border-red-600 transition-colors">
              <CardHeader className="p-4 text-center">
                <div className="mx-auto mb-2 text-2xl">🍽️</div>
                <CardTitle className="text-base font-medium">My Saved Places</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          <Link href="#" className="no-underline">
            <Card className="h-full hover:border-red-600 transition-colors">
              <CardHeader className="p-4 text-center">
                <div className="mx-auto mb-2 text-2xl">🥗</div>
                <CardTitle className="text-base font-medium">Set Diet Preferences</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          <Link href="#" className="no-underline">
            <Card className="h-full hover:border-red-600 transition-colors">
              <CardHeader className="p-4 text-center">
                <div className="mx-auto mb-2 text-2xl">📝</div>
                <CardTitle className="text-base font-medium">My Reviews</CardTitle>
              </CardHeader>
            </Card>
          </Link>
          <Link href="#" className="no-underline">
            <Card className="h-full hover:border-red-600 transition-colors">
              <CardHeader className="p-4 text-center">
                <div className="mx-auto mb-2 text-2xl">👥</div>
                <CardTitle className="text-base font-medium">Share with Friends</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
