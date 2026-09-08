import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  [
    'flex w-full min-h-32 rounded-md border bg-background text-sm',
    'px-3 py-2',
    'transition-all duration-200',
    'placeholder:text-muted-foreground',

    'border-gray-300',

    'hover:border-blue-500',

    'focus-visible:outline-none',
    'focus-visible:border-blue-500',
    'focus-visible:ring-2',
    'focus-visible:ring-blue-500/20',

    'disabled:cursor-not-allowed',
    'disabled:bg-muted',
    'disabled:opacity-60',

    'resize-y',
  ],
  {
    variants: {
      variant: {
        default: '',
        error:
          'border-red-500 hover:border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TextAreaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea ref={ref} className={cn(textareaVariants({ variant }), className)} {...props} />
    );
  },
);

export { Textarea };
