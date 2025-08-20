import MyCharactersView from "@/src/sections/dashboard/characters/characters-view";
import { createSupabaseClient } from "@/src/utils/supabase/server";
import React from "react";

export default async function MyCharactersPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .eq("user_id", user.id);

  return <MyCharactersView characters={characters} user={user} />;
}
