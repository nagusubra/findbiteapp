"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type BetaSignupResult = {
  error?: string;
  success?: boolean;
};

export async function submitBetaSignup(email: string): Promise<BetaSignupResult> {
  if (!email) {
    return { error: "Email is required" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address" };
  }

  try {
    // Create server-side Supabase client
    const supabase = await createClient();

    // Check if email already exists to prevent duplicates
    const { data: existingSignups } = await supabase
      .from("signups")
      .select("email")
      .eq("email", email);

    if (existingSignups && existingSignups.length > 0) {
      return { error: "This email is already signed up for the beta program" };
    }

    // Insert the email into the signups table
    const { error } = await supabase
      .from("signups")
      .insert([{ email }]);

    if (error) {
      console.error("Error adding beta signup:", error);
      return {
        error: "Failed to sign up. Please try again later."
      };
    }

    // Revalidate the path to update any cached data
    revalidatePath("/betasignup");
    
    return { success: true };
  } catch (err) {
    console.error("Beta signup error:", err);
    return {
      error: "An unexpected error occurred. Please try again later."
    };
  }
}
