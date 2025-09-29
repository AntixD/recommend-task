'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ChatPanel } from './ChatPanel';
import { Button } from '@/components/atoms/Button';
import { Preview } from '@mui/icons-material';
import { useAppStore } from '@/store/appStore';
import { SkeletonLoader } from '../molecules/SkeletonLoader';
import { openPreviewWindow } from '@/utils/preview';

const EditorContainer = dynamic(
  () =>
    import('./EditorContainer').then((mod) => ({
      default: mod.EditorContainer,
    })),
  {
    ssr: false,
    loading: () => <SkeletonLoader />,
  }
);

export const CanvasView: React.FC = () => {
  const { editorState } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Canvas Editor</h1>
          <p className="text-sm text-gray-500">Chat-powered document editor</p>
        </div>
        <Button
          variant="outlined"
          startIcon={<Preview />}
          onClick={() => openPreviewWindow(editorState.content)}
          className="normal-case"
        >
          Preview
        </Button>
      </div>

      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="w-1/3 min-w-[320px] max-w-[400px]">
          <ChatPanel />
        </div>
        <div className="flex-1">
          <EditorContainer />
        </div>
      </div>
    </div>
  );
};
