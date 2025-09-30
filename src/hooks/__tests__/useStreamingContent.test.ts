import { renderHook } from '@testing-library/react';
import { useStreamingContent } from '../useStreamingContent';
import { Editor } from '@tiptap/react';

describe('useStreamingContent', () => {
  let mockEditor: Partial<Editor>;
  let mockOnReset: jest.Mock;
  let mockContainer: HTMLElement;

  beforeEach(() => {
    mockOnReset = jest.fn();

    mockContainer = document.createElement('div');
    mockContainer.className = 'overflow-y-auto';
    document.body.appendChild(mockContainer);

    mockEditor = {
      commands: {
        focus: jest.fn().mockReturnThis(),
        clearContent: jest.fn().mockReturnThis(),
        insertContent: jest.fn().mockReturnThis(),
      },
      view: {
        dom: {
          closest: jest.fn(() => mockContainer),
        },
      },
    } as unknown as Partial<Editor>;
  });

  afterEach(() => {
    document.body.removeChild(mockContainer);
    jest.clearAllMocks();
  });

  it('should handle null editor gracefully', () => {
    const {} = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: null,
          streamingContent: 'test',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    expect(mockEditor.commands?.focus).not.toHaveBeenCalled();
    expect(mockOnReset).not.toHaveBeenCalled();
  });

  it('should focus editor when message count increases', () => {
    const { rerender } = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: '',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    rerender({
      editor: mockEditor as Editor,
      streamingContent: '',
      messageCount: 2,
      onReset: mockOnReset,
    });

    expect(mockEditor.commands!.focus).toHaveBeenCalledWith('end');
  });

  it('should clear welcome text on first streaming content', () => {
    const { rerender } = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: '',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    rerender({
      editor: mockEditor as Editor,
      streamingContent: 'Hello',
      messageCount: 1,
      onReset: mockOnReset,
    });

    expect(mockEditor.commands!.clearContent).toHaveBeenCalled();
    expect(mockEditor.commands!.insertContent).toHaveBeenCalledWith('Hello');
  });

  it('should append new content incrementally', () => {
    const { rerender } = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: 'Hello',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    rerender({
      editor: mockEditor as Editor,
      streamingContent: 'Hello World',
      messageCount: 1,
      onReset: mockOnReset,
    });

    expect(mockEditor.commands!.insertContent).toHaveBeenLastCalledWith(
      ' World'
    );
  });

  it('should insert separator for multiple messages', () => {
    const { rerender } = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: 'First message',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    rerender({
      editor: mockEditor as Editor,
      streamingContent: '',
      messageCount: 2,
      onReset: mockOnReset,
    });

    rerender({
      editor: mockEditor as Editor,
      streamingContent: 'Second',
      messageCount: 2,
      onReset: mockOnReset,
    });

    expect(mockEditor.commands!.insertContent).toHaveBeenCalledWith(
      '<p><br/></p><hr/><p><br/></p>'
    );
    expect(mockEditor.commands!.insertContent).toHaveBeenCalledWith('Second');
  });

  it('should call onReset when streaming content is cleared', () => {
    const { rerender } = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: 'Some content',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    rerender({
      editor: mockEditor as Editor,
      streamingContent: '',
      messageCount: 1,
      onReset: mockOnReset,
    });

    expect(mockOnReset).toHaveBeenCalled();
  });

  it('should handle scrolling to bottom', (done) => {
    Object.defineProperty(mockContainer, 'scrollHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(mockContainer, 'scrollTop', {
      value: 0,
      writable: true,
    });

    renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: 'Content that should trigger scroll',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    setTimeout(() => {
      expect(mockContainer.scrollTop).toBe(1000);
      done();
    }, 10);
  });

  it('should not insert content when streaming content does not change', () => {
    const { rerender } = renderHook(
      ({ editor, streamingContent, messageCount, onReset }) =>
        useStreamingContent({
          editor,
          streamingContent,
          messageCount,
          onReset,
        }),
      {
        initialProps: {
          editor: mockEditor as Editor,
          streamingContent: 'Same content',
          messageCount: 1,
          onReset: mockOnReset,
        },
      }
    );

    const insertCallCount = (mockEditor.commands!.insertContent as jest.Mock)
      .mock.calls.length;

    rerender({
      editor: mockEditor as Editor,
      streamingContent: 'Same content',
      messageCount: 1,
      onReset: mockOnReset,
    });

    expect(
      (mockEditor.commands!.insertContent as jest.Mock).mock.calls.length
    ).toBe(insertCallCount);
  });
});
