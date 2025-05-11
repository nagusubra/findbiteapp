"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Successfully signed up
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo/findbite_logo.png"
                  alt="FindBite Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-xl">FindBite</span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Join FindBite</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Create an account to discover restaurants that meet your dietary needs
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6" onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a secure password"
                      required
                      minLength={6}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 6 characters
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30 dark:text-red-300">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-red-600 hover:underline dark:text-red-400 font-medium"
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 relative bg-red-600 order-1 lg:order-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src="/logo/findbite_logo.png"
                alt="FindBite Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Discover Dietary-Friendly Restaurants</h2>
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Find places that accommodate your unique dietary requirements and preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
