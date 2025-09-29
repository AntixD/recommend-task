import { StateCreator } from 'zustand';
import { Message, ChatSession } from '@/types';

export interface ChatSlice {
  chatSession: ChatSession;
  addMessage: (message: Message) => void;
  setStreaming: (isStreaming: boolean) => void;
}

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
  chatSession: { id: '1', messages: [], isStreaming: false },

  addMessage: (message) =>
    set((state) => ({
      chatSession: {
        ...state.chatSession,
        messages: [...state.chatSession.messages, message],
      },
    })),

  setStreaming: (isStreaming) =>
    set((state) => ({
      chatSession: { ...state.chatSession, isStreaming },
    })),
});
