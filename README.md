# API Sistema Financeiro

> RESTful API de gestão financeira pessoal construída com Clean Architecture e Domain-Driven Design

[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

---

## Sobre o Projeto

API REST para gestão de finanças pessoais, projetada com foco em **precisão e robustez**.

Sistemas financeiros não toleram erros de dados. Por isso, a arquitetura foi desenhada com **Clean Architecture** e **DDD (Domain-Driven Design)**, garantindo que as regras de negócio fiquem completamente isoladas de frameworks e infraestrutura.

---

## Funcionalidades

- **Gestão de Contas** — Criação, consulta e controle de contas financeiras
- **Transações** — Depósitos, saques e transferências com integridade garantida
- **Relatórios de Saldo** — Extrato e saldo em tempo real
- **Regras de Negócio Ricas** — Entidades com invariantes (ex: saldo nunca negativo sem limite aprovado)
- **Documentação Swagger** — Interface interativa para testar todos os endpoints

---

## Arquitetura

O projeto segue os princípios de **Clean Architecture** com 4 camadas concêntricas:

```
src/
├── core/                     # Kernel Compartilhado
│   ├── logic/                # Result, Either, Guard (Monads)
│   ├── domain/               # Classes base para Entidades e VOs
│   └── exceptions/           # Exceções de Domínio
└── modules/
    └── finance/              # Bounded Context Principal
        ├── domain/           # Núcleo — Entidades, Value Objects, Repositórios
        ├── application/      # Orquestração — Use Cases, DTOs, Portas
        ├── infrastructure/   # Prisma, Adapters, Mappers
        └── presentation/     # Controllers HTTP
```

| Benefício | Impacto prático |
|---|---|
| Domínio isolado | Troca de banco sem alterar regras de negócio |
| Alta testabilidade | Use Cases testáveis sem banco de dados real |
| Escalabilidade | Módulos prontos para extração em microsserviços |

---

## Stack Tecnológica

| Categoria | Tecnologia |
|---|---|
| **Framework** | NestJS 11 |
| **Linguagem** | TypeScript 5.7 |
| **ORM** | Prisma 5 |
| **Banco de Dados** | PostgreSQL 13 |
| **Containerização** | Docker + Docker Compose |
| **Documentação** | Swagger / OpenAPI |
| **Testes** | Jest + Supertest |
| **Qualidade** | ESLint + Prettier |

---

## Como Executar

**Pré-requisitos:** Node.js 20+ e Docker

```bash
# 1. Clone o repositório
git clone https://github.com/icarogoggin/api_sistema_financeiro.git
cd api_sistema_financeiro

# 2. Configure as variáveis de ambiente
cp .env.example .env

# 3. Suba o banco de dados
docker-compose up -d

# 4. Instale dependências e rode as migrations
npm install
npx prisma migrate dev

# 5. Inicie a API (modo desenvolvimento)
npm run start:dev
```

A API estará disponível em **http://localhost:3000**

A documentação Swagger estará em **http://localhost:3000/api**

---

## Testes

```bash
npm run test        # Testes unitários
npm run test:cov    # Cobertura de código
npm run test:e2e    # Testes end-to-end
```

---

## Scripts

| Script | Descrição |
|---|---|
| `npm run start:dev` | Desenvolvimento com hot reload |
| `npm run start:prod` | Produção |
| `npm run build` | Compila TypeScript |
| `npm run test` | Testes unitários |
| `npm run test:cov` | Cobertura de testes |
| `npm run lint` | Verifica estilo de código |
| `npm run format` | Formata com Prettier |

---

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/finance_db"
PORT=3000
NODE_ENV=development
```

---

## Contribuindo

1. Faça um fork do projeto
2. Crie sua branch: `git checkout -b feat/minha-feature`
3. Commit: `git commit -m 'feat: descrição da mudança'`
4. Push: `git push origin feat/minha-feature`
5. Abra um Pull Request

---

## Autor

**Ícaro Goggin** — Desenvolvedor Full Stack

- [LinkedIn](https://www.linkedin.com/in/icarogoggin)
- [GitHub](https://github.com/icarogoggin)
