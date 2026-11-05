import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, onBlur, placeholder }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },

    onBlur: () => {
      onBlur?.();
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive('bold'),
      isItalic: editor?.isActive('italic'),
      isUnderline: editor?.isActive('underline'),
      isBulletList: editor?.isActive('bulletList'),
    }),
  });
  if (!editor) return null;

  return (
    <div className="rounded-lg border border-input rich-text-content">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b p-2">
    <button
  type="button"
//   onMouseDown={(e) => e.preventDefault()}
  onClick={() => editor.chain().focus().toggleBold().run()}
  className={`rounded border px-3 py-1 ${
    editorState?.isBold
      ? "bg-black text-white"
      : "bg-white text-black hover:bg-gray-100"
  }`}
>
  Bold
</button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded border px-3 py-1"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="rounded border px-3 py-1"
        >
          Underline
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="rounded border px-3 py-1"
        >
          Bullet List
        </button>
      </div>

      {/* Editable area */}
      <div className="p-3">
        <EditorContent editor={editor} className="min-h-[180px]" />
      </div>
    </div>
  );
}
