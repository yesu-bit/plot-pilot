import DashboardView from "@/src/sections/dashboard/dashboard-view";
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
  const { data } = await client
    .from("users")
    .select("*")
    .eq("user_id", user.id);

  return <DashboardView userData={data?.[0] || null} />;
}
