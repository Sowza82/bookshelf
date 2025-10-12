'use client'

import { useEffect, useState } from 'react'

interface DatabaseWaveProps {
  progress: number // 0 a 100
}

export default function DatabaseWave({ progress }: DatabaseWaveProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(progress), 100)
    return () => clearTimeout(timeout)
  }, [progress])

  // Cor dinâmica
  const color =
    progress >= 80
      ? 'bg-green-500'
      : progress >= 50
      ? 'bg-yellow-400'
      : 'bg-red-500'

  return (
    <div className="relative w-full h-6 bg-gray-200 rounded overflow-hidden shadow-inner">
      <div
        className={`${color} h-full rounded transition-all duration-700`}
        style={{ width: `${width}%` }}
      ></div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-white">
        {progress}%
      </span>
    </div>
  )
}
