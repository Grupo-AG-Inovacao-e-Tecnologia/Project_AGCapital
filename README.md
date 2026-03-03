# Project AG Capital

Projeto interno da **Grupo AG Capital**, desenvolvido em Next.js com autenticação e planejamento de integração com a API da HotsCool e login Microsoft.

## Visão geral

Aplicação web moderna para uso corporativo, com foco em autenticação segura e futura integração com sistemas externos. No momento, o acesso é feito via **Magic Link** (link enviado por e-mail) e há preparação para **login com Microsoft** e integração com a **API da HotsCool**.

## Stack tecnológica

| Tecnologia                | Uso                             |
| ------------------------- | ------------------------------- |
| **Next.js 16**            | Framework React (App Router)    |
| **React 19**              | Interface                       |
| **TypeScript**            | Tipagem                         |
| **NextAuth v5**           | Autenticação                    |
| **Prisma**                | ORM (SQLite em desenvolvimento) |
| **Tailwind CSS 4**        | Estilos                         |
| **shadcn/ui**             | Componentes (New York, zinc)    |
| **React Hook Form + Zod** | Formulários e validação         |
| **Nodemailer**            | Envio de e-mail (Magic Link)    |

## Funcionalidades atuais

- **Login via Magic Link** – usuário informa o e-mail e recebe um link para acessar sem senha
- **Páginas de autenticação** – `/auth/login`, `/auth/login-link`, `/auth/signup` com layout da marca (Grupo AG Capital)
- **Provedores configurados** – Nodemailer (Magic Link), GitHub e Google (prontos para uso ao configurar credenciais)
- **Persistência** – sessões e usuários no SQLite via Prisma Adapter do NextAuth
- **Proteção de rotas** – lógica de autorização em `src/proxy.ts` (redirecionamento para login quando não autenticado)

## Roadmap

- [x] **Login com Microsoft** – integração com Azure AD / Entra ID
- [ ] **Integração com API HotsCool** – consumo da API da HotsCool no projeto

## Pré-requisitos

- **Node.js** 20+ (ou **Bun**)
- Conta SMTP para envio de e-mail (Magic Link)

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
# ou
bun install
```

### 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
# Obrigatório para NextAuth
AUTH_SECRET="gere-um-secret-com-openssl-rand-base64-32"

# Magic Link (Nodemailer) – formato: smtp://user:senha@smtp.exemplo.com:587
EMAIL_SERVER="smtp://usuario:senha@smtp.seudominio.com:587"
EMAIL_FROM="noreply@seudominio.com"
```

Para gerar `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. Banco de dados

O projeto usa **SQLite** (arquivo `dev.db`). Para criar/atualizar o schema:

```bash
npx prisma generate
npx prisma db push
# ou, se usar migrations:
# npx prisma migrate dev
```

### 4. Servidor de desenvolvimento

```bash
npm run dev
# ou
bun dev
```

Acesse [http://localhost:3000](http://localhost:3000). A rota de login configurada como padrão do NextAuth é `/auth/login-link` (Magic Link).

## Scripts disponíveis

| Comando         | Descrição                          |
| --------------- | ---------------------------------- |
| `npm run dev`   | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera o Prisma Client e faz build   |
| `npm run start` | Sobe a aplicação em produção       |
| `npm run lint`  | Executa o ESLint                   |

## Estrutura do projeto (resumo)

```
src/
├── app/
│   ├── api/auth/[...nextauth]/   # Rotas da API NextAuth
│   ├── auth/
│   │   ├── login/                # Página de login (email/senha – em preparação)
│   │   ├── login-link/           # Página de Magic Link (ativa)
│   │   └── signup/               # Página de cadastro
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/                     # Formulários de login, login-link e signup
│   └── ui/                       # Componentes shadcn/ui
├── lib/
│   ├── auth.ts                   # Configuração NextAuth (providers, adapter, callbacks)
│   ├── path.ts                   # Rotas centralizadas
│   ├── prisma.ts                 # Cliente Prisma
│   └── utils.ts
└── proxy.ts                      # Lógica de proteção de rotas (auth)
prisma/
├── schema.prisma                 # Modelos User, Account, Session, etc.
└── migrations/
```

## Autenticação

- **Magic Link (ativo):** o usuário acessa `/auth/login-link`, informa o e-mail e recebe um link. O NextAuth usa o provider **Nodemailer** e o **Prisma Adapter** para criar/atualizar usuário e sessão.
- **GitHub / Google:** já configurados em `src/lib/auth.ts`; é necessário definir no Azure/Google os client IDs e secrets e adicionar no `.env` as variáveis correspondentes.
- **Microsoft:** será adicionado como provider (Azure AD / Entra ID) em uma próxima etapa.

Para proteger rotas com middleware no Next.js, use a função em `src/proxy.ts` exportando-a como `middleware` em `src/middleware.ts` (ou `middleware.ts` na raiz), conforme a documentação do NextAuth e do Next.js.

## Licença

Uso interno – Grupo AG Capital.
