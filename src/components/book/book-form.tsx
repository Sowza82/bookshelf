'use client'

import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'
// ⚠️ ATENÇÃO: Verifique se este caminho está correto no seu projeto
import { BookType, createBook, updateBook } from '@/app/actions/book'

// --- MOCK: ID de utilizador estático para simular autenticação ---
const MOCK_USER_ID = 'user_id_simulado_123'

// --- SIMULAÇÕES DE COMPONENTES (Mantenha ou substitua pelos seus componentes reais) ---
// Estes são os componentes de UI (Button, Card, Input, etc.) necessários para o formulário funcionar.
// Você pode substituir por seus componentes ShadCN/UI ou de sua preferência.

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 mr-2"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
)
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 text-gray-400 dark:text-gray-600"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20h-5.5a2.5 2.5 0 0 1-2.4-3.15L12 17l-1.1-1.3A2.5 2.5 0 0 0 8.5 13H4V2.5A.5.5 0 0 1 4 2z" />
  </svg>
)
const Button = ({ children, onClick, variant, disabled, type, className }: any) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition duration-200 shadow-md flex items-center justify-center ${
      disabled
        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-200'
        : variant === 'outline'
        ? 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white'
        : 'bg-blue-600 hover:bg-blue-700 text-white'
    } ${className}`}
  >
    {children}
  </button>
)
const Card = ({ children, className }: any) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-0 ${className}`}>
    {children}
  </div>
)
const Input = ({
  id,
  name,
  value,
  onChange,
  type,
  min,
  max,
  placeholder,
  isInvalid,
}: any) => (
  <input
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    min={min}
    max={max}
    placeholder={placeholder}
    className={`w-full p-3 border rounded-lg mt-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
      isInvalid
        ? 'border-red-500 dark:border-red-400 focus:border-red-500'
        : 'border-gray-300 dark:border-gray-600'
    }`}
  />
)
const Label = ({ children, htmlFor }: any) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold mb-1 mt-3 text-gray-700 dark:text-gray-300"
  >
    {children}
  </label>
)
const Progress = ({ value, className }: any) => (
  <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
    <div
      style={{ width: `${value}%` }}
      className="h-full bg-blue-600 transition-all duration-500"
    ></div>
  </div>
)
const Textarea = ({ id, name, value, onChange, rows }: any) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    rows={rows}
    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
  ></textarea>
)
const Toaster = () => null

