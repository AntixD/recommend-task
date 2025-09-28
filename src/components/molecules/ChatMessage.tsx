import React from 'react';
import { Avatar, Paper } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import clsx from 'clsx';
import { Message } from '@/types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={clsx(
        'flex gap-3 mb-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          width: 32,
          height: 32,
        }}
      >
        {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
      </Avatar>
      <Paper
        elevation={1}
        className={clsx(
          'px-4 py-2 max-w-[80%]',
          isUser ? 'bg-blue-50' : 'bg-gray-50'
        )}
      >
        <p className="text-sm text-gray-800">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </Paper>
    </div>
  );
};
