import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background p-8">
      <header className="flex items-center justify-between pb-6">
        <h1 className="text-2xl font-bold">FindBite</h1>
        <form action={async () => {
          "use server";
          const supabase = await createClient();
          await supabase.auth.signOut();
          redirect("/login");
        }}>
          <Button type="submit">Sign Out</Button>
        </form>
      </header>
      
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to FindBite!</h2>
          <p className="mt-4 text-xl">
            Hello {user.email}
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Your personalized food discovery journey starts here.
          </p>
        </div>
      </main>
    </div>
  );
}
