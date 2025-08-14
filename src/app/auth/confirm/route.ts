import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (token_hash && type) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            response.cookies.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    });

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error: insertError } = await supabase.from("users").upsert(
          {
            user_id: user.id,
            name:
              user.user_metadata?.full_name ||
              user.email?.split("@")[0] ||
              "User",
            email: user.email,
            created_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );

        if (insertError) {
          console.error("Error inserting user data:", insertError);
        }
      }

      const redirectResponse = NextResponse.redirect(
        new URL(next, request.url)
      );

      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });

      return redirectResponse;
    }
  }

  return NextResponse.redirect(new URL("/auth/error", request.url));
}
