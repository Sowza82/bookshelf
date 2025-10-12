import type { Book } from '../types/book.ts'

export const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    coverUrl: '/covers/dom-casmurro.jpg',
    genre: 'Clássico',
    readingStatus: 'FINISHED',
    rating: 5,
    totalPages: 256,
    currentPage: 256,
    notes: 'Um clássico da literatura brasileira.'
  },
  {
    id: '2',
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    coverUrl: '/covers/senhor-dos-aneis.jpg',
    genre: 'Fantasia',
    readingStatus: 'UNREAD',
    rating: 0,
    totalPages: 1178,
    currentPage: 0,
    notes: 'Começar a leitura nas férias.'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    coverUrl: '/covers/1984.jpg',
    genre: 'Distopia',
    readingStatus: 'FINISHED',
    rating: 4,
    totalPages: 328,
    currentPage: 328,
    notes: 'Leitura impactante sobre vigilância e controle.'
  },
  {
    id: '4',
    title: 'A Metamorfose',
    author: 'Franz Kafka',
    coverUrl: '/covers/metamorfose.jpg',
    genre: 'Ficção',
    readingStatus: 'UNREAD',
    rating: 4,
    totalPages: 100,
    currentPage: 0,
    notes: 'Reflexão sobre alienação e identidade.'
  },
  {
    id: '5',
    title: 'A Culpa é das Estrelas',
    author: 'John Green',
    coverUrl: '/covers/culpa-das-estrelas.jpg',
    genre: 'Romance',
    readingStatus: 'UNREAD',
    rating: 3,
    totalPages: 313,
    currentPage: 0,
    notes: 'História emocionante e tocante.'
  },
  {
    id: '6',
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    coverUrl: '/covers/sapiens.jpg',
    genre: 'Não-Ficção',
    readingStatus: 'FINISHED',
    rating: 5,
    totalPages: 498,
    currentPage: 498,
    notes: 'Aprendizado profundo sobre a história da humanidade.'
  },
  {
    id: '7',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverUrl: '/covers/clean-code.jpg',
    genre: 'Tecnologia',
    readingStatus: 'FINISHED',
    rating: 5,
    totalPages: 464,
    currentPage: 464,
    notes: 'Referência essencial para desenvolvedores.'
  },
  {
    id: '8',
    title: 'Inteligência Artificial: Guia Prático',
    author: 'Pedro Domingos',
    coverUrl: '/covers/ia-guia-pratico.jpg',
    genre: 'Tecnologia',
    readingStatus: 'UNREAD',
    rating: 4,
    totalPages: 350,
    currentPage: 0,
    notes: 'Ótimo guia para iniciantes em IA.'
  }
]
