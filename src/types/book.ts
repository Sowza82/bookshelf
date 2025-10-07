export interface Book {
  id: string
  title: string
  author: string

  readingStatus: 'UNREAD' | 'READING' | 'FINISHED'
  currentPage: number
  totalPages: number
  rating: number

  genre?: string
  coverUrl?: string
  synopsis?: string
  isbn?: string
  notes?: string

  createdAt?: Date
  updatedAt?: Date
}
