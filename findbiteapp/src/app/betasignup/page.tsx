"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitBetaSignup } from "./actions";

export default function BetaSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitBetaSignup(email);
      
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/findbite_logo.png"
              alt="FindBite Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold text-xl">FindBite</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Back to home
          </Link>
        </header>

        <main className="flex flex-col items-center justify-center py-12 sm:py-20">
          <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            {!success ? (
              <>
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Join Our Beta Program
                  </h1>                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    Be the first to experience FindBite&apos;s revolutionary restaurant discovery platform
                  </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full"
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing Up..." : "Sign Up for Beta Access"}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    By signing up, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Thank You!
                </h2>                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  You&apos;re now on our beta waiting list. We&apos;ll notify you when access is available.
                </p>
                <div className="mt-6">
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => router.push("/")}
                  >
                    Return to Home
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
