"use client";

import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import FontFamily from "@tiptap/extension-font-family";
import BlogEditorMenuBar from "./BlogEditorMenuBar";



interface BlogEditorProps {
  content?: string;
  onChange?: (value: string) => void;
}

export default function BlogEditor({
  content = "",
  onChange,
}: BlogEditorProps) {
  const editor: Editor | null = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ autolink: true, openOnClick: true, linkOnPaste: true }),
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextStyle,
      Color,
      FontFamily.configure({ types: ["textStyle"] }),
      Placeholder.configure({ placeholder: "Write something amazing..." }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[300px] p-4 rounded-md border bg-background",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <BlogEditorMenuBar editor={editor} />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
