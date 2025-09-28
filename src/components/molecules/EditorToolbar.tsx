import React from 'react';
import { Editor } from '@tiptap/react';
import { IconButton, Divider } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Undo,
  Redo,
} from '@mui/icons-material';

interface EditorToolbarProps {
  editor: Editor | null;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBold().run()}
        color={editor.isActive('bold') ? 'primary' : 'default'}
      >
        <FormatBold fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        color={editor.isActive('italic') ? 'primary' : 'default'}
      >
        <FormatItalic fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem className="mx-1" />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        color={editor.isActive('bulletList') ? 'primary' : 'default'}
      >
        <FormatListBulleted fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        color={editor.isActive('orderedList') ? 'primary' : 'default'}
      >
        <FormatListNumbered fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        color={editor.isActive('blockquote') ? 'primary' : 'default'}
      >
        <FormatQuote fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        color={editor.isActive('codeBlock') ? 'primary' : 'default'}
      >
        <Code fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem className="mx-1" />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo fontSize="small" />
      </IconButton>
    </div>
  );
};
