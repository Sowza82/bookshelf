'use client'

import * as React from 'react'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`
      flex min-h-[60px] w-full rounded-md border px-3 py-2 text-base shadow-sm
      bg-white dark:bg-gray-800
      border-gray-300 dark:border-gray-700
      text-black dark:text-white
      placeholder:text-gray-400 dark:placeholder:text-gray-400
      focus:outline-none focus:ring-1 focus:ring-primary/80
      transition-colors duration-200
      disabled:cursor-not-allowed disabled:opacity-50
      md:text-sm
      ${className}
    `}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
