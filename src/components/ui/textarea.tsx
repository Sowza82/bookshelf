'use client'

import { TextareaHTMLAttributes } from 'react'

export default function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="border border-[#D9CBBE] rounded-lg p-2 focus:outline-none focus:border-[#C77D44] bg-[#FFF8F0] text-[#6B4226]"
      {...props}
    />
  )
}
