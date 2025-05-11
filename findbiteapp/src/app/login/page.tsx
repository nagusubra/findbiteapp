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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Successfully logged in
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">      <div className="hidden lg:block lg:w-1/2 relative bg-red-600">
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
            <h2 className="text-3xl font-bold text-white mb-4">Find Your Perfect Meal</h2>
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Discover restaurants that cater to your unique dietary requirements
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">            <div className="flex items-center gap-2 mb-8 lg:hidden">
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
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in to continue your food discovery journey
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6" onSubmit={handleLogin}>
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-red-600 hover:underline dark:text-red-400">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full"
                    />
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
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
                
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-red-600 hover:underline dark:text-red-400 font-medium"
                  >
                    Create an account
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
