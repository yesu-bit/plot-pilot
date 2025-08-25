"use client";

import React, { useEffect, useState } from "react";
import Editor from "@/src/sections/create-story/editor";
import RightPanel from "@/src/sections/create-story/right-panel";
import { createSupabaseClient } from "@/src/utils/supabase/client";

export default function StoryCreatePage() {
  const [content, setContent] = useState(
    "<h1>Welcome to Tiptap!</h1><p>This is a basic rich text editor built with Tiptap. Try formatting some text:</p><ul><li>Make text <strong>bold</strong> or <em>italic</em></li><li>Create lists and headings</li><li>Add blockquotes and code</li></ul><blockquote><p>Tiptap is a headless wrapper around ProseMirror – a toolkit for building rich text WYSIWYG editors.</p></blockquote>"
  );
  const [title, setTitle] = useState("Untitled Story");
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSave = async () => {
    if (!user) {
      alert("Please log in to save your story");
      return;
    }

    setIsLoading(true);
    try {
      // Option 1: Save to localStorage
      localStorage.setItem("tiptap-content", content);

      const { data, error } = await supabase.from("stories").insert({
        user_id: user.id,
        title: title,
        content: content,
      });

      if (error) {
        throw error;
      }

      console.log("Saved content:", content);
      console.log("Supabase response:", data);
      setIsSaved(true);
    } catch (error) {
      console.error("Save failed:", error);
      alert(`Failed to save content: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white h-screen pb-8 gap-6">
      {/* <Sidebar /> */}
      <RightPanel onSave={handleSave} title={title} setTitle={setTitle} />
      <Editor content={content} setContent={setContent} />
    </div>
  );
}
