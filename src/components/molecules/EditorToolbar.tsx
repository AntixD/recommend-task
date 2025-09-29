import React from 'react';
import { Editor } from '@tiptap/react';
import { IconButton, Divider, Tooltip } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Undo,
  Redo,
  FormatClear,
  Title,
  Link,
} from '@mui/icons-material';

interface EditorToolbarProps {
  editor: Editor | null;
}

const ToolbarButton: React.FC<{
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  icon: React.ReactNode;
}> = ({ onClick, isActive = false, disabled = false, tooltip, icon }) => (
  <Tooltip title={tooltip} arrow>
    <span>
      <IconButton
        size="small"
        onClick={onClick}
        disabled={disabled}
        sx={{
          borderRadius: '6px',
          border: '2px solid',
          borderColor: isActive ? '#2563eb' : 'transparent',
          backgroundColor: isActive ? '#dbeafe' : 'transparent',
          color: isActive ? '#1e40af' : '#6b7280',
          margin: '2px',
          '&:hover': {
            backgroundColor: isActive ? '#bfdbfe' : '#f3f4f6',
            borderColor: isActive ? '#2563eb' : '#d1d5db',
          },
          '&.Mui-disabled': {
            color: '#d1d5db',
            borderColor: 'transparent',
          },
        }}
      >
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);

const ToolbarDivider: React.FC = () => (
  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1 }} />
);

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) {
    return (
      <div className="h-12 border-b border-gray-200 bg-gray-50 animate-pulse" />
    );
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 bg-white flex-wrap">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        tooltip="Bold (Ctrl+B)"
        icon={<FormatBold fontSize="small" />}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        tooltip="Italic (Ctrl+I)"
        icon={<FormatItalic fontSize="small" />}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        tooltip="Inline Code"
        icon={<Code fontSize="small" />}
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        tooltip="Heading"
        icon={<Title fontSize="small" />}
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        tooltip="Bullet List"
        icon={<FormatListBulleted fontSize="small" />}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        tooltip="Numbered List"
        icon={<FormatListNumbered fontSize="small" />}
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={editor.isActive('link') ? removeLink : addLink}
        isActive={editor.isActive('link')}
        tooltip={editor.isActive('link') ? 'Remove Link' : 'Add Link'}
        icon={<Link fontSize="small" />}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        tooltip="Quote"
        icon={<FormatQuote fontSize="small" />}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        tooltip="Code Block"
        icon={<Code fontSize="small" />}
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        tooltip="Undo (Ctrl+Z)"
        icon={<Undo fontSize="small" />}
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        tooltip="Redo (Ctrl+Y)"
        icon={<Redo fontSize="small" />}
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
        tooltip="Clear Formatting"
        icon={<FormatClear fontSize="small" />}
      />
    </div>
  );
};
