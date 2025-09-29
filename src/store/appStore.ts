import { create } from 'zustand';
import { Message, ChatSession, EditorState } from '@/types';

interface AppState {
  chatSession: ChatSession;
  addMessage: (message: Message) => void;
  setStreaming: (isStreaming: boolean) => void;

  editorState: EditorState;
  setEditorContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;
  clearStreamingContent: () => void;
  setEditable: (isEditable: boolean) => void;
  clearEditor: () => void;

  isChatFocused: boolean;
  setChatFocused: (focused: boolean) => void;
  isFirstMessage: boolean;
  setFirstMessage: (isFirst: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  chatSession: {
    id: '1',
    messages: [],
    isStreaming: false,
  },

  addMessage: (message) =>
    set((state) => ({
      chatSession: {
        ...state.chatSession,
        messages: [...state.chatSession.messages, message],
      },
    })),

  setStreaming: (isStreaming) =>
    set((state) => ({
      chatSession: {
        ...state.chatSession,
        isStreaming,
      },
    })),

  editorState: {
    content: '',
    isEditable: true,
    streamingContent: '',
  },

  setEditorContent: (content) =>
    set((state) => ({
      editorState: {
        ...state.editorState,
        content,
      },
    })),

  appendStreamingContent: (chunk) =>
    set((state) => ({
      editorState: {
        ...state.editorState,
        streamingContent: state.editorState.streamingContent + chunk,
      },
    })),

  clearStreamingContent: () =>
    set((state) => ({
      editorState: {
        ...state.editorState,
        streamingContent: '',
      },
    })),

  setEditable: (isEditable) =>
    set((state) => ({
      editorState: {
        ...state.editorState,
        isEditable,
      },
    })),

  clearEditor: () =>
    set((state) => ({
      editorState: {
        ...state.editorState,
        content: '',
        streamingContent: '',
      },
    })),

  isChatFocused: true,
  setChatFocused: (focused) => set({ isChatFocused: focused }),
  isFirstMessage: true,
  setFirstMessage: (isFirst) => set({ isFirstMessage: isFirst }),
}));
