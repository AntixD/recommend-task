import React from 'react';
import { Editor } from '@tiptap/react';
import { IconButton, Divider, Tooltip } from '@mui/material';
import { toolbarConfig } from '@/config/editorToolbar.config';

interface EditorToolbarProps {
  editor: Editor | null;
  className?: string;
  showGroups?: string[];
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  icon: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive = false,
  disabled = false,
  tooltip,
  icon,
}) => (
  <Tooltip title={tooltip} arrow>
    <span>
      <IconButton
        size="small"
        onClick={onClick}
        disabled={disabled}
        sx={{
          borderRadius: '6px',
          border: '2px solid',
          borderColor: isActive ? '#2563eb' : 'transparent',
          backgroundColor: isActive ? '#dbeafe' : 'transparent',
          color: isActive ? '#1e40af' : '#6b7280',
          margin: '2px',
          '&:hover': {
            backgroundColor: isActive ? '#bfdbfe' : '#f3f4f6',
            borderColor: isActive ? '#2563eb' : '#d1d5db',
          },
          '&.Mui-disabled': {
            color: '#d1d5db',
            borderColor: 'transparent',
          },
        }}
      >
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  editor,
  className = '',
  showGroups,
}) => {
  if (!editor) {
    return (
      <div className="h-12 border-b border-gray-200 bg-gray-50 animate-pulse" />
    );
  }

  const groups = showGroups
    ? toolbarConfig.filter((group) => showGroups.includes(group.id))
    : toolbarConfig;

  return (
    <div
      className={`flex items-center px-2 py-1 border-b border-gray-200 bg-white flex-wrap ${className}`}
    >
      {groups.map((group, groupIndex) => (
        <React.Fragment key={group.id}>
          {group.items.map((item) => {
            const IconComponent = item.icon;

            return (
              <ToolbarButton
                key={item.id}
                onClick={() => item.action(editor)}
                isActive={item.isActive?.(editor)}
                disabled={item.isDisabled?.(editor)}
                tooltip={item.tooltip}
                icon={<IconComponent fontSize="small" />}
              />
            );
          })}

          {groupIndex < groups.length - 1 && (
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
