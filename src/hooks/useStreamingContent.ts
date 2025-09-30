import { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';

interface UseStreamingContentProps {
  editor: Editor | null;
  streamingContent: string;
  messageCount: number;
  onReset: () => void;
}

export const useStreamingContent = ({
  editor,
  streamingContent,
  messageCount,
  onReset,
}: UseStreamingContentProps) => {
  const lastStreamingContent = useRef('');
  const hasWelcomeText = useRef(true);
  const previousMessageCount = useRef(messageCount);

  useEffect(() => {
    if (!editor) return;
    if (messageCount > previousMessageCount.current) {
      editor.commands.focus('end');
      previousMessageCount.current = messageCount;
    }

    if (streamingContent) {
      const newContent = streamingContent.slice(
        lastStreamingContent.current.length
      );

      if (newContent) {
        if (hasWelcomeText.current && lastStreamingContent.current === '') {
          editor.commands.clearContent();
          hasWelcomeText.current = false;
        }

        if (lastStreamingContent.current === '' && messageCount > 1) {
          editor.commands.focus('end');
          editor.commands.insertContent('<p><br/></p><hr/><p><br/></p>');
        }

        editor.commands.focus('end');
        editor.commands.insertContent(newContent);

        lastStreamingContent.current = streamingContent;

        setTimeout(() => {
          const editorElement = editor.view.dom;
          const container = editorElement.closest('.overflow-y-auto');
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }, 0);
      }
    }

    if (streamingContent === '' && lastStreamingContent.current !== '') {
      lastStreamingContent.current = '';
      onReset();
    }
  }, [editor, streamingContent, messageCount, onReset]);
};
