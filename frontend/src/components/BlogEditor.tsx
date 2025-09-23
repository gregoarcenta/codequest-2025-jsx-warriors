"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Code2,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Palette,
  Highlighter,
  Superscript as SuperscriptIcon,
  Subscript as SubscriptIcon,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const BlogEditor = ({
  content,
  onChange,
  placeholder = "Escribe el contenido de tu artículo aquí...",
}: TiptapProps) => {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        // Deshabilitar algunas extensiones del StarterKit para evitar duplicados
        link: false,
        underline: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "blog-image",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "blog-link",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Superscript,
      Subscript,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "blog-editor",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    editable: true,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const addImage = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageDialog(false);
    }
  };

  const addLink = () => {
    if (linkUrl && editor) {
      if (linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl("");
      setLinkText("");
      setShowLinkDialog(false);
    }
  };

  const toggleTextColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  if (!editor) {
    return (
      <div className="border rounded-md p-4 min-h-[500px] flex items-center justify-center bg-white dark:bg-gray-900 dark:border-gray-700">
        <span className="text-muted-foreground">Cargando editor...</span>
      </div>
    );
  }

  return (
    <div className="border rounded-md bg-white dark:bg-gray-900 dark:border-gray-700">
      {/* Toolbar Principal */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-3 space-y-3 bg-gray-50 dark:bg-gray-800">
        {/* Primera fila - Formato de texto */}
        <div className="flex flex-wrap items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className={
              editor.isActive("bold")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className={
              editor.isActive("italic")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
            className={
              editor.isActive("underline")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleStrike().run();
            }}
            className={
              editor.isActive("strike")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          {/* Colores de texto */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                toggleTextColor("#000000");
              }}
              type="button"
              title="Negro"
            >
              <Palette className="h-4 w-4" />
            </Button>
            {[
              "#ef4444",
              "#f97316",
              "#eab308",
              "#22c55e",
              "#3b82f6",
              "#8b5cf6",
            ].map((color) => (
              <button
                key={color}
                onClick={(e) => {
                  e.preventDefault();
                  toggleTextColor(color);
                }}
                className="w-6 h-6 rounded border-2 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400"
                style={{ backgroundColor: color }}
                type="button"
                title={`Color ${color}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHighlight().run();
            }}
            className={
              editor.isActive("highlight")
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : ""
            }
            type="button"
            title="Resaltar"
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </div>

        {/* Segunda fila - Encabezados y alineación */}
        <div className="flex flex-wrap items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Heading1 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Heading2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            className={
              editor.isActive("heading", { level: 3 })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Heading3 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          {/* Alineación */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("left").run();
            }}
            className={
              editor.isActive({ textAlign: "left" })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("center").run();
            }}
            className={
              editor.isActive({ textAlign: "center" })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("right").run();
            }}
            className={
              editor.isActive({ textAlign: "right" })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("justify").run();
            }}
            className={
              editor.isActive({ textAlign: "justify" })
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Tercera fila - Listas, código e inserción */}
        <div className="flex flex-wrap items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
            className={
              editor.isActive("bulletList")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
            className={
              editor.isActive("orderedList")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
            className={
              editor.isActive("blockquote")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Quote className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCode().run();
            }}
            className={
              editor.isActive("code")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Code className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCodeBlock().run();
            }}
            className={
              editor.isActive("codeBlock")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
          >
            <Code2 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleSuperscript().run();
            }}
            className={
              editor.isActive("superscript")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
            title="Superíndice"
          >
            <SuperscriptIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleSubscript().run();
            }}
            className={
              editor.isActive("subscript")
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : ""
            }
            type="button"
            title="Subíndice"
          >
            <SubscriptIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          {/* Insertar imagen */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setShowImageDialog(true);
            }}
            type="button"
            title="Insertar imagen"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          {/* Insertar enlace */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setShowLinkDialog(true);
            }}
            type="button"
            title="Insertar enlace"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().undo()}
            type="button"
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().redo()}
            type="button"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Diálogo para insertar imagen */}
      {showImageDialog && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <Input
              placeholder="URL de la imagen"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addImage} size="sm">
              Insertar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowImageDialog(false)}
              size="sm"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Diálogo para insertar enlace */}
      {showLinkDialog && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="URL del enlace"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Texto del enlace (opcional)"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addLink} size="sm">
              Insertar
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowLinkDialog(false)}
              size="sm"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="min-h-[500px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default BlogEditor;
