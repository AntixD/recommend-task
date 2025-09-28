import React from 'react';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';
import clsx from 'clsx';

type TextFieldProps = MuiTextFieldProps & {
  className?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  className,
  ...props
}) => {
  return (
    <MuiTextField
      className={clsx('w-full', className)}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};