interface BookRatingProps {
  rating: number
  onRate: (rating: number) => void
}
const StarIcon = ({ fill }: { fill: boolean }) => (
  <svg
    className={`w-6 h-6 transition-transform duration-100 ${
      fill
        ? 'text-yellow-400 transform scale-100'
        : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
    } cursor-pointer`}
    fill={fill ? 'currentColor' : 'none'}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l3.09 6.31 6.91.87-5 4.88 1.18 6.9L12 18.06l-6.18 3.25L7 13.06l-5-4.88 6.91-.87L12 2z" />
  </svg>
)
const BookRating: React.FC<BookRatingProps> = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const displayRating = hoverRating || rating

  return (
    <div className="flex items-center space-x-1 mt-1">
      {[1, 2, 3, 4, 5].map(starValue => (
        <div
          key={starValue}
          onClick={() => onRate(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          role="button"
          aria-label={`Avaliar ${starValue} estrelas`}
        >
          <StarIcon fill={starValue <= displayRating} />
        </div>
      ))}
      {rating > 0 && (
        <Button
          type="button"
          variant="outline"
          className="ml-4 h-8 px-2 text-xs"
          onClick={() => onRate(0)}
        >
          Limpar
        </Button>
      )}
    </div>
  )
}

// --- CONSTANTES ---
const AVAILABLE_GENRES = [
  'Literatura Brasileira',
  'Ficção Científica',
  'Romance',
  'Programação',
  'História',
  'Fantasia',
  'Suspense',
]
const READING_STATUSES = [
  'quero-ler',
  'lendo',
  'lido',
  'pausado',
  'abandonado',
] as const
type ReadingStatus = (typeof READING_STATUSES)[number]

// --- TIPAGENS ---
interface BookFormState {
  id?: string
  title: string
  author: string
  coverUrl?: string
  year?: number
  totalPages?: number
  currentPage?: number
  rating: number
  readingStatus: ReadingStatus
  genre: string
  synopsis: string
  isbn?: string
  notes?: string
}
interface Book extends BookType {}
interface BookFormProps {
  initialData?: BookType & { id: string } // Permite o id para edição
  onSave?: (book: Book) => void
  onCancel?: () => void
}

// --- COMPONENTE PRINCIPAL BookForm REUTILIZÁVEL ---

export default function BookForm({
  initialData,
  onSave,
  onCancel,
}: BookFormProps) {
  const router = useRouter()

  // 🔑 LÓGICA DE REUTILIZAÇÃO 1: Detecta se está no modo de edição
  const isEdit = !!initialData?.id

  const mapPrismaToForm = (data: BookType): BookFormState =>
    ({
      id: data.id,
      title: data.title,
      author: data.author,
      coverUrl: data.coverUrl || undefined,
      totalPages: data.totalPages || undefined,
      currentPage: data.currentPage || undefined,
      rating: data.rating || 0,
      readingStatus: data.readingStatus as ReadingStatus,
      genre: data.genre || '',
      synopsis: data.synopsis || '',
      isbn: data.isbn || '',
      notes: data.notes || '',
    } as BookFormState)

  // 🔑 LÓGICA DE REUTILIZAÇÃO 2: Inicializa o estado com dados pré-preenchidos ou vazio
  const [bookData, setBookData] = useState<BookFormState>(
    initialData
      ? mapPrismaToForm(initialData)
      : ({
          title: '',
          author: '',
          coverUrl: '',
          totalPages: undefined,
          currentPage: undefined,
          rating: 0,
          readingStatus: 'quero-ler',
          genre: '',
          synopsis: '',
          isbn: '',
          notes: '',
        } as BookFormState),
  )

  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState<
    Partial<BookFormState>
  >({})

  const validate = () => {
    const errors: Partial<BookFormState> = {}
    if (!bookData.title.trim()) errors.title = 'O título é obrigatório.'
    if (!bookData.author.trim()) errors.author = 'O autor é obrigatório.'
    setValidationError(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    const isNumeric = ['totalPages', 'currentPage', 'year'].includes(name)

    setBookData(
      prev =>
        ({
          ...prev,
          [name]: isNumeric
            ? value === ''
              ? undefined
              : Number(value)
            : value,
        } as BookFormState),
    )

    if (validationError[name as keyof BookFormState]) {
      setValidationError(prev => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof BookFormState]
        return newErrors
      })
    }
  }

  const handleSelectChange =
    (name: 'readingStatus' | 'genre') => (value: string) => {
      setBookData(prev => ({ ...prev, [name]: value } as BookFormState))
    }

  const handleRatingChange = (rating: number) => {
    setBookData(prev => ({ ...prev, rating } as BookFormState))
  }

  const handleCancelClick = () => {
    toast.info('Operação cancelada.', { duration: 2000 })
    if (onCancel) onCancel() // Usa o handler de cancelamento da página mãe (EditBookPage)
    else router.back()
  }

  const mapFormToPrisma = (data: BookFormState) => ({
    title: data.title,
    author: data.author,
    coverUrl: data.coverUrl || null,
    totalPages: data.totalPages ?? null,
    currentPage: data.currentPage ?? null,
    rating: data.rating || 0,
    readingStatus: data.readingStatus,
    genre: data.genre || null,
    synopsis: data.synopsis || null,
    isbn: data.isbn || null,
    notes: data.notes || null,
    userId: MOCK_USER_ID,
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSaving) return
    if (!validate()) {
      toast.error('Preencha os campos obrigatórios: Título e Autor.', {
        duration: 3000,
      })
      return
    }

    // Validação de TotalPages para progresso
    if (!bookData.totalPages || bookData.totalPages <= 0) {
      setValidationError(prev => ({
        ...prev,
        totalPages: 'O total de páginas é obrigatório (valor > 0).',
      }))
      toast.error('O Total de Páginas é obrigatório (valor > 0).')
      return
    }

    setIsSaving(true)
    const dataToSend = mapFormToPrisma(bookData)

    try {
      let savedBook: BookType | null = null

      // 🔑 LÓGICA DE REUTILIZAÇÃO 3: Chama CREATE ou UPDATE
      if (isEdit && bookData.id) {
        toast.info('A guardar alterações...', { duration: 1500 })
        // CHAMADA PARA EDIÇÃO
        savedBook = await updateBook(bookData.id, dataToSend)
      } else {
        toast.info('A adicionar novo livro...', { duration: 1500 })
        // CHAMADA PARA CRIAÇÃO
        savedBook = await createBook(dataToSend as any)
      }

      if (savedBook) {
        toast.success(
          isEdit ? 'Livro atualizado com sucesso!' : 'Livro criado com sucesso!',
        )
        if (onSave) onSave(savedBook as Book) // Chama onSave da página mãe
        else {
          router.push(`/biblioteca`)
        }
      } else {
        toast.error('Ocorreu um erro ao salvar o livro. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro no processo de salvar o livro:', error)
      toast.error('Erro de servidor. Verifique o console.')
    } finally {
      setIsSaving(false)
    }
  }

  // Lógica para barra de progresso
  const fieldsForCompletion: (keyof BookFormState)[] = [
    'title',
    'author',
    'totalPages',
    'readingStatus',
  ]
  const completionProgress = useMemo(() => {
    let filledCount = 0
    fieldsForCompletion.forEach(key => {
      const value = bookData[key]

      if (key === 'totalPages') {
        if (typeof value === 'number' && value > 0) {
          filledCount++
        }
      } else if (key === 'readingStatus') {
        if (value && value !== 'quero-ler') {
          filledCount++;
        }
      }
      else if (typeof value === 'string') {
        if (value.trim() !== '') {
          filledCount++
        }
      } else if (typeof value === 'number') {
        if (value !== undefined && value !== null && value >= 0) {
          filledCount++
        }
      }
    })

    const totalFields = fieldsForCompletion.length;
    return totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0
  }, [bookData])

  const isFormComplete = completionProgress >= 100

  const coverSrc = useMemo(() => {
    try {
      if (
        bookData.coverUrl &&
        new URL(bookData.coverUrl) &&
        bookData.coverUrl.trim() !== ''
      ) {
        return bookData.coverUrl
      }
    } catch {
      // Ignorar erro de URL inválida
    }
    return ''
  }, [bookData.coverUrl])

  return (
    // LAYOUT CENTRALIZADO E COM LARGURA MÁXIMA
    <div className="max-w-5xl mx-auto py-8 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Botão Voltar (topo) */}
      <Button
        variant="outline"
        onClick={handleCancelClick}
        className="mb-6"
      >
        <ArrowLeftIcon />
        {/* Texto dinâmico */}
        {isEdit ? 'Voltar ao Livro' : 'Voltar à biblioteca'}
      </Button>

      <form onSubmit={handleSave} className="shadow-xl">
        <Card>
          <div className="p-8">
            {/* 🔑 TÍTULO DINÂMICO */}
            <h1 className="text-3xl font-bold mb-6">
              {isEdit ? 'Editar Livro' : 'Adicionar Novo Livro'}
            </h1>

            {/* ESTRUTURA GRID 12 COLUNAS */}
            <div className="grid grid-cols-12 gap-8">

              {/* COLUNA 1: Pré-visualização da Capa (3/12 colunas) */}
              <div className="col-span-12 md:col-span-3 flex flex-col items-center space-y-4">
                <Label htmlFor="coverUrl" className="text-center">
                  Pré-visualização da Capa
                </Label>
                <div
                  className={`w-full max-w-[150px] aspect-[2/3] flex items-center justify-center rounded-lg overflow-hidden transition duration-300 shadow-md
                    ${
                      coverSrc
                        ? 'p-0 border-0'
                        : 'border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700'
                    }`}
                >
                  {coverSrc ? (
                    <img
                      src={coverSrc}
                      alt={bookData.title || 'Capa do livro'}
                      className="w-full h-full object-cover"
                      onError={(e: any) =>
                        (e.currentTarget.src =
                          'https://placehold.co/100x150/f0f0f0/333?text=Sem+Capa')
                      }
                    />
                  ) : (
                    <BookIcon />
                  )}
                </div>
                <div className="w-full max-w-[200px] text-xs text-gray-500 dark:text-gray-400 text-center">
                  A capa é apenas para visualização.
                </div>
              </div>

              {/* COLUNA 2: Campos do Formulário (9/12 colunas) */}
              <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Título */}
                <div className="sm:col-span-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    isInvalid={!!validationError.title}
                  />
                  {validationError.title && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {validationError.title}
                    </p>
                  )}
                </div>

                {/* Autor e ISBN */}
                <div>
                  <Label htmlFor="author">Autor *</Label>
                  <Input
                    id="author"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    isInvalid={!!validationError.author}
                  />
                  {validationError.author && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {validationError.author}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="isbn">ISBN</Label>
                  <Input
                    id="isbn"
                    name="isbn"
                    value={bookData.isbn || ''}
                    onChange={handleChange}
                    placeholder="978-..."
                  />
                </div>

                {/* Total de Páginas e Página Atual */}
                <div>
                  <Label htmlFor="totalPages">Total de Páginas *</Label>
                  <Input
                    id="totalPages"
                    name="totalPages"
                    type="number"
                    value={bookData.totalPages || ''}
                    onChange={handleChange}
                    min={1}
                    isInvalid={!!validationError.totalPages}
                  />
                  {validationError.totalPages && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {validationError.totalPages}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="currentPage">Página Atual</Label>
                  <Input
                    id="currentPage"
                    name="currentPage"
                    type="number"
                    value={bookData.currentPage || ''}
                    onChange={handleChange}
                    min={0}
                    max={bookData.totalPages}
                  />
                </div>

                {/* Status e Gênero */}
                <div>
                  <Label htmlFor="readingStatus">Status *</Label>
                  <select
                    value={bookData.readingStatus}
                    onChange={e =>
                      handleSelectChange('readingStatus')(e.target.value)
                    }
                    name="readingStatus"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {READING_STATUSES.map(s => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="genre">Gênero</Label>
                  <select
                    value={bookData.genre || ''}
                    onChange={e => handleSelectChange('genre')(e.target.value)}
                    name="genre"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="" disabled>
                      Selecione o Gênero
                    </option>
                    {AVAILABLE_GENRES.map(g => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Avaliação */}
                <div className="sm:col-span-2">
                  <Label htmlFor="rating">Avaliação</Label>
                  <BookRating
                    rating={bookData.rating}
                    onRate={handleRatingChange}
                  />
                </div>

                {/* URL da Capa */}
                <div className="sm:col-span-2">
                  <Label htmlFor="coverUrl">URL da Capa</Label>
                  <Input
                    id="coverUrl"
                    name="coverUrl"
                    placeholder="URL completa da imagem (ex: https://...)"
                    value={bookData.coverUrl || ''}
                    onChange={handleChange}
                  />
                </div>

                {/* Sinopse */}
                <div className="sm:col-span-2">
                  <Label htmlFor="synopsis">Sinopse</Label>
                  <Textarea
                    id="synopsis"
                    name="synopsis"
                    rows={4}
                    value={bookData.synopsis}
                    onChange={handleChange}
                  />
                </div>

                {/* Notas Pessoais */}
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">Notas Pessoais</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={bookData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé: Progresso e Botões */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>Progresso de Preenchimento (Campos Essenciais)</span>
              <span>{completionProgress}%</span>
            </div>
            <Progress value={completionProgress} className="h-2" />

            <div className="flex justify-end gap-3 pt-6">
              <Button
                variant="outline"
                onClick={handleCancelClick}
                disabled={isSaving}
                type="button"
              >
                Cancelar
              </Button>
              <Button disabled={isSaving || !isFormComplete} type="submit">
                {isSaving
                  ? 'A Guardar...'
                  : isEdit
                  ? 'Salvar Alterações' // 🔑 TEXTO DINÂMICO
                  : 'Adicionar Livro'}
              </Button>
            </div>
          </div>
        </Card>
        <Toaster />
      </form>
    </div>
  )
}
