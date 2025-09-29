'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Paper } from '@mui/material';
import { EditorToolbar } from '@/components/molecules/EditorToolbar';
import { useAppStore } from '@/store/appStore';
import { useStreamingContent } from '@/hooks/useStreamingContent';

interface EditorContainerProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  isReadOnly?: boolean;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
  initialContent,
  onChange,
  isReadOnly = false,
}) => {
  const { editorState, setEditorContent, clearStreamingContent, chatSession } =
    useAppStore();
  const [messageCount, setMessageCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing or send a message in chat...',
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent || editorState.content,
    editable: !isReadOnly && editorState.isEditable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setEditorContent(html);
      onChange?.(html);
    },
  });

  useEffect(() => {
    const aiMessages = chatSession.messages.filter(
      (m) => m.role === 'assistant'
    ).length;
    setMessageCount(aiMessages);
  }, [chatSession.messages]);

  useStreamingContent({
    editor,
    streamingContent: editorState.streamingContent,
    messageCount,
    onReset: clearStreamingContent,
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isReadOnly && editorState.isEditable);
    }
  }, [editor, editorState.isEditable, isReadOnly]);

  if (!editor) {
    return (
      <Paper elevation={2} className="h-full flex flex-col bg-white">
        <div className="h-12 border-b border-gray-200 bg-gray-50 animate-pulse" />
        <div className="flex-1 p-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} className="h-full flex flex-col bg-white">
      {!isReadOnly && <EditorToolbar editor={editor} />}
      <div className="flex-1 overflow-y-auto">
        <EditorContent
          editor={editor}
          className="h-full [&_.ProseMirror]:min-h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:outline-none"
        />
      </div>
    </Paper>
  );
};
