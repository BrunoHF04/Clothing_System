# Clothing System - ERP Fashion Local

Base inicial do backend em Go para o ERP de loja de vestuario com PostgreSQL.

## Stack

- Go
- PostgreSQL
- API HTTP local (intranet)

## Estrutura inicial

- `cmd/api`: ponto de entrada da API
- `internal/config`: configuracoes da aplicacao
- `internal/database`: conexao com PostgreSQL
- `internal/http`: rotas e handlers
- `migrations`: scripts SQL versionados

## Como rodar

1. Suba o PostgreSQL localmente.
2. Crie o banco:

```sql
CREATE DATABASE fashion_erp;
```

3. Rode a migration inicial (`migrations/0001_init.sql`).
4. Configure variaveis de ambiente (opcional):

- `HTTP_ADDR` (padrao `:3333`)
- `DATABASE_URL` (padrao `postgres://postgres:postgres@localhost:5432/fashion_erp?sslmode=disable`)

5. Instale dependencias e execute API:

```bash
go mod tidy
go run ./cmd/api
```

6. Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Endpoints iniciais

- `GET /health`
  - Verifica status da API e conexao com banco.
- `POST /auth/login`
  - Login inicial local (dev): senha `123456`
  - Usuario `dono` ou `admin` retorna perfil DONO
  - Outros usuarios retornam perfil VENDEDOR
- `GET /dashboard/summary`
  - Resumo de indicadores para o dashboard