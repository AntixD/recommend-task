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

  useEffect(() => {
    if (!editor) return;

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
      }
    }

    if (streamingContent === '' && lastStreamingContent.current !== '') {
      lastStreamingContent.current = '';
      onReset();
    }
  }, [editor, streamingContent, messageCount, onReset]);
};
