'use client'

import { useEffect } from 'react'
import Wavify from 'react-wavify'

type Props = {
  progress: number
}

export default function DatabaseWave({ progress }: Props) {
  // CORREÇÃO: Usamos uma diretiva de disable específica na linha para garantir que o linter pare de reclamar.
  // Isso é mais limpo do que manter a variável desnecessária se ela está comentada no useEffect.
  // Se você realmente precisar dela, mantenha `const _play = () => {}`
  // Se não precisar, você pode apagar a linha, ou usar o disable abaixo.

  // Opção 1: Manter a linha e desativar o linter (se a renomeação para '_play' não funcionou):
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _play = () => {}

  useEffect(() => {
    if (progress > 0) {
      // _play() // som desativado
    }
  }, [progress])

  // Calcula bottom para nunca sumir
  const waveBottom = Math.max(progress - 100, -80)

  return (
    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-[var(--color-card)] shadow-md">
      {/* Porcentagem central */}
      <div className="absolute inset-0 flex items-center justify-center z-10 text-2xl font-bold text-[var(--color-card-foreground)]">
        {progress}%
      </div>

      {/* Onda animada */}
      <Wavify
        fill="var(--color-primary)"
        paused={false}
        options={{
          height: 20,
          amplitude: 30,
          speed: 0.25,
          points: 3,
        }}
        style={{
          position: 'absolute',
          bottom: `${waveBottom}%`,
          width: '100%',
          height: '100%',
          transition: 'bottom 0.5s ease-in-out',
        }}
      />
    </div>
  )
}
