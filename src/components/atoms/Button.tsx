import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import clsx from 'clsx';

interface ButtonProps extends MuiButtonProps {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <MuiButton
      className={clsx('transition-all duration-200', className)}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
