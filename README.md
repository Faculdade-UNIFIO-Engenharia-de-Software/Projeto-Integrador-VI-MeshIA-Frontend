# MeshIA — Front-end

Plataforma corporativa em que o usuário conversa em linguagem natural com um agente de IA (RAG + LLM) sobre dados da organização, com autenticação JWT e controle de acesso por perfil (RBAC).

Projeto Integrador VI — UNIFIO, Engenharia de Software.

## Stack

- Next.js 16 (App Router, Turbopack) e React 19
- TypeScript
- Tailwind CSS v4 e shadcn/ui (Base UI)
- Zod 4 (validação) e jose (JWT)
- pnpm 12 e Node 24

## Como rodar

Pré-requisitos: Node 24 e pnpm (a versão está em `packageManager` no `package.json`).

```bash
pnpm install
cp .env.example .env.local   # no Windows (PowerShell): Copy-Item .env.example .env.local
pnpm dev
```

A aplicação sobe em http://localhost:3001.

### Variáveis de ambiente

| Variável       | Descrição                                                                       |
| -------------- | ------------------------------------------------------------------------------- |
| `USE_MOCK_API` | `true` usa dados fictícios (não precisa do back-end). `false` chama a API real. |
| `API_URL`      | URL base da API do back-end. Usada quando `USE_MOCK_API=false`.                 |

Nunca faça commit do `.env.local`.

## Scripts

| Comando      | O que faz                                    |
| ------------ | -------------------------------------------- |
| `pnpm dev`   | Servidor de desenvolvimento (porta 3001)     |
| `pnpm build` | Build de produção (inclui checagem de tipos) |
| `pnpm lint`  | ESLint                                       |

## Telas

| Rota                     | Descrição                                                                  |
| ------------------------ | -------------------------------------------------------------------------- |
| `/auth`                  | Login                                                                      |
| `/chats`                 | Landing do chat: pergunta, ações rápidas e consultas recentes              |
| `/chats/nova`            | Conversa com carregando, resposta com fontes e erro                        |
| `/history`               | Histórico de análises com busca                                            |
| `/data-catalog`          | Bases de dados disponíveis                                                 |
| `/data-catalog/new`      | Nova conexão de base                                                       |
| `/users`, `/users/new`   | Usuários e equipes: lista, detalhe, edição de perfil, suspensão e cadastro |
| `/squads`, `/squads/new` | Equipes: lista e criação                                                   |
| `/profile`               | Perfil e tema (claro/escuro)                                               |

A raiz `/` redireciona para `/chats`.

## Estrutura

```
src/
  actions/        Server Actions (login, logout, usuários, equipes, bases)
  app/
    (public)/     Rotas sem login (/auth)
    (private)/    Rotas autenticadas, com sidebar
  components/     Componentes de UI (shadcn/ui, logos, estados de erro)
  hooks/
  lib/            Utilitários e constantes (perfis, formatação, provedores)
  services/api/   Camada de acesso à API (mock ou real)
proxy.ts          Proteção de rotas
```

### Camada de serviços

Toda chamada de dados passa por `src/services/api/*`, que devolve
`{ ok: true, data }` ou `{ ok: false, message }`. Com `USE_MOCK_API=true`, cada função usa dados fictícios em memória (as mudanças somem ao reiniciar o servidor). Com `false`, ela chama `API_URL`, enviando o token do cookie `httpOnly` como `Bearer`.

Os contratos com o back-end ainda estão a combinar:

- `POST /auth/login`
- `GET /me`
- `GET /users`, `PATCH /users/:id`, `POST /users`
- `GET /teams`, `POST /teams`
- `GET /databases`, `POST /databases`
- `GET /conversations`
- `POST /chat`

### Segurança

- O token fica em cookie `httpOnly`; o front nunca o lê no navegador.
- **O back-end é a autoridade final de autorização.** Esconder um botão na interface não é controle de acesso.
- Senhas de conexão de bases são enviadas ao servidor e nunca devolvidas à tela.
- Mensagens de erro técnicas não são exibidas ao usuário.

## Fluxo de trabalho (Git)

1. Atualize a `main`: `git switch main && git pull origin main`.
2. Crie uma branch por tarefa: `feat/...`, `fix/...`, `chore/...`, `ci/...` ou `docs/...`.
3. Commits no padrão Conventional Commits, por exemplo `feat(chats): landing com pergunta`.
4. Antes do push: `pnpm lint` e `pnpm build`.
5. Abra um Pull Request para a `main`. O CI precisa passar.
6. Merge por merge commit (não squash, para não quebrar PRs encadeados).

## CI e deploy

- GitHub Actions (`.github/workflows/ci.yml`): instala, roda `pnpm lint` e `pnpm build` em PRs e pushes na `main`, com `USE_MOCK_API=true`.
- Deploy na Vercel. As variáveis de ambiente devem estar configuradas em Production e Preview.
