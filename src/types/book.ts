export interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
  cover?: string;
  status: "lendo" | "lido" | "quero-ler";
}
