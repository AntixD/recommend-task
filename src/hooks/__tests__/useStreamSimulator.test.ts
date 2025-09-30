import { renderHook, act, waitFor } from '@testing-library/react';
import { useStreamSimulator } from '../useStreamSimulator';
import { useAppStore } from '@/store/appStore';
import * as textChunkerUtils from '@/utils/textChunker';

jest.mock('@/store/appStore');

jest.mock('@/utils/textChunker', () => ({
  chunkText: jest.fn(),
  randomDelay: jest.fn(),
}));

describe('useStreamSimulator', () => {
  let mockAppStore: {
    appendStreamingContent: jest.Mock;
    clearStreamingContent: jest.Mock;
    setStreaming: jest.Mock;
    setEditable: jest.Mock;
  };

  beforeEach(() => {
    jest.useFakeTimers();

    mockAppStore = {
      appendStreamingContent: jest.fn(),
      clearStreamingContent: jest.fn(),
      setStreaming: jest.fn(),
      setEditable: jest.fn(),
    };

    (useAppStore as unknown as jest.Mock).mockReturnValue(mockAppStore);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should initialize with isStreaming as false', () => {
    const { result } = renderHook(() => useStreamSimulator());
    expect(result.current.isStreaming).toBe(false);
  });

  it('should start streaming and process chunks', async () => {
    const testText = 'Hello World!';
    const chunks = ['Hel', 'lo ', 'Wor', 'ld!'];

    (textChunkerUtils.chunkText as jest.Mock).mockReturnValue(chunks);
    (textChunkerUtils.randomDelay as jest.Mock).mockReturnValue(100);

    const { result } = renderHook(() => useStreamSimulator());

    await act(async () => {
      result.current.startStreaming(testText, 3, 100, true);
      jest.advanceTimersByTime(100);
    });

    expect(result.current.isStreaming).toBe(true);
    expect(mockAppStore.clearStreamingContent).toHaveBeenCalled();
    expect(mockAppStore.setStreaming).toHaveBeenCalledWith(true);
    expect(mockAppStore.setEditable).toHaveBeenCalledWith(false);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockAppStore.appendStreamingContent).toHaveBeenCalledWith(chunks[0]);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockAppStore.appendStreamingContent).toHaveBeenCalledWith(chunks[1]);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockAppStore.appendStreamingContent).toHaveBeenCalledWith(chunks[2]);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockAppStore.appendStreamingContent).toHaveBeenCalledWith(chunks[3]);

    await waitFor(() => {
      expect(result.current.isStreaming).toBe(false);
    });

    expect(mockAppStore.setStreaming).toHaveBeenCalledWith(false);
    expect(mockAppStore.setEditable).toHaveBeenCalledWith(true);
  });

  it('should stop streaming when stopStreaming is called', async () => {
    const testText = 'Hello World!';
    const chunks = ['Hel', 'lo ', 'Wor', 'ld!'];

    (textChunkerUtils.chunkText as jest.Mock).mockReturnValue(chunks);
    (textChunkerUtils.randomDelay as jest.Mock).mockReturnValue(100);

    const { result } = renderHook(() => useStreamSimulator());

    await act(async () => {
      result.current.startStreaming(testText);
      jest.advanceTimersByTime(100);
    });

    expect(result.current.isStreaming).toBe(true);

    act(() => {
      result.current.stopStreaming();
    });

    expect(result.current.isStreaming).toBe(false);
    expect(mockAppStore.setStreaming).toHaveBeenCalledWith(false);
    expect(mockAppStore.setEditable).toHaveBeenCalledWith(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(mockAppStore.clearStreamingContent).toHaveBeenCalledTimes(2);
  });

  it('should handle custom chunk size and delays', async () => {
    const testText = 'Test';
    const chunks = ['Te', 'st'];

    (textChunkerUtils.chunkText as jest.Mock).mockReturnValue(chunks);
    (textChunkerUtils.randomDelay as jest.Mock).mockImplementation(
      (base) => base
    );

    const { result } = renderHook(() => useStreamSimulator());

    await act(async () => {
      result.current.startStreaming(testText, 2, 50, false);
      jest.advanceTimersByTime(100);
    });

    expect(textChunkerUtils.chunkText).toHaveBeenCalledWith(testText, 2);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(mockAppStore.appendStreamingContent).toHaveBeenCalledWith(chunks[0]);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(mockAppStore.appendStreamingContent).toHaveBeenCalledWith(chunks[1]);
  });

  it('should clear previous streaming if started while already streaming', async () => {
    const chunks1 = ['First'];
    const chunks2 = ['Second'];

    (textChunkerUtils.chunkText as jest.Mock)
      .mockReturnValueOnce(chunks1)
      .mockReturnValueOnce(chunks2);
    (textChunkerUtils.randomDelay as jest.Mock).mockReturnValue(100);

    const { result } = renderHook(() => useStreamSimulator());

    await act(async () => {
      result.current.startStreaming('First');
      jest.advanceTimersByTime(100);
    });

    await act(async () => {
      result.current.startStreaming('Second');
      jest.advanceTimersByTime(100);
    });

    expect(mockAppStore.clearStreamingContent).toHaveBeenCalledTimes(2);
  });
});
