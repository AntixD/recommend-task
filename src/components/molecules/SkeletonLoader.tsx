import React from 'react';
import { Skeleton, Box, Paper } from '@mui/material';

export const SkeletonLoader: React.FC = () => (
  <Paper
    elevation={2}
    className="h-full flex flex-col bg-white overflow-hidden"
  >
    <Box className="p-2 border-b border-gray-200 bg-gray-50">
      <Box className="flex items-center gap-1">
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={i}>
            {i === 3 || i === 6 || i === 8 ? (
              <Box className="w-px h-8 bg-gray-300 mx-1" />
            ) : (
              <Skeleton
                variant="rounded"
                width={32}
                height={32}
                animation="wave"
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>

    <Box className="p-4 flex-1">
      <Skeleton
        variant="text"
        width="40%"
        height={32}
        className="mb-4"
        animation="wave"
      />
      <Skeleton variant="text" width="100%" animation="wave" />
      <Skeleton variant="text" width="100%" animation="wave" />
      <Skeleton variant="text" width="75%" animation="wave" />
      <Box className="mt-4">
        <Skeleton variant="text" width="90%" animation="wave" />
        <Skeleton variant="text" width="85%" animation="wave" />
        <Skeleton variant="text" width="95%" animation="wave" />
      </Box>
    </Box>
  </Paper>
);

export const ChatSkeleton: React.FC = () => (
  <Paper
    elevation={2}
    className="h-full flex flex-col bg-white overflow-hidden"
  >
    <Box className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200">
      <Skeleton
        variant="text"
        width={150}
        height={24}
        sx={{ bgcolor: 'rgba(255,255,255,0.3)' }}
      />
      <Skeleton
        variant="text"
        width={100}
        height={16}
        sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}
      />
    </Box>

    <Box className="flex-1 p-4 space-y-4">
      <Box className="flex gap-2 justify-end">
        <Skeleton variant="rounded" width="60%" height={60} animation="wave" />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>

      <Box className="flex gap-2">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="rounded" width="70%" height={80} animation="wave" />
      </Box>

      <Box className="flex gap-2 justify-end">
        <Skeleton variant="rounded" width="50%" height={50} animation="wave" />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </Box>

    <Box className="p-4 border-t border-gray-200 bg-gray-50">
      <Box className="flex gap-2">
        <Skeleton variant="rounded" width="100%" height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>
    </Box>
  </Paper>
);

export const CanvasLoadingSkeleton: React.FC = () => (
  <div className="h-screen flex flex-col bg-gray-50">
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <Skeleton variant="text" width={200} height={32} animation="wave" />
      <Skeleton variant="text" width={150} height={20} animation="wave" />
    </div>

    <div className="flex-1 flex gap-4 p-4">
      <div className="w-1/3 min-w-[320px] max-w-[400px]">
        <ChatSkeleton />
      </div>

      <div className="flex-1">
        <SkeletonLoader />
      </div>
    </div>
  </div>
);
