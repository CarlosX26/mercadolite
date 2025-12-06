# MERCADO LITE

Este projeto foi desenvolvido como parte de um desafio Full Stack. O objetivo era criar uma aplicação de comércio eletrônico, permitindo aos usuários adicionar produtos ao carrinho, removê-los e, ao concluir a compra, enviar um e-mail com o resumo do pedido.

## Rodando com Docker (Recomendado)

Clone o projeto

```bash
  git clone git@github.com:CarlosX26/mercadolite.git
```

Entre no diretório do projeto

```bash
  cd mercadolite
```

1 - Configure as variáveis de ambiente no arquivo `.env`

```bash
  # Atualize com suas credenciais SMTP
  SMTP_USER=seu-email@gmail.com
  SMTP_PASS=sua-senha-de-app
```

2 - Execute o setup automatizado

```bash
  ./docker-setup.sh
```

Ou manualmente:

```bash
  docker-compose up --build -d
  docker-compose exec backend yarn typeorm migration:run -d src/data-source.ts
```

### Acessos:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

## Rodando localmente (sem Docker)

### Front-end

```bash
  cd front-end
  yarn && yarn dev
```

## Rotas front-end

- "/" -> acessar todos os produtos e ver carrinho.
- "/auth" -> fazer autenticação e se cadastrar.
- "/adm/auth" -> fazer autenticação como adm ou se cadastrar como adm.
- "/adm/dashboard" -> dashboard do adm para gerenciar produtos.

### Back-end

```bash
  cd back-end
  yarn
  # Configure .env com PostgreSQL local
  yarn typeorm migration:run -d src/data-source.ts
  yarn dev
```

## Documentação da API

```http
    GET - /api-docs/
```

## Stack utilizada

**Front-end:** React, Chakra UI e TypeScript.

**Back-end:** Node.js, Express.js, TypeScript e PostgreSQL.

**Infraestrutura:** Docker e Docker Compose.
