import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';
import { useAppStore } from '@/store/appStore';
import { useStreamSimulator } from '../useStreamSimulator';
import * as mockResponseUtils from '@/utils/mockResponses';
import { Message } from '@/types';

jest.mock('@/store/appStore');
jest.mock('../useStreamSimulator');
jest.mock('@/utils/mockResponses');

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('useChat', () => {
  let mockAppStore: {
    chatSession: {
      messages: Message[];
      isStreaming: boolean;
    };
    addMessage: jest.Mock;
    setStreaming: jest.Mock;
    isFirstMessage: boolean;
    setFirstMessage: jest.Mock;
  };

  let mockStreamSimulator: {
    isStreaming: boolean;
    startStreaming: jest.Mock;
    stopStreaming: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockAppStore = {
      chatSession: {
        messages: [],
        isStreaming: false,
      },
      addMessage: jest.fn(),
      setStreaming: jest.fn(),
      isFirstMessage: true,
      setFirstMessage: jest.fn(),
    };

    mockStreamSimulator = {
      isStreaming: false,
      startStreaming: jest.fn().mockResolvedValue(undefined),
      stopStreaming: jest.fn(),
    };

    (useAppStore as unknown as jest.Mock).mockReturnValue(mockAppStore);
    (useStreamSimulator as jest.Mock).mockReturnValue(mockStreamSimulator);
    (mockResponseUtils.getRandomResponse as jest.Mock).mockReturnValue(
      'Mock assistant response'
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('sendMessage', () => {
    it('should send a message and receive a response', async () => {
      const { result } = renderHook(() => useChat());

      await act(async () => {
        const promise = result.current.sendMessage('Hello AI');
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(mockAppStore.addMessage).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          role: 'user',
          content: 'Hello AI',
          timestamp: expect.any(Date),
        })
      );

      expect(mockAppStore.setStreaming).toHaveBeenCalledWith(true);

      expect(mockAppStore.addMessage).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          role: 'assistant',
          content: 'Mock assistant response',
          timestamp: expect.any(Date),
        })
      );

      expect(mockStreamSimulator.startStreaming).toHaveBeenCalledWith(
        'Mock assistant response',
        4,
        80,
        true
      );
    });

    it('should handle first message correctly', async () => {
      const { result } = renderHook(() => useChat());

      await act(async () => {
        const promise = result.current.sendMessage('First message');
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(mockAppStore.setFirstMessage).toHaveBeenCalledWith(false);
    });

    it('should not update first message flag when already false', async () => {
      mockAppStore.isFirstMessage = false;
      const { result } = renderHook(() => useChat());

      await act(async () => {
        const promise = result.current.sendMessage('Another message');
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(mockAppStore.setFirstMessage).not.toHaveBeenCalled();
    });

    it('should handle streaming errors gracefully', async () => {
      mockStreamSimulator.startStreaming.mockRejectedValue(
        new Error('Streaming failed')
      );

      const { result } = renderHook(() => useChat());

      await act(async () => {
        const promise = result.current.sendMessage('Test message');
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(mockAppStore.addMessage).toHaveBeenCalledTimes(2);

      expect(console.error).toHaveBeenCalledWith(
        'Streaming error:',
        expect.any(Error)
      );
    });

    it('should handle empty message content', async () => {
      const { result } = renderHook(() => useChat());

      await act(async () => {
        const promise = result.current.sendMessage('');
        jest.advanceTimersByTime(500);
        await promise;
      });

      expect(mockAppStore.addMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'user',
          content: '',
        })
      );

      expect(mockAppStore.addMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'assistant',
          content: 'Mock assistant response',
        })
      );
    });

    it('should generate unique IDs for messages', async () => {
      const { result } = renderHook(() => useChat());

      await act(async () => {
        const promise = result.current.sendMessage('Test');
        jest.advanceTimersByTime(500);
        await promise;
      });

      const calls = mockAppStore.addMessage.mock.calls;
      const userMessageId = calls[0][0].id;
      const assistantMessageId = calls[1][0].id;

      expect(userMessageId).toBeDefined();
      expect(assistantMessageId).toBeDefined();
      expect(userMessageId).not.toEqual(assistantMessageId);
    });
  });

  describe('return values', () => {
    it('should return messages from store', () => {
      const mockMessages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: 'Hello',
          timestamp: new Date(),
        },
        {
          id: '2',
          role: 'assistant',
          content: 'Hi there',
          timestamp: new Date(),
        },
      ];

      mockAppStore.chatSession.messages = mockMessages;

      const { result } = renderHook(() => useChat());

      expect(result.current.messages).toEqual(mockMessages);
    });

    it('should return streaming state from store', () => {
      mockAppStore.chatSession.isStreaming = true;

      const { result } = renderHook(() => useChat());

      expect(result.current.isStreaming).toBe(true);
    });

    it('should update when store values change', () => {
      const { result, rerender } = renderHook(() => useChat());

      expect(result.current.messages).toEqual([]);
      expect(result.current.isStreaming).toBe(false);

      mockAppStore.chatSession.messages = [
        {
          id: '1',
          role: 'user',
          content: 'Test',
          timestamp: new Date(),
        },
      ];
      mockAppStore.chatSession.isStreaming = true;

      (useAppStore as unknown as jest.Mock).mockReturnValue(mockAppStore);
      rerender();

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.isStreaming).toBe(true);
    });
  });
});
