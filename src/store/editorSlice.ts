import { StateCreator } from 'zustand';
import { EditorState } from '@/types';

export interface EditorSlice {
  editorState: EditorState;
  setEditorContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;
  clearStreamingContent: () => void;
  setEditable: (isEditable: boolean) => void;
  clearEditor: () => void;
}

export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  editorState: { content: '', isEditable: true, streamingContent: '' },

  setEditorContent: (content) =>
    set((state) => ({
      editorState: { ...state.editorState, content },
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
      editorState: { ...state.editorState, streamingContent: '' },
    })),

  setEditable: (isEditable) =>
    set((state) => ({
      editorState: { ...state.editorState, isEditable },
    })),

  clearEditor: () =>
    set((state) => ({
      editorState: { ...state.editorState, content: '', streamingContent: '' },
    })),
});
