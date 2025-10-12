'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Book } from '@/types/book'
import { BookCover } from './book-cover'

// --- Zod Schema ---
const BOOK_FORM_SCHEMA = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  author: z.string().min(1, 'Autor é obrigatório'),
  coverUrl: z.string().url().optional(),
  readingStatus: z.enum(['TO_READ', 'READING', 'FINISHED']),
  genre: z.string().min(1, 'Gênero é obrigatório'),
  rating: z.number().min(0).max(5).optional(),
  publicationYear: z.number().optional(),
  totalPages: z.number().optional(),
  currentPage: z.number().optional(),
  description: z.string().optional(),
})

type BookFormValues = z.infer<typeof BOOK_FORM_SCHEMA>

// --- Componente BookForm ---
interface BookFormProps {
  defaultValues?: Partial<BookFormValues>
  onSubmit: (values: BookFormValues) => void
}

export function BookForm({ defaultValues, onSubmit }: BookFormProps) {
  const [coverPreview, setCoverPreview] = useState(
    defaultValues?.coverUrl || ''
  )

  const { register, handleSubmit, control, watch } = useForm<BookFormValues>({
    resolver: zodResolver(BOOK_FORM_SCHEMA),
    defaultValues: defaultValues || {},
  })

  const currentPage = watch('currentPage') || 0
  const totalPages = watch('totalPages') || 0
  const progressValue =
    totalPages > 0 ? Math.min((currentPage / totalPages) * 100, 100) : 0

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Detalhes do Livro</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-6">
          {/* Capa */}
          <div className="md:w-1/2 flex justify-center">
            <BookCover
              book={
                {
                  coverUrl: coverPreview,
                  title: defaultValues?.title || 'Livro',
                } as Book
              }
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) setCoverPreview(URL.createObjectURL(file))
              }}
            />
          </div>

          {/* Inputs */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <Input {...register('title')} placeholder="Título" />
            <Input {...register('author')} placeholder="Autor" />
            <Input
              {...register('coverUrl')}
              placeholder="URL da Capa (opcional)"
            />

            <div className="flex gap-4">
              <Controller
                control={control}
                name="readingStatus"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TO_READ">Para Ler</SelectItem>
                      <SelectItem value="READING">Lendo</SelectItem>
                      <SelectItem value="FINISHED">Lido</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="genre"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ficção">Ficção</SelectItem>
                      <SelectItem value="Não-Ficção">Não-Ficção</SelectItem>
                      <SelectItem value="Romance">Romance</SelectItem>
                      <SelectItem value="Fantasia">Fantasia</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex gap-4">
              <Input
                {...register('publicationYear', { valueAsNumber: true })}
                placeholder="Ano"
              />
              <Input
                {...register('rating', { valueAsNumber: true })}
                placeholder="Avaliação (0-5)"
              />
            </div>

            <div className="flex gap-4">
              <Input
                {...register('totalPages', { valueAsNumber: true })}
                placeholder="Total de Páginas"
              />
              <Input
                {...register('currentPage', { valueAsNumber: true })}
                placeholder="Páginas Lidas"
              />
            </div>

            <Textarea
              {...register('description')}
              placeholder="Sinopse/Descrição"
              rows={4}
            />

            <Progress value={progressValue} className="mt-2" />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="submit">Salvar</Button>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
