'use client'

interface ProgressProps {
  value: number
  max?: number
}

export default function Progress({ value, max = 100 }: ProgressProps) {
  return (
    <div className="w-full bg-[#D9CBBE] rounded-full h-4 overflow-hidden">
      <div
        className="h-4 bg-[#C77D44] transition-all duration-300"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )
}
