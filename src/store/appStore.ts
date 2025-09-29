import { create } from 'zustand';
import { ChatSlice, createChatSlice } from './chatSlice';
import { EditorSlice, createEditorSlice } from './editorSlice';
import { UiSlice, createUiSlice } from './uiSlice';

export const useAppStore = create<ChatSlice & EditorSlice & UiSlice>()(
  (...args) => ({
    ...createChatSlice(...args),
    ...createEditorSlice(...args),
    ...createUiSlice(...args),
  })
);
