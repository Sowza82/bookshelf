// src/components/book/book-form.tsx
'use client'

import { useBooks } from '@/hooks/useBooks' // CORRIGIDO
import { Book } from '@/types/book'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

// Componentes da UI
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner' // Se você estiver usando o Sonner para notificações

// Tipagem dos dados do formulário
interface FormInputs {
  title: string
  author: string
  coverImageUrl: string
  publicationYear: number
  genre: string
  read: boolean
  rating: number
}

interface BookFormProps {
  bookToEdit?: Book // Opcional, usado apenas na edição
}

export default function BookForm({ bookToEdit }: BookFormProps) {
  const { addBook, updateBook } = useBooks() // CORRIGIDO
  const router = useRouter()
  const isEditing = !!bookToEdit

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: bookToEdit?.title || '',
      author: bookToEdit?.author || '',
      coverImageUrl: bookToEdit?.coverImageUrl || '',
      publicationYear: bookToEdit?.publicationYear || new Date().getFullYear(),
      genre: bookToEdit?.genre || 'Ficção',
      read: bookToEdit?.read || false,
      rating: bookToEdit?.rating || 0,
    },
  })

  const isRead = watch('read')
  const currentRating = watch('rating')

  const onSubmit: SubmitHandler<FormInputs> = data => {
    const bookData: Book = {
      ...data,
      id: bookToEdit?.id || uuidv4(),
      publicationYear: Number(data.publicationYear),
      rating: Number(data.rating),
    }

    if (isEditing) {
      updateBook(bookData)
      toast.success(`Livro "${bookData.title}" atualizado com sucesso!`)
    } else {
      addBook(bookData)
      toast.success(`Livro "${bookData.title}" adicionado à biblioteca!`)
    }

    router.push('/biblioteca')
  }

  const genres = [
    'Ficção',
    'Fantasia',
    'Distopia',
    'Romance',
    'Clássico',
    'Não-Ficção',
    'Outro',
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6">
        {isEditing ? 'Detalhes para Edição' : 'Novo Registro'}
      </h2>

      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          {...register('title', { required: 'O título é obrigatório.' })}
          placeholder="Ex: 1984"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Autor */}
      <div className="space-y-2">
        <Label htmlFor="author">Autor(a)</Label>
        <Input
          id="author"
          {...register('author', { required: 'O autor é obrigatório.' })}
          placeholder="Ex: George Orwell"
        />
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author.message}</p>
        )}
      </div>

      {/* URL da Capa */}
      <div className="space-y-2">
        <Label htmlFor="coverImageUrl">URL da Capa</Label>
        <Input
          id="coverImageUrl"
          {...register('coverImageUrl')}
          placeholder="https://exemplo.com/capa.jpg"
        />
      </div>

      {/* Gênero e Ano */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Gênero</Label>
          <Select
            onValueChange={value =>
              setValue('genre', value, { shouldValidate: true })
            }
            defaultValue={bookToEdit?.genre || 'Ficção'}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o Gênero" />
            </SelectTrigger>
            <SelectContent>
              {genres.map(g => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="publicationYear">Ano de Publicação</Label>
          <Input
            id="publicationYear"
            type="number"
            {...register('publicationYear', {
              required: 'O ano é obrigatório.',
              min: { value: 1800, message: 'Ano inválido.' },
              max: {
                value: new Date().getFullYear(),
                message: 'O ano não pode ser futuro.',
              },
            })}
          />
        </div>
      </div>

      {/* Status e Avaliação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
        <div className="flex items-center space-x-4">
          <Label htmlFor="read">Status: {isRead ? 'Lido' : 'Para Ler'}</Label>
          <Switch
            id="read"
            checked={isRead}
            onCheckedChange={checked =>
              setValue('read', checked, { shouldValidate: true })
            }
          />
        </div>

        {isRead && (
          <div className="space-y-2">
            <Label htmlFor="rating">
              Avaliação (1 a 5 estrelas): {currentRating}
            </Label>
            <Input
              id="rating"
              type="range"
              min="1"
              max="5"
              step="1"
              {...register('rating', {
                valueAsNumber: true,
                required: 'A avaliação é obrigatória se o livro foi lido.',
              })}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/biblioteca')}
        >
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? 'Salvar Alterações' : 'Adicionar Livro'}
        </Button>
      </div>
    </form>
  )
}
