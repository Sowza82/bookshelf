'use client'

import { ReactNode, FormHTMLAttributes } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode
}

export default function Form({ children, ...props }: FormProps) {
  return (
    <form className="flex flex-col gap-4 p-4 bg-[#FFF8F0] rounded-lg shadow" {...props}>
      {children}
    </form>
  )
}
