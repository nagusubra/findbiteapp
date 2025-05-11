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
  }  return (    
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-gray-50 dark:from-gray-900 dark:via-red-950/20 dark:to-gray-800">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-red-200 dark:bg-red-800/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-200 dark:bg-amber-800/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-orange-200 dark:bg-orange-800/20 rounded-full filter blur-3xl opacity-20 animate-pulse-slower"></div>
        <div className="absolute bottom-1/3 left-[15%] w-48 h-48 bg-red-100 dark:bg-red-900/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="pt-6 pb-4 flex justify-end">
          <nav className="flex gap-4">
            <Link href="/login" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 font-medium transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 font-medium transition-colors">
              Sign up
            </Link>
          </nav>
        </header>
        
        <main className="flex flex-col items-center justify-center min-h-[90vh] py-8 sm:py-16">
          <div className="space-y-20 text-center relative">
            <div className="space-y-8 relative z-10">
              <div className="relative inline-block group">
                <div className="absolute -inset-3 bg-gradient-to-r from-red-500 to-amber-500 rounded-full opacity-30 dark:opacity-50 blur-md group-hover:opacity-40 transition duration-300"></div>
                <Image
                  src="/logo/findbite_logo.png"
                  alt="FindBite Logo"
                  width={240}
                  height={240}
                  priority
                  className="mx-auto transform hover:scale-105 transition-transform duration-300 relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-red-600 to-red-800 text-white dark:text-white rounded-full px-4 py-1.5 text-sm font-medium rotate-3 shadow-md">
                  Beta
                </div>
              </div>
                <div className="space-y-5 mt-6">
                <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-amber-600 to-red-700 dark:from-red-400 dark:via-amber-400 dark:to-red-500 tracking-tight drop-shadow-sm">
                  Eat With Confidence
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  FindBite helps you discover restaurants that cater to your 
                  <span className="font-semibold px-1 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-red-600 dark:from-amber-400 dark:to-red-400">specific dietary needs</span> 
                  — no more guesswork, just great food
                </p>
                <div className="flex flex-wrap gap-3 justify-center mt-4">
                  {["Gluten-Free", "Vegan", "Vegetarian", "Dairy-Free", "Nut Allergies", "Halal", "Keto", "..."].map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 relative">
              <div className="absolute -inset-2.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-500 rounded-2xl blur-md opacity-50 dark:opacity-70 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
              <Link
                href="/betasignup"
                className="relative inline-flex items-center gap-3 px-12 py-5 text-2xl font-medium text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-red-300/50 hover:border-red-200 transform hover:-translate-y-1"
              >
                <span className="animate-pulse text-2xl">✨</span>
                Be Our Beta Tester
                <span className="animate-pulse text-2xl">✨</span>
              </Link>
            </div>            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-12">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-10 py-4 text-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-red-400/20"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-10 py-4 text-lg font-medium text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Log In
              </Link>
            </div>

            <p className="mt-6 text-gray-500 dark:text-gray-400">
              Already have <span className="text-red-600 dark:text-red-400">10+</span> users in our beta program!
            </p>
          </div><div className="mt-24 relative">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-center">
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200 dark:border-red-800">How It Works</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto px-4">
              <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800">
                <div className="text-red-600 text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🍽️</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Find Safe Restaurants</h3>
                <p className="text-gray-600 dark:text-gray-300">Discover places that accommodate your specific dietary needs</p>
              </div>
              <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800">
                <div className="text-red-600 text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Real-Time Updates powered by Agentic AI</h3>
                <p className="text-gray-600 dark:text-gray-300">Get the latest menu information and dietary options</p>
              </div>
              <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800">
                <div className="text-red-600 text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌟</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Verified menu items</h3>
                <p className="text-gray-600 dark:text-gray-300">We will vet through restaurant menu items for you and provide you with the accurate ingridients list.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <footer className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm py-8 mt-20 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-center text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} FindBite. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/betasignup" className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">Join Beta</Link>
              <Link href="#" className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
