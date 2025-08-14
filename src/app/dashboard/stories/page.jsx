import { createSupabaseClient } from "@/src/utils/supabase/server";
import React from "react";

export default async function MyStoriesPage() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div>
      <h4>Stories</h4>
      <div>
        {stories?.map((story) => (
          <div key={story.id}>
            <h3>{story?.title}</h3>
            <p>{story?.content?.substring(0, 50)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
