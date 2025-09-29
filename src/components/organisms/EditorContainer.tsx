'use client';

import React, { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Paper } from '@mui/material';
import { EditorToolbar } from '@/components/molecules/EditorToolbar';
import { useAppStore } from '@/store/appStore';

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
  const {
    editorState,
    setEditorContent,
    clearStreamingContent,
    isFirstMessage,
  } = useAppStore();

  const lastStreamingContent = useRef('');
  const hasCleared = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder:
          'Welcome to Canvas Editor! Start a conversation in the chat panel to see AI responses stream here...',
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
    if (editor && editorState.streamingContent) {
      const newContent = editorState.streamingContent.slice(
        lastStreamingContent.current.length
      );

      if (newContent) {
        if (
          isFirstMessage &&
          !hasCleared.current &&
          lastStreamingContent.current === ''
        ) {
          editor.commands.clearContent();
          hasCleared.current = true;
        }

        if (lastStreamingContent.current === '' && !isFirstMessage) {
          editor.commands.focus('end');
          editor.commands.insertContent('<br><br><hr><br>');
        }

        editor.commands.focus('end');
        editor.commands.insertContent(newContent);
        lastStreamingContent.current = editorState.streamingContent;
      }
    }

    if (
      editorState.streamingContent === '' &&
      lastStreamingContent.current !== ''
    ) {
      lastStreamingContent.current = '';
    }
  }, [editorState.streamingContent, editor, isFirstMessage]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isReadOnly && editorState.isEditable);
    }
  }, [editor, editorState.isEditable, isReadOnly]);

  useEffect(() => {
    return () => {
      clearStreamingContent();
    };
  }, [clearStreamingContent]);

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
