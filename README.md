# 🐾 Petz — Frontend

Frontend da **Petz**, uma rede social para pets, construída com foco em **componentização**, **experiência do usuário** e **boas práticas modernas de frontend**.

---

## ✨ Visão Geral

O Petz Frontend é responsável por toda a interface do usuário da aplicação, permitindo:

- Cadastro e autenticação de usuários
- Gerenciamento de perfis de pets
- Visualização de feed
- Criação e interação com posts (curtidas, comentários)
- Seguir e deixar de seguir pets

O projeto foi pensado para ser **escalável**, **performático** e **fácil de manter**.

---

## 🛠️ Tecnologias Utilizadas

- **React** — Biblioteca principal para construção da UI
- **TypeScript** — Tipagem estática e maior segurança
- **Vite** — Bundler rápido para desenvolvimento
- **Tailwind CSS** — Estilização utilitária
- **shadcn/ui** — Componentes acessíveis e reutilizáveis
- **React Router DOM** — Gerenciamento de rotas
- **Axios** — Consumo da API
- **React Query** — Requisições HTTP
- **Zod** — Validação de formulários e dados
- **React Hook Form** — Controle de formulários

---

## 🎨 Design System

O projeto segue um padrão de **design consistente**, utilizando:

- Tokens de cores do Tailwind
- Componentes do shadcn/ui
- Layouts responsivos (mobile first)
- Feedback visual para loading, erro e sucesso

---

## 📁 Estrutura de Pastas

```bash
src/
├── assets/          # Imagens e arquivos estáticos
├── components/      # Componentes reutilizáveis
│   ├── ui/           # Componentes do shadcn/ui
│   └── shared/       # Componentes globais
├── pages/           # Páginas da aplicação
├── layout/          # Layouts da aplicação
├── routes/          # Definição das rotas
├── services/        # Comunicação com API
├── hooks/           # Hooks customizados
├── contexts/        # Context API (auth, tema, etc)
├── schemas/         # Schemas Zod
├── types/           # Tipagens globais
├── utils/           # Funções utilitárias
└── main.tsx         # Entry point
```

---

## 🔐 Autenticação

A autenticação é baseada em **JWT**, integrada com o backend:

- Access Token armazenado em memória
- Refresh Token gerenciado pelo backend
- Rotas protegidas via guards

---

## 🌐 Rotas Principais

| Rota         | Descrição         |
| ------------ | ----------------- |
| `/login`     | Login do usuário  |
| `/register`  | Cadastro          |
| `/feed`      | Feed principal    |
| `/pets/:id`  | Perfil do pet     |
| `/posts/:id` | Página do post    |
| `/profile`   | Perfil do usuário |

---

## 🔄 Comunicação com API

Centralizada em `services/api.ts`:

- Interceptors para token
- Tratamento global de erros
- Padronização de responses

---

## 🚀 Como rodar o projeto

```bash
# Instalar dependências
npm install

# Rodar em ambiente de desenvolvimento
npm run dev
```

---

## 📦 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3333
```

---

## 🐶 Petz

Projeto desenvolvido para fins de estudo, portfólio e evolução técnica em **React + TypeScript**.

Feito com ❤️ para pets.
