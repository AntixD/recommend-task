import { useState, useCallback, useRef } from 'react';
import { chunkText, randomDelay } from '@/utils/textChunker';
import { useAppStore } from '@/store/appStore';

export function useStreamSimulator() {
  const [isStreaming, setIsStreaming] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    appendStreamingContent,
    clearStreamingContent,
    setStreaming,
    setEditable,
    setEditorContent,
  } = useAppStore();

  const startStreaming = useCallback(
    async (
      text: string,
      chunkSize: number = 3,
      baseDelay: number = 100,
      variableDelay: boolean = true,
      clearPrevious: boolean = false
    ) => {
      if (isStreaming) return;

      setIsStreaming(true);
      setStreaming(true);
      setEditable(false);

      if (clearPrevious) {
        setEditorContent('');
      }

      clearStreamingContent();

      const chunks = chunkText(text, chunkSize);
      let chunkIndex = 0;

      const streamChunk = () => {
        if (chunkIndex < chunks.length) {
          appendStreamingContent(chunks[chunkIndex]);
          chunkIndex++;

          const delay = variableDelay ? randomDelay(baseDelay) : baseDelay;
          intervalRef.current = setTimeout(streamChunk, delay);
        } else {
          stopStreaming();
        }
      };

      streamChunk();
    },
    [
      isStreaming,
      appendStreamingContent,
      clearStreamingContent,
      setStreaming,
      setEditable,
      setEditorContent,
    ]
  );

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsStreaming(false);
    setStreaming(false);
    setEditable(true);
  }, [setStreaming, setEditable]);

  return {
    isStreaming,
    startStreaming,
    stopStreaming,
  };
}
