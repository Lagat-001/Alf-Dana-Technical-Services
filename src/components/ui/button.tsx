import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        brand:
          'bg-[#0A2540] text-white hover:bg-[#0A2540]/90 shadow-md',
        brandAccent:
          'bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90 shadow-md',
        brandOutline:
          'border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#0A2540]',
        whatsapp:
          'bg-[#25D366] text-white hover:bg-[#22c55e] shadow-md',
      },
      size: {
        default: 'h-11 px-4 py-2',        /* 44px — meets touch target minimum */
        sm: 'h-10 rounded-md px-3',       /* 40px — acceptable with surrounding padding */
        lg: 'h-12 rounded-md px-8',       /* 48px */
        xl: 'h-14 rounded-lg px-10 text-base', /* 56px */
        icon: 'h-11 w-11',                /* 44px */
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
