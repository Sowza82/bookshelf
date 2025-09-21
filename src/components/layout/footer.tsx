'use client'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] text-[var(--color-text)] py-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 gap-3">
        {/* Copyright */}
        <p className="text-sm sm:text-base opacity-80 text-center">
          &copy; {new Date().getFullYear()}{' '}
          <span className="font-semibold">MisturaDev</span>. Todos os direitos reservados.
        </p>


      </div>
    </footer>
  )
}
