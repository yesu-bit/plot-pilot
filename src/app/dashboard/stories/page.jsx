import { createSupabaseClient } from "@/src/utils/supabase/server";
import Link from "next/link";
import React from "react";
import sanitizeHtml from "sanitize-html";

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
  const stripHtml = (html) => {
    const clean = sanitizeHtml(html, {
      allowedTags: [], // Remove all tags
      allowedAttributes: {},
    });
    return clean.substring(0, 50) + "...";
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold">Stories</h4>
          <p className="text-gray-400 text-md">
            Manage and organize your creative works
          </p>
        </div>
        <Link
          href={"/story/create"}
          className="px-3 py-1.5 text-[16px] rounded-[5px] bg-slate-900 text-white"
        >
          Create Story
        </Link>
      </div>
      <div className="mt-8 flex items-center flex-wrap gap-8">
        {stories?.map((story) => (
          <div
            key={story.id}
            className="w-[300px] border-[1px] p-4 border-slate-200 rounded-md bg-white  "
          >
            <h3 className="font-medium text-lg capitalize">
              <Link href={`/story/${story.id}`}>{story?.title}</Link>
            </h3>
            <p className="text-sm">{stripHtml(story?.content || "")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
