"use client";

import Button from "@/src/components/ui/button";
import { createSupabaseClient } from "@/src/utils/supabase/client";
import { PenIcon, Plus, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Story {
  id: string;
  title: string;
  user_id: string;
  content: string;
  created_at: string;
}

export default function StoriesView({ stories }: { stories: Story[] }) {
  const [storiesList, setStoriesList] = useState<Story[]>();

  useEffect(() => {
    setStoriesList(stories);
  }, [stories]);

  const handleDeleteStory = async (story: Story) => {
    const supabase = await createSupabaseClient();

    const response = await supabase.from("stories").delete().eq("id", story.id);

    if (response.error) {
      console.log(response.error);
      toast.error("Unable to delete story. TRY AGAIN!");
    } else {
      toast.success("Story Deleted!");
      const updatedStories = storiesList?.filter(
        (item) => item.id !== story.id
      );
      setStoriesList(updatedStories);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div>
          <h4 className="text-2xl font-bold">Stories</h4>
          <p className="text-gray-400 text-md">
            Manage and organize your creative works
          </p>
        </div>
        <Link
          href={"/story/create"}
          className="flex items-center justify-center gap-3 px-3 py-1.5 text-[16px] rounded-[5px] bg-slate-900 text-white"
        >
          <Plus size={18} />
          Create Story
        </Link>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        {storiesList?.map((story: Story) => (
          <div
            key={story.id}
            className="flex flex-col md:flex-row md:items-center gap-4 justify-between w-full border-[1px] p-4 border-slate-200 rounded-md bg-white shadow-sm"
          >
            <h3 className="font-medium text-md capitalize">{story?.title}</h3>
            <div className="flex items-center gap-4">
              <Link href={`/story/${story.id}`}>
                <Button variant="outlined" size="small">
                  <PenIcon size={15} />
                  Continue Writing
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="small"
                className="text-red-500 border-red-300"
                onClick={() => handleDeleteStory(story)}
              >
                <Trash size={15} /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
