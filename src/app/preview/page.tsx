'use client';

import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';

export default function PreviewPage() {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const savedContent = localStorage.getItem('previewContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Paper elevation={2} className="p-8 bg-white">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Preview Mode
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: content || '<p>No content to preview</p>',
              }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
}
