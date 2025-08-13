import { createSupabaseClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function dashboardPage() {
  const client = await createSupabaseClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h4>Dashboard</h4>
      <p>{user?.email}</p>
    </div>
  );
}
