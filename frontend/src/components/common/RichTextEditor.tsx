'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Code,
  Loader2
} from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading('Uploading image to Cloudinary...');

    try {
      const data = await uploadToCloudinary(file, 'editor-content');
      editor.chain().focus().setImage({ src: data.secure_url }).run();
      toast.success('Image inserted successfully', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image', { id: toastId });
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const buttons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: 'bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: 'italic' },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { heading: { level: 1 } } },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { heading: { level: 2 } } },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList' },
    { icon: Code, action: () => editor.chain().focus().toggleCodeBlock().run(), active: 'codeBlock' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote' },
    { icon: isUploading ? Loader2 : ImageIcon, action: addImage, loading: isUploading },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {buttons.map((btn, i) => {
        const Icon = btn.icon;
        const isActive = typeof btn.active === 'string' 
          ? editor.isActive(btn.active) 
          : typeof btn.active === 'object' 
            ? editor.isActive(Object.keys(btn.active)[0], (btn.active as any)[Object.keys(btn.active)[0]])
            : false;

        return (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            disabled={btn.loading}
            className={`p-2 rounded-lg transition-all ${
              isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-200'
            } ${btn.loading ? 'opacity-50 cursor-wait' : ''}`}
          >
            <Icon className={`h-4 w-4 ${btn.loading ? 'animate-spin' : ''}`} />
          </button>
        );
      })}
      <div className="flex-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg"
      >
        <Undo className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 text-slate-400 hover:bg-slate-200 rounded-lg"
      >
        <Redo className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[200px] p-6 text-slate-900 font-medium leading-relaxed',
      },
    },
  });

  return (
    <div className="w-full bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden focus-within:ring-4 focus-within:ring-indigo-100 focus-within:border-indigo-600 transition-all shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
