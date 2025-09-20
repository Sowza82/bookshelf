<<<<<<< HEAD
// src/data/initialBooks.ts
=======
// src/data/initial-books.ts

>>>>>>> 2309a29 (feat: implementa lógica de storage, hook de livros e BookCard)
import { Book } from '@/types/book';

export const initialBooks: Book[] = [
  {
<<<<<<< HEAD
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    cover: "/covers/lotr.png",
    publicationYear: 1954,
    genre: "Fantasia",
    read: true,
    rating: 5,
  },
  {
    id: "2",
    title: "A Metamorfose",
    author: "Franz Kafka",
    cover: "/covers/metamorfose.png",
    publicationYear: 1915,
    genre: "Ficção Absurda",
    read: false,
    rating: 4,
  },
  {
    id: "3",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    cover: "/covers/dom-casmurro.png",
    publicationYear: 1899,
    genre: "Romance Clássico",
    read: true,
    rating: 4,
  },
  {
    id: "4",
    title: "A Culpa é das Estrelas",
    author: "John Green",
    cover: "/covers/culpa-das-estrelas.png",
    publicationYear: 2012,
    genre: "Young Adult",
    read: false,
    rating: 3,
  },
  {
    id: "5",
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    cover: "/covers/sapiens.png",
    publicationYear: 2011,
    genre: "Não-Ficção",
    read: true,
    rating: 5,
  },
  {
    id: "6",
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "/covers/clean-code.png",
    publicationYear: 2008,
    genre: "Tecnologia",
    read: true,
    rating: 5,
  },
  {
    id: "7",
    title: "O Gene: Uma História Íntima",
    author: "Siddhartha Mukherjee",
    cover: "/covers/o-gene.png",
    publicationYear: 2016,
    genre: "Ciência",
    read: true,
    rating: 5,
  },
  {
    id: "8",
    title: "Inteligência Artificial: Guia Prático",
    author: "Pedro Domingos",
    cover: "/covers/ia-guia-pratico.png",
    publicationYear: 2020,
    genre: "Tecnologia",
    read: false,
    rating: 4,
  },
];
=======
    id: '1',
    title: 'O Poder do Hábito',
    author: 'Charles Duhigg',
    cover: 'https://m.media-amazon.com/images/I/81xU9d8b8PL._AC_UF1000,1000_QL80_.jpg',
    pages: 408,
    readPages: 150,
    status: 'reading',
    rating: 4,
    genre: 'Autoajuda',
    year: 2012,
    synopsis: 'Uma visão fascinante sobre a ciência por trás de como os hábitos se formam e como podemos mudá-los.'
  },
  {
    id: '2',
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/8126G6PzXgL._AC_UF1000,1000_QL80_.jpg',
    pages: 152,
    readPages: 152,
    status: 'read',
    rating: 5,
    genre: 'Ficção Política',
    year: 1945,
    synopsis: 'Uma alegoria sobre a corrupção do ideal revolucionário, narrada através de animais em uma fazenda.'
  },
  {
    id: '3',
    title: 'Duna',
    author: 'Frank Herbert',
    cover: 'https://m.media-amazon.com/images/I/81Yj0M7NfLL._AC_UF1000,1000_QL80_.jpg',
    pages: 688,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Ficção Científica',
    year: 1965,
    synopsis: 'Uma saga épica de ficção científica que explora política, religião e o meio ambiente em um planeta desértico.'
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://m.media-amazon.com/images/I/71Y8c74E-hL._AC_UF1000,1000_QL80_.jpg',
    pages: 328,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Ficção',
    year: 1949,
    synopsis: 'Um clássico distópico sobre vigilância totalitária, censura e manipulação da verdade.'
  },
  {
    id: '5',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://m.media-amazon.com/images/I/813t3e1eW-L._AC_UF1000,1000_QL80_.jpg',
    pages: 310,
    readPages: 0,
    status: 'unread',
    rating: 0,
    genre: 'Fantasia',
    year: 1937,
    synopsis: 'A aventura de Bilbo Bolseiro para recuperar um tesouro de um dragão, um prelúdio para O Senhor dos Anéis.'
  },
];
>>>>>>> 2309a29 (feat: implementa lógica de storage, hook de livros e BookCard)
