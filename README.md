# 📚 BookShelf

Uma aplicação web moderna para gerenciamento de biblioteca pessoal, permitindo catalogar, organizar e acompanhar o progresso de leitura de seus livros.

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes reutilizáveis

## ✨ Funcionalidades

### 📊 Dashboard Principal

- Estatísticas gerais da biblioteca
- Total de livros cadastrados
- Livros em progresso e finalizados
- Total de páginas lidas
- Navegação rápida para outras seções

### 📖 Biblioteca

- Listagem de todos os livros em formato de cards
- Sistema de busca por título ou autor
- Filtros por gênero literário
- Cards com informações essenciais:
  - Capa do livro (com fallback)
  - Título e autor
  - Ano de publicação
  - Sistema de avaliação por estrelas (1-5)
  - Gênero como badge
  - Ações de visualizar, editar e excluir

### ➕ Gerenciamento de Livros

- **Adicionar novo livro**: Formulário completo com validação
- **Visualizar detalhes**: Página individual com todas as informações
- **Editar livro**: Formulário pré-preenchido para atualizações
- **Excluir livro**: Dialog de confirmação para segurança

### 🔧 Funcionalidades Avançadas

- Preview da capa em tempo real
- Barra de progresso do preenchimento
- Sistema de status de leitura
- Feedback visual para todas as ações
- Design totalmente responsivo

## 📋 Status de Leitura

- **QUERO_LER** - Livros na lista de desejos
- **LENDO** - Livros em progresso
- **LIDO** - Livros finalizados
- **PAUSADO** - Leitura temporariamente interrompida
- **ABANDONADO** - Leitura descontinuada

## 📚 Gêneros Disponíveis

Literatura Brasileira, Ficção Científica, Realismo Mágico, Ficção, Fantasia, Romance, Biografia, História, Autoajuda, Tecnologia, Programação, Negócios, Psicologia, Filosofia, Poesia

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+
- npm ou yarn ou pnpm

### Passos para instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/bookshelf.git
cd bookshelf
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure o shadcn/ui** (se necessário)

```bash
npx shadcn-ui@latest init
```

4. **Execute o projeto em desenvolvimento**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. **Abra no navegador**

```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── page.tsx           # Dashboard principal
│   ├── biblioteca/        # Listagem de livros
│   └── livro/            # CRUD de livros
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── book/             # Componentes de livros
│   ├── dashboard/        # Componentes do dashboard
│   └── layout/           # Componentes de layout
├── lib/                  # Utilitários e configurações
├── types/                # Definições TypeScript
├── hooks/                # Custom hooks
└── data/                 # Dados iniciais
```

## 🎨 Design System

O projeto utiliza um design system consistente baseado no **shadcn/ui** com:

- Tema claro e profissional
- Componentes acessíveis e semânticos
- Design responsivo mobile-first
- Feedback visual para todas as interações

## 📱 Responsividade

- **Mobile First**: Desenvolvido priorizando dispositivos móveis
- **Breakpoints**: Funciona perfeitamente em smartphones, tablets e desktop
- **Grid Adaptativo**: Layout flexível para diferentes tamanhos de tela
- **Navegação Otimizada**: Interface adaptada para touch e desktop

## ♿ Acessibilidade

- Componentes semânticos HTML5
- Suporte completo à navegação por teclado
- Labels apropriados para formulários
- Contraste adequado de cores
- Feedback sonoro quando necessário

## ⚡ Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Imagens**: Next.js Image para melhor performance
- **Estados de Loading**: Feedback visual durante operações assíncronas
- **Bundle Splitting**: Divisão automática do código

## 🧪 Dados de Demonstração

A aplicação vem com 5 livros pré-cadastrados incluindo:

- Diferentes gêneros literários
- Variadas avaliações por estrelas
- Anos de publicação diversos
- Sinopses completas
- Capas funcionais

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**📖 BookShelf** - Organize sua biblioteca pessoal de forma inteligente e moderna!
