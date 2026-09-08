import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'flex w-full rounded-md border bg-background text-sm',
    'px-3 py-2',
    'transition-all duration-200',
    'placeholder:text-muted-foreground',

    // Default border
    'border-gray-300',

    // Hover
    'hover:border-blue-500',

    // Focus (Ant Design style)
    'focus-visible:outline-none',
    'focus-visible:border-blue-500',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500/20',

    // Disabled
    'disabled:cursor-not-allowed',
    'disabled:bg-muted',
    'disabled:opacity-60',

    // File input
    'file:border-0',
    'file:bg-transparent',
    'file:text-sm',
    'file:font-medium',
  ],
  {
    variants: {
      variant: {
        default: '',
        error:
          'border-red-500 hover:border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
      },
      inputSize: {
        sm: 'h-9 text-sm',
        default: 'h-10 text-sm',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
