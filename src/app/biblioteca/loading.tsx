export default function LoadingBiblioteca() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4 sm:px-6 lg:px-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 shadow animate-pulse bg-[var(--color-bg)] min-h-[250px]"
        >
          <div className="h-40 bg-[var(--color-muted)]/20 rounded mb-4 animate-pulse"></div>
          <div className="h-6 bg-[var(--color-muted)]/30 rounded mb-2 w-3/4 animate-pulse"></div>
          <div className="h-4 bg-[var(--color-muted)]/30 rounded w-1/2 animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}
