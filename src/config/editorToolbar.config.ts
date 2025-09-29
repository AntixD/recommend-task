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
import { Editor } from '@tiptap/react';

export interface ToolbarAction {
  id: string;
  icon: React.ComponentType<{ fontSize?: 'small' | 'medium' | 'large' }>;
  tooltip: string;
  action: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  isDisabled?: (editor: Editor) => boolean;
  requiresInput?: boolean;
}

export interface ToolbarGroup {
  id: string;
  items: ToolbarAction[];
}

export const toolbarConfig: ToolbarGroup[] = [
  {
    id: 'formatting',
    items: [
      {
        id: 'bold',
        icon: FormatBold,
        tooltip: 'Bold (Ctrl+B)',
        action: (editor) => editor.chain().focus().toggleBold().run(),
        isActive: (editor) => editor.isActive('bold'),
      },
      {
        id: 'italic',
        icon: FormatItalic,
        tooltip: 'Italic (Ctrl+I)',
        action: (editor) => editor.chain().focus().toggleItalic().run(),
        isActive: (editor) => editor.isActive('italic'),
      },
      {
        id: 'code',
        icon: Code,
        tooltip: 'Inline Code',
        action: (editor) => editor.chain().focus().toggleCode().run(),
        isActive: (editor) => editor.isActive('code'),
      },
    ],
  },
  {
    id: 'headings',
    items: [
      {
        id: 'heading2',
        icon: Title,
        tooltip: 'Heading',
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (editor) => editor.isActive('heading', { level: 2 }),
      },
    ],
  },
  {
    id: 'lists',
    items: [
      {
        id: 'bulletList',
        icon: FormatListBulleted,
        tooltip: 'Bullet List',
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor.isActive('bulletList'),
      },
      {
        id: 'orderedList',
        icon: FormatListNumbered,
        tooltip: 'Numbered List',
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
        isActive: (editor) => editor.isActive('orderedList'),
      },
    ],
  },
  {
    id: 'blocks',
    items: [
      {
        id: 'link',
        icon: Link,
        tooltip: 'Add/Remove Link',
        action: (editor) => {
          if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
          } else {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }
        },
        isActive: (editor) => editor.isActive('link'),
        requiresInput: true,
      },
      {
        id: 'blockquote',
        icon: FormatQuote,
        tooltip: 'Quote',
        action: (editor) => editor.chain().focus().toggleBlockquote().run(),
        isActive: (editor) => editor.isActive('blockquote'),
      },
      {
        id: 'codeBlock',
        icon: Code,
        tooltip: 'Code Block',
        action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
        isActive: (editor) => editor.isActive('codeBlock'),
      },
    ],
  },
  {
    id: 'history',
    items: [
      {
        id: 'undo',
        icon: Undo,
        tooltip: 'Undo (Ctrl+Z)',
        action: (editor) => editor.chain().focus().undo().run(),
        isDisabled: (editor) => !editor.can().undo(),
      },
      {
        id: 'redo',
        icon: Redo,
        tooltip: 'Redo (Ctrl+Y)',
        action: (editor) => editor.chain().focus().redo().run(),
        isDisabled: (editor) => !editor.can().redo(),
      },
    ],
  },
  {
    id: 'clear',
    items: [
      {
        id: 'clearFormatting',
        icon: FormatClear,
        tooltip: 'Clear Formatting',
        action: (editor) =>
          editor.chain().focus().unsetAllMarks().clearNodes().run(),
      },
    ],
  },
];
