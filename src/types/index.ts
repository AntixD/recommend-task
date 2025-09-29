export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
export interface ChatSession {
  id: string;
  messages: Message[];
  isStreaming: boolean;
}

export interface EditorState {
  content: string;
  isEditable: boolean;
  streamingContent: string;
}

export interface StreamConfig {
  chunkSize: number;
  delay: number;
  variableDelay: boolean;
}
