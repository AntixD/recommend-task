'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Paper, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';
import { TextField } from '@/components/atoms/TextField';
import { Button } from '@/components/atoms/Button';
import { ChatMessage } from '@/components/molecules/ChatMessage';
import { useChat } from '@/hooks/useChat';
import { useAppStore } from '@/store/appStore';

export const ChatPanel: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, isStreaming, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isChatFocused, setChatFocused } = useAppStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isChatFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatFocused]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isStreaming) {
      await sendMessage(input);
      setInput('');
      setChatFocused(true);
    }
  };

  return (
    <Paper elevation={2} className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
        <h2 className="text-white font-semibold text-lg">AI Assistant</h2>
        <p className="text-blue-100 text-sm">Ask anything...</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">👋 Welcome!</p>
            <p className="text-sm">
              Start a conversation to see responses in the editor
            </p>
          </div>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 text-gray-500">
            <CircularProgress size={16} />
            <span className="text-sm">AI is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <TextField
            inputRef={inputRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            fullWidth
            autoFocus
            onFocus={() => setChatFocused(true)}
            onBlur={() => setChatFocused(false)}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!input.trim() || isStreaming}
            endIcon={<Send />}
          >
            Send
          </Button>
        </div>
      </form>
    </Paper>
  );
};
