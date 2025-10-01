export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl?: string;
  publicationYear?: number;
  genre?: string;
  read: boolean;
  rating: number;
  totalPages?: number;
  currentPage?: number;
  notes?: string;
}
