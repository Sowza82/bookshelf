'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import { Label } from './label' // Assumindo que você tem o componente Label

// --- 1. Form Provider (React Hook Form) ---
const Form = FormProvider

// --- 2. Contextos e Hook para Ligação (Boilerplate de Acessibilidade) ---

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

type FormItemContextValue = { id: string }
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

/**
 * Hook utilitário que combina o nome do campo e o estado do RHF
 * com IDs únicos para acessibilidade.
 */
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext)
    throw new Error('useFormField deve ser usado dentro de <FormField>')

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState, // Inclui 'error', 'isDirty', 'isTouched', etc.
  }
}


// --- 3. Componentes de Estrutura de Campo ---

/**
 * FormField: O wrapper principal para um campo RHF (Controller).
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

/**
 * FormItem: O wrapper de layout (div) para o bloco de campo.
 */
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => {
  const id = React.useId() // Gera um ID único
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={`space-y-2 ${className}`} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

// --- 4. Componentes de Elementos de Campo ---

/**
 * FormLabel: O label do campo.
 */
const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<'label'>
>(({ className = '', ...props }, ref) => {
  const { error, formItemId } = useFormField()
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={`${error ? 'text-destructive' : ''} ${className}`} // Destaca label em caso de erro
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

/**
 * FormControl: Wrapper para o componente de input (usa Slot).
 * Aplica os atributos ARIA essenciais.
 */
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

/**
 * FormDescription: Texto de ajuda abaixo do campo.
 */
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', ...props }, ref) => {
  const { formDescriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={`text-[0.8rem] text-muted-foreground ${className}`}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

/**
 * FormMessage: Exibe a mensagem de erro do RHF.
 */
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
   
  // Pega a mensagem de erro ou usa os filhos customizados
  const body = error ? String(error?.message ?? '') : children
 
  if (!body) return null // Não renderiza se não houver erro/conteúdo
 
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={`text-[0.8rem] font-medium text-destructive ${className}`}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

// --- 5. Exportações ---

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
}
