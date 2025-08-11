"use client";

import { createSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPageSignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  async function signOut() {
    setIsSigningOut(true);
    const client = createSupabaseClient();
    await client.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <button onClick={signOut} disabled={isSigningOut}>
      <div className="flex items-center">
        {/* <Spinner
          variant="primary"
          isLoading={isSigningOut}
          className="mr-[8px]"
        /> */}
        {isSigningOut ? "Signing Out..." : "Sign Out"}
      </div>
    </button>
  );
}
