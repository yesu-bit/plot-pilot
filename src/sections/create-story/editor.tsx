"use client";

import { useState } from "react";
import { TiptapEditor } from "@/src/components/tiptap-editor";

export default function Editor({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string) => void;
}) {
  return (
    <div className="px-8">
      <TiptapEditor content={content} onChange={setContent} className="mb-4" />
    </div>
  );
}
