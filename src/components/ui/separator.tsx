// src/components/ui/separator.tsx
export const Separator = ({ className }: { className?: string }) => (
  <hr className={`my-4 border-gray-300 ${className || ''}`} />
)
