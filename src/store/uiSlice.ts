import { StateCreator } from 'zustand';

export interface UiSlice {
  isChatFocused: boolean;
  setChatFocused: (focused: boolean) => void;
  isFirstMessage: boolean;
  setFirstMessage: (isFirst: boolean) => void;
}

export const createUiSlice: StateCreator<UiSlice> = (set) => ({
  isChatFocused: true,
  setChatFocused: (focused) => set({ isChatFocused: focused }),

  isFirstMessage: true,
  setFirstMessage: (isFirst) => set({ isFirstMessage: isFirst }),
});
