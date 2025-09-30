import { useCallback } from 'react';
import { useAppStore } from '@/store/appStore';
import { Message } from '@/types';
import { getRandomResponse } from '@/utils/mockResponses';
import { useStreamSimulator } from './useStreamSimulator';

export function useChat() {
  const {
    chatSession,
    addMessage,
    setStreaming,
    isFirstMessage,
    setFirstMessage,
  } = useAppStore();
  const { startStreaming } = useStreamSimulator();

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      addMessage(userMessage);

      setStreaming(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = getRandomResponse();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      addMessage(assistantMessage);

      try {
        await startStreaming(response, 4, 80, true);
      } catch (error) {
        console.error('Streaming error:', error);
        // still keep assistant message, don’t rethrow
      }

      if (isFirstMessage) {
        setFirstMessage(false);
      }
    },
    [addMessage, setStreaming, startStreaming, isFirstMessage, setFirstMessage]
  );

  return {
    messages: chatSession.messages,
    isStreaming: chatSession.isStreaming,
    sendMessage,
  };
}
