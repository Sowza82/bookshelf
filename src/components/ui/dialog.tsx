'use client'

import { ReactNode } from 'react'

interface DialogProps {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function Dialog({ title, children, isOpen, onClose }: DialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5F0EB] rounded-lg p-6 w-11/12 max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#6B4226]">{title}</h2>
          <button onClick={onClose} className="text-[#C77D44] font-bold">&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
