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
  } = useAppStore();

  const startStreaming = useCallback(
    async (
      text: string,
      chunkSize: number = 3,
      baseDelay: number = 100,
      variableDelay: boolean = true
    ) => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }

      clearStreamingContent();

      await new Promise((resolve) => setTimeout(resolve, 100));

      setIsStreaming(true);
      setStreaming(true);
      setEditable(false);

      const chunks = chunkText(text, chunkSize);
      let chunkIndex = 0;

      console.log('Starting stream with', chunks.length, 'chunks');

      const streamChunk = () => {
        if (chunkIndex < chunks.length) {
          appendStreamingContent(chunks[chunkIndex]);
          chunkIndex++;

          const delay = variableDelay ? randomDelay(baseDelay) : baseDelay;
          intervalRef.current = setTimeout(streamChunk, delay);
        } else {
          console.log('Stream complete');
          stopStreaming();
        }
      };

      streamChunk();
    },
    [appendStreamingContent, clearStreamingContent, setStreaming, setEditable]
  );

  const stopStreaming = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsStreaming(false);
    setStreaming(false);
    setEditable(true);

    setTimeout(() => {
      clearStreamingContent();
    }, 100);
  }, [setStreaming, setEditable, clearStreamingContent]);

  return {
    isStreaming,
    startStreaming,
    stopStreaming,
  };
}
