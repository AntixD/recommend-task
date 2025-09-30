import { renderHook, act } from '@testing-library/react';
import { useChat } from '../useChat';
import { useAppStore } from '@/store/appStore';
import { useStreamSimulator } from '../useStreamSimulator';
import * as mockResponseUtils from '@/utils/mockResponses';
import { Message } from '@/types';

jest.mock('@/store/appStore');
jest.mock('../useStreamSimulator');
jest.mock('@/utils/mockResponses');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore?.();
});

const mockedUseAppStore = useAppStore as unknown as jest.MockedFunction<
  typeof useAppStore
>;
const mockedUseStreamSimulator =
  useStreamSimulator as unknown as jest.MockedFunction<
    typeof useStreamSimulator
  >;

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

  let mockStartStreaming: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

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

    mockStartStreaming = jest.fn().mockResolvedValue(undefined);

    mockedUseAppStore.mockReturnValue(mockAppStore);
    mockedUseStreamSimulator.mockReturnValue({
      isStreaming: false,
      startStreaming: mockStartStreaming,
      stopStreaming: jest.fn(),
    });
    (mockResponseUtils.getRandomResponse as jest.Mock).mockReturnValue(
      'Mock assistant response'
    );
  });

  it('should handle errors gracefully', async () => {
    mockStartStreaming.mockRejectedValue(new Error('Streaming failed'));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('Test message');
    });

    expect(mockAppStore.addMessage).toHaveBeenCalledTimes(2);

    expect(mockStartStreaming).toHaveBeenCalled();
  });

  it('should handle empty message content', async () => {
    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage('');
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
});
