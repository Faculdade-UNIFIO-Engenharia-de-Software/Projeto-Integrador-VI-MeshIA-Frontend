# Contratos da API — MeshIA Front-end

O front chama estas rotas **pelo servidor** (Server Actions e Server Components), então não há CORS no navegador. Todas, exceto o login, enviam `Authorization: Bearer <token>`.

Convenções:

- Datas em ISO 8601 (`2026-10-14T16:42:00-03:00`).
- Mensagens de erro em texto: o front mostra mensagens próprias por status e **nunca** exibe o corpo de erro do back.
- `401` em qualquer rota = sessão expirada. O front pede novo login.
- Itens marcados **(a confirmar)** são suposições do front e precisam da validação do back.

## Perfis (RBAC)

Valores de `role`: `admin`, `senior_analyst`, `junior_analyst`, `viewer`.

**O back-end é a autoridade final de autorização.** O front só esconde ou mostra elementos de tela; isso não substitui a checagem no servidor.

## Autenticação

### `POST /auth/login`

Corpo: `{ "email": string, "password": string }`

| Status | Significado               | Resposta                                                                                     |
| ------ | ------------------------- | -------------------------------------------------------------------------------------------- |
| 200    | Login ok                  | `{ "token": string, "expiresIn": number }` (`expiresIn` em segundos; padrão assumido: 28800) |
| 401    | E-mail ou senha inválidos | —                                                                                            |

O front guarda o token em cookie `httpOnly`. O logout hoje só apaga esse cookie. **(a confirmar)** Se o back precisar invalidar o token no servidor, precisamos de um `POST /auth/logout`.

## Perfil

### `GET /me`

Resposta 200 (`Profile`):

```json
{
  "id": "u2",
  "name": "Lucas Silva",
  "email": "lucas@empresa.com",
  "jobTitle": "Analista",
  "department": "BI & Analytics",
  "role": "senior_analyst",
  "lastAccess": "2026-10-16T19:30:00-03:00"
}
```

`lastAccess` pode ser `null`.

## Usuários

Tipo `UserItem`:

```json
{
  "id": "u1",
  "name": "Mariana Costa",
  "email": "mariana@empresa.com",
  "jobTitle": "Gerente",
  "department": "Dados",
  "role": "admin",
  "status": "active",
  "lastAccess": null
}
```

`status`: `active` ou `suspended`.

### `GET /users`

Resposta 200: `UserItem[]`. O parâmetro de busca `?q=` filtra por nome ou e-mail **(a confirmar)**. Sem paginação por enquanto **(a confirmar)**.

### `GET /users/:id` **(a confirmar)**

Resposta 200: `UserItem`.

### `POST /users`

Corpo: `{ name, email, jobTitle, department, role }`

| Status | Significado          | Resposta                                         |
| ------ | -------------------- | ------------------------------------------------ |
| 201    | Criado               | `UserItem` (o `id` é usado para abrir o detalhe) |
| 403    | Sem permissão        | —                                                |
| 409    | E-mail já cadastrado | —                                                |

### `PATCH /users/:id`

Corpo: `{ "role"?: Role, "status"?: "active" | "suspended" }`. Os dois são opcionais; é usado para trocar o perfil e para suspender/reativar.

| Status | Significado   | Resposta   |
| ------ | ------------- | ---------- |
| 200    | Atualizado    | `UserItem` |
| 403    | Sem permissão | —          |

## Equipes

Tipo `TeamItem`:

```json
{
  "id": "t1",
  "name": "Analytics",
  "members": 4,
  "description": "Opcional.",
  "leadName": "Mariana Costa"
}
```

`description` e `leadName` são opcionais (`leadName` pode ser `null`).

### `GET /teams`

Resposta 200: `TeamItem[]`.

### `POST /teams`

Corpo: `{ "name": string, "description": string, "leadId": string }`. O front manda o **id** do líder, não o nome.

| Status | Significado    | Resposta   |
| ------ | -------------- | ---------- |
| 201    | Criada         | `TeamItem` |
| 403    | Sem permissão  | —          |
| 409    | Nome já existe | —          |

## Bases de dados

Tipo `DatabaseItem`:

```json
{
  "id": "d1",
  "name": "Vendas & ERP",
  "provider": "PostgreSQL",
  "company": "Empresa A (Matriz)",
  "status": "online",
  "tables": 18,
  "latencyMs": 24
}
```

`status`: `online`, `syncing` ou `offline`. `latencyMs` é `null` quando não medido.

### `GET /databases`

Resposta 200: `DatabaseItem[]`. `403` se o perfil não puder ver as bases.

### `POST /databases`

Corpo:

```json
{
  "name": "Vendas & ERP",
  "provider": "PostgreSQL",
  "company": "Empresa A",
  "host": "db.empresa.com",
  "port": 5432,
  "database": "vendas_prod",
  "username": "leitura",
  "password": "********"
}
```

Valores de `provider` aceitos pelo front: `PostgreSQL`, `MySQL`, `Snowflake`, `Google BigQuery`.

| Status | Significado                    | Resposta                                    |
| ------ | ------------------------------ | ------------------------------------------- |
| 201    | Criada (pode nascer `syncing`) | `DatabaseItem` (**nunca** devolver a senha) |
| 403    | Sem permissão                  | —                                           |
| 409    | Nome já existe                 | —                                           |

Requisitos de segurança **(a confirmar com o back)**: criptografar a credencial em repouso, exigir/orientar usuário somente leitura e validar a permissão no servidor.

## Chat

### `POST /chat`

Corpo: `{ "question": string }` (3 a 500 caracteres, limitado também pelo front).

| Status | Significado             | Resposta                                                                   |
| ------ | ----------------------- | -------------------------------------------------------------------------- |
| 200    | Resposta gerada         | `{ "text": string, "sources": [{ "database": string, "table": string }] }` |
| 403    | Sem permissão nas bases | —                                                                          |

A resposta deve usar **só as bases autorizadas para o perfil do usuário**. `sources` pode vir vazio. Hoje a resposta é completa (sem streaming) **(a confirmar)**.

### `GET /conversations`

Query opcional: `?q=` (busca por título e pré-visualização). Resposta 200: `ConversationSummary[]`, mais recentes primeiro:

```json
{
  "id": "c1",
  "title": "Política de reembolso",
  "preview": "Qual é o prazo para solicitar reembolso?",
  "messageCount": 6,
  "updatedAt": "2026-10-14T16:42:00-03:00"
}
```

O campo `preview` é a **pergunta inicial**: a landing a reaproveita para refazer a consulta.

## Pontos em aberto

1. Paginação de `/users`, `/databases` e `/conversations`.
2. Renovação do token (refresh) e `POST /auth/logout`.
3. Matriz de permissões por perfil para cada rota acima.
4. Abrir uma conversa salva: `GET /conversations/:id` com as mensagens (hoje o front refaz a pergunta).
5. Resposta do chat em streaming.
6. Formato padrão de erro (hoje o front só usa o status HTTP).
