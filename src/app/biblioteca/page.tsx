'use client';

import BookList from "@/components/book/book-list";
import BookSearch from "@/components/book/book-search";
import LoadingSpinner from "@/components/loading/loading-spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 🔑 1. IMPORTAÇÃO CHAVE
import { useCallback, useEffect, useState } from "react";

// Tipo de livro (Mantenha o tipo Book completo para que o Card funcione)
type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
    // Adicione outros campos necessários aqui, se o BookList/BookCard exigir:
    rating: number;
    year: string;
    coverUrl?: string;
    isRead: boolean;
};

const availableGenres = [
    // ... seus gêneros
    "Todos os gêneros",
  "Ficção",
  "Fantasia",
  "Romance",
  "Thriller",
  "Ficção Científica",
  "História",
  "Biografia",
  "Autoajuda",
  "Tecnologia",
  "Clássico",
  "Distopia",
  "Não-Ficção",
  "Poesia",
  "Aventura",
  "Mistério",
  "Infantil",
  "Jovem Adulto",
  "Horror",
];

export default function BibliotecaPage() {
    const router = useRouter(); // 🔑 2. INICIALIZAÇÃO DO ROUTER
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [genreFilter, setGenreFilter] = useState("Todos os gêneros");

    const hasActiveFilters = searchQuery.length > 0 || genreFilter !== "Todos os gêneros";

    // ... (fetchBooks, useEffect e handleFilterChange permanecem iguais)

    const fetchBooks = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (genreFilter && genreFilter !== "Todos os gêneros") params.set("genre", genreFilter);

    try {
      const res = await fetch(`/api/books?${params.toString()}`);
      if (!res.ok) throw new Error("Falha ao buscar livros");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Erro ao carregar biblioteca:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
    }, [searchQuery, genreFilter]);

    useEffect(() => {
       fetchBooks();
    }, [fetchBooks]);

    const handleFilterChange = (q: string, g: string) => {
       setSearchQuery(q);
       setGenreFilter(g);
    };

    const handleClearFilters = () => {
       setSearchQuery("");
       setGenreFilter("Todos os gêneros");
    };

    // 🔑 3. HANDLER DE EDIÇÃO (ROTEAMENTO)
    const handleEdit = (bookId: string) => {
        // Redireciona para a página de edição (ex: /livro/123/editar)
        router.push(`/livro/${bookId}/editar`);
    };

    // 🔑 4. HANDLER DE VISUALIZAÇÃO (Para o botão "Ver Detalhes")
    const handleView = (bookId: string) => {
        // Redireciona para a página de detalhes (ex: /livro/123)
        router.push(`/livro/${bookId}`);
    };

    // 💡 IMPORTANTE: Você precisará criar handlers para onDelete e onStatusChange
    // se quiser que esses botões também funcionem.

    return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background text-foreground">
        {/* ... (cabeçalho e Link para Dashboard) ... */}

        <Link
           href="/dashboard"
           className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
           <ArrowLeft className="w-4 h-4 mr-2" />
           Voltar ao Dashboard
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 pb-4">
            {/* ... (Título e botão Adicionar Livro) ... */}
            <div className="flex items-start space-x-3">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-bold flex items-center">
                        <BookOpen className="w-7 h-7 mr-3 text-primary" /> Biblioteca Pessoal
                    </h1>
                    <p className="text-muted-foreground">Gerencie sua coleção de livros.</p>
                </div>
            </div>
            <Link href="/livro/novo">
                <Button className="flex items-center">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Adicionar Livro
                </Button>
            </Link>
        </div>

        <BookSearch
           genres={availableGenres}
           initialSearch={searchQuery}
           initialGenre={genreFilter}
           onSearch={handleFilterChange}
        />

        {/* ... (Informações e botão Limpar Filtros) ... */}
        <div className="flex justify-between items-center">
           <p className="text-sm text-muted-foreground">
               {loading ? "Buscando..." : `${books.length} livro(s) encontrado(s).`}
           </p>

           {hasActiveFilters && !loading && (
               <Button variant="link" onClick={handleClearFilters} className="text-primary hover:underline h-auto p-0 text-sm">
                 Limpar Filtros
               </Button>
           )}
        </div>

        {loading ? (
           <LoadingSpinner message="Carregando biblioteca..." />
        ) : books.length > 0 ? (
           // 🔑 4. PASSA O HANDLER PARA O BOOKLIST
           <BookList
               books={books}
               onEdit={handleEdit}
               onView={handleView}
            />
        ) : (
           // ... (mensagem de livro não encontrado) ...
             <div className="text-center py-10 bg-muted/50 rounded-lg mt-6">
                 <p className="text-lg font-medium text-muted-foreground">
                     Nenhum livro corresponde aos critérios de busca ou filtro.
                 </p>
                 <p className="text-sm text-muted-foreground mt-1">
                     Tente pesquisar outro termo ou limpar os filtros.
                 </p>
           </div>
        )}
    </div>
  );
}
