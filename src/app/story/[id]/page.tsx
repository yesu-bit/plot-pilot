import React from "react";
import { createSupabaseClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";

// Define TypeScript interfaces
interface Story {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  // updated_at: string;
}

interface Params {
  id: string;
}

export default async function StoryPage({ params }: { params: Params }) {
  // Get the story ID from params
  const { id } = params;

  // Validate the ID parameter
  if (!id) {
    notFound();
  }

  // Create Supabase client
  const supabase = await createSupabaseClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // Redirect to sign in if user is not authenticated
  if (userError || !user) {
    redirect("/sign-in");
  }

  // Fetch the story data
  const { data: story, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .single();

  // Handle story not found
  if (error || !story) {
    notFound();
  }

  // Check if user has permission to view this story
  if (story.user_id !== user.id) {
    notFound();
  }

  // Sanitize the HTML content
  const sanitizedContent = sanitizeHtml(story.content, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "nl",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "strike",
      "code",
      "hr",
      "br",
      "div",
      "table",
      "thead",
      "caption",
      "tbody",
      "tr",
      "th",
      "td",
      "pre",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "name", "target"],
      img: ["src", "alt", "title"],
      span: ["class"],
      div: ["class"],
    },
    selfClosing: [
      "img",
      "br",
      "hr",
      "area",
      "base",
      "basefont",
      "input",
      "link",
      "meta",
    ],
    allowedSchemes: ["http", "https", "ftp", "mailto"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <article className="bg-white rounded-lg shadow-md p-6">
        <header className="mb-6">
          <h1 className="capitalize text-3xl font-bold text-gray-800 mb-2">
            {story.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>
              Created: {new Date(story.created_at).toLocaleDateString()}
            </span>
            {/* {story.updated_at !== story.created_at && (
              <span className="ml-4">
                Updated: {new Date(story.updated_at).toLocaleDateString()}
              </span>
            )} */}
          </div>
        </header>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </article>
    </div>
  );
}
