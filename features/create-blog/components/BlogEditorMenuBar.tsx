import { Button } from "@/components/ui/button";
import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Level } from "@tiptap/extension-heading";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Type,
  UnderlineIcon,
  Undo2,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";


export default function BlogEditorMenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  const fonts = [
    { label: "Default", value: "inherit" },
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Courier New", value: "'Courier New', monospace" },
    { label: "Poppins", value: "Poppins, sans-serif" },
  ];

  //   const fontSizes = [
  //     { label: "XS", size: "0.75rem" },
  //     { label: "SM", size: "0.875rem" },
  //     { label: "MD", size: "1rem" },
  //     { label: "LG", size: "1.25rem" },
  //     { label: "XL", size: "1.5rem" },
  //     { label: "2XL", size: "1.875rem" },
  //   ];

  const headings = [
    { label: "Paragraph", level: 0 },
    { label: "Heading 1", level: 1 },
    { label: "Heading 2", level: 2 },
    { label: "Heading 3", level: 3 },
    { label: "Heading 4", level: 4 },
    { label: "Heading 5", level: 5 },
    { label: "Heading 6", level: 6 },
  ];

  const colors = [
    { label: "Default", value: "inherit" },
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Yellow", value: "yellow" },
    { label: "Orange", value: "orange" },
    { label: "Purple", value: "purple" },
  ];

  const helperFuntionForBasicTextStyle = (val: string) => {
    switch (val) {
      case "bold":
        editor.chain().focus().toggleBold().run();
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        editor.chain().focus().toggleUnderline().run();
        break;
      case "strike":
        editor.chain().focus().toggleStrike().run();
        break;
      default:
        break;
    }
  };

  const helperFuntionForList = (val: string) => {
    switch (val) {
      case "bullet":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "ordered":
        editor.chain().focus().toggleOrderedList().run();
        break;
      default:
        break;
    }
  };

  const helperFuntionForAlignment = (val: string) => {
    switch (val) {
      case "left":
        editor.chain().focus().setTextAlign("left").run();
        break;
      case "center":
        editor.chain().focus().setTextAlign("center").run();
        break;
      case "right":
        editor.chain().focus().setTextAlign("right").run();
        break;
      case "justify":
        editor.chain().focus().setTextAlign("justify").run();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md bg-muted/40 p-2">
      {/* Headings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type={"button"} variant="outline">
            Paragraph <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {headings.map((h) => (
            <DropdownMenuItem
              key={h.level}
              onClick={() => {
                if (h.level === 0) editor.chain().focus().setParagraph().run();
                else
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: h.level as Level })
                    .run();
              }}
            >
              {h.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Font Family */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            Font family
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {fonts.map((font) => (
            <DropdownMenuItem
              key={font.value}
              onClick={() =>
                editor.chain().focus().setFontFamily(font.value).run()
              }
            >
              <span style={{ fontFamily: font.value }}>{font.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Basic Text Styles */}
      <ToggleGroup
        type="multiple"
        variant={"outline"}
        orientation="horizontal"
        onValueChange={(val: string[]) => {
          val.map((item) => helperFuntionForBasicTextStyle(item));
        }}
      >
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="strike" aria-label="Toggle strike">
          <Strikethrough />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Lists */}
      <ToggleGroup
        type="single"
        variant={"outline"}
        onValueChange={(val: string) => {
          helperFuntionForList(val);
        }}
      >
        <ToggleGroupItem value="bullet" aria-label="Toggle bullet">
          <List />
        </ToggleGroupItem>
        <ToggleGroupItem value="ordered" aria-label="Toggle ordered">
          <ListOrdered />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Alignment */}
      <ToggleGroup
        variant="outline"
        type="single"
        onValueChange={(val: string) => {
          helperFuntionForAlignment(val);
        }}
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <AlignJustify />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Text Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            <Type /> Color
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 flex flex-wrap gap-2 p-2">
          {colors.map((color) => (
            <Button
              key={color.label}
              onClick={() => editor.chain().focus().setColor(color.value).run()}
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </PopoverContent>
      </Popover>

      {/* Highlight Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            <Highlighter />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 flex flex-wrap gap-2 p-2">
          {colors.map((color) => (
            <Button
              key={color.label}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: color.value })
                  .run()
              }
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </PopoverContent>
      </Popover>
      <Button
        type={"button"}
        variant={"outline"}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <RemoveFormatting />
      </Button>

      {/* Undo / Redo */}
      <Button
        type="button"
        variant={"ghost"}
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo2 />
      </Button>
      <Button
        type="button"
        variant={"ghost"}
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo2 />
      </Button>

      <div className="flex gap-2">
        <Button
          type={"button"}
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        >
          Code
        </Button>
        <Button
          type={"button"}
          variant={"outline"}
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </Button>

        <Button
          type={"button"}
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "is-active" : ""}
        >
          Code block
        </Button>
        <Button
          type={"button"}
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          Blockquote
        </Button>
        <Button
          type={"button"}
          variant={"outline"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Button>
        <Button
          type={"button"}
          variant={"outline"}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </Button>
      </div>
    </div>
  );
}
