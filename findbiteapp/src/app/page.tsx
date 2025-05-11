import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // If user is logged in, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="flex flex-col items-center justify-center min-h-screen py-12 sm:py-20">
          <div className="space-y-12 text-center">
            <div className="space-y-8">
              <Image
                src="/logo/findbite_logo.png"
                alt="FindBite Logo"
                width={200}
                height={200}
                priority
                className="mx-auto transform hover:scale-105 transition-transform duration-300"
              />
              
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Welcome to FindBite
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover amazing restaurants and food in your area, curated just for you
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-red-600 dark:hover:border-red-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Log In
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-red-600 text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Find Restaurants</h3>
              <p className="text-gray-600 dark:text-gray-300">Discover the best local dining spots near you</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-red-600 text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Read Reviews</h3>
              <p className="text-gray-600 dark:text-gray-300">Get authentic reviews from food lovers like you</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-red-600 text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Save Favorites</h3>
              <p className="text-gray-600 dark:text-gray-300">Keep track of your favorite dining spots</p>
            </div>
          </div>
        </main>
      </div>
      
      <footer className="bg-white dark:bg-gray-900 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} FindBite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
