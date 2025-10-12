// src/components/library/genre-filter.tsx
type GenreFilterProps = {
  initialGenre: string
  onChange: (genre: string) => void
  genres: string[]
}

const GenreFilter = ({ initialGenre, onChange, genres }: GenreFilterProps) => (
  <select
    value={initialGenre}
    onChange={e => onChange(e.target.value)}
    className="w-full p-2 border rounded"
  >
    {genres.map(genre => (
      <option key={genre} value={genre}>
        {genre}
      </option>
    ))}
  </select>
)

export default GenreFilter
