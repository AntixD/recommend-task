import { Message } from '@/types';

export const createMockStore = () => ({
  chatSession: {
    messages: [] as Message[],
    isStreaming: false,
  },
  streamingContent: '',
  isEditable: true,
  isFirstMessage: true,

  addMessage: jest.fn(),
  setStreaming: jest.fn(),
  setEditable: jest.fn(),
  appendStreamingContent: jest.fn(),
  clearStreamingContent: jest.fn(),
  setFirstMessage: jest.fn(),

  reset: jest.fn(),
});
