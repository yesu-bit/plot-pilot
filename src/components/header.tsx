import Link from "next/link";
import { createSupabaseClient } from "@/src/utils/supabase/server";
import AuthPageSignOutButton from "./auth-sign-out-button";
import { CircleUserRound } from "lucide-react";

export default async function Header() {
  const client = await createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <nav className="border-b w-full h-14 shrink-0 flex items-center">
      <div className="px-6 w-full flex items-center justify-between mx-auto">
        <Link href="/" className="text-md font-medium">
          PlotPilot
        </Link>
        <div className="flex items-center gap-2">
          {user == null ? (
            <>
              <button>
                <Link href="/sign-in">Sign In</Link>
              </button>
              <button>
                <Link href="/sign-up">Sign Up</Link>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <AuthPageSignOutButton />
              <Link href={"/dashboard"}>
                <CircleUserRound size={30} className="text-slate-500" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
