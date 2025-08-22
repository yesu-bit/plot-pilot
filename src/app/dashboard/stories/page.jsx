import StoriesView from "@/src/sections/dashboard/stories/stories-view";
import { createSupabaseClient } from "@/src/utils/supabase/server";
// import Link from "next/link";
import React from "react";
// import sanitizeHtml from "sanitize-html";

export default async function MyStoriesPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("user_id", user.id);

  // Function to strip HTML tags and get plain text
  // const stripHtml = (html) => {
  //   const clean = sanitizeHtml(html, {
  //     allowedTags: [], // Remove all tags
  //     allowedAttributes: {},
  //   });
  //   return clean.substring(0, 50) + "...";
  // };

  return <StoriesView stories={stories || []} />;
}
