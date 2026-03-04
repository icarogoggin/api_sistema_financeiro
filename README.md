<div align="center">

<h1>ðŸ’° API Sistema Financeiro</h1>

<p>
  <strong>RESTful API de gestÃ£o financeira pessoal construÃ­da com Clean Architecture e Domain-Driven Design</strong>
</p>

<p>
  <img src="https://img.shields.io/badge/NestJS-11.x-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-13-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
</p>

</div>

---

## ðŸ“‹ Sobre o Projeto

API REST para gestÃ£o de finanÃ§as pessoais, projetada com foco em **precisÃ£o e robustez**. Sistemas financeiros nÃ£o toleram erros de dados â€” por isso, a arquitetura foi desenhada desde o inÃ­cio com **Clean Architecture** e **DDD (Domain-Driven Design)**, garantindo que as regras de negÃ³cio estejam completamente isoladas de frameworks e camadas de infraestrutura.

> *"A regra fundamental: dependÃªncias do cÃ³digo-fonte sÃ³ apontam para dentro, em direÃ§Ã£o Ã s polÃ­ticas de alto nÃ­vel. O nÃºcleo financeiro â€” como o dinheiro se move, como saldos sÃ£o reconciliados â€” permanece imune a mudanÃ§as tecnolÃ³gicas."*

---

## âœ¨ Funcionalidades

- ðŸ“Š **GestÃ£o de Contas** â€” CriaÃ§Ã£o, consulta e controle de contas financeiras
- ðŸ’³ **TransaÃ§Ãµes** â€” DepÃ³sitos, saques e transferÃªncias com integridade garantida
- ðŸ“ˆ **RelatÃ³rios de Saldo** â€” Extrato e saldo em tempo real
- ðŸ”’ **Regras de NegÃ³cio Ricas** â€” Entidades com invariantes (ex.: saldo nunca negativo sem limite aprovado)
- ðŸ“„ **DocumentaÃ§Ã£o Swagger** â€” Interface interativa para testar todos os endpoints

---

## ðŸ—ï¸ Arquitetura

O projeto segue os princÃ­pios de **Clean Architecture** (Robert C. Martin) com camadas concÃªntricas bem definidas:

```
src/
â”œâ”€â”€ core/                     # Kernel Compartilhado
â”‚   â”œâ”€â”€ logic/                # Result, Either, Guard (Monads)
â”‚   â”œâ”€â”€ domain/               # Classes base para Entidades e VOs
â”‚   â””â”€â”€ exceptions/           # ExceÃ§Ãµes de DomÃ­nio genÃ©ricas
â”‚
â””â”€â”€ modules/
    â””â”€â”€ finance/              # Bounded Context Principal
        â”œâ”€â”€ domain/           # â‘  NÃºcleo â€” Entidades, Value Objects, RepositÃ³rios (interfaces)
        â”œâ”€â”€ application/      # â‘¡ OrquestraÃ§Ã£o â€” Use Cases, DTOs, Portas
        â”œâ”€â”€ infrastructure/   # â‘¢ Infraestrutura â€” Prisma, Adapters, Mappers
        â””â”€â”€ presentation/     # â‘£ Interface â€” Controllers HTTP
```

### Por que Clean Architecture?

| BenefÃ­cio | Impacto prÃ¡tico |
|---|---|
| DomÃ­nio isolado | Troca de banco sem alterar regras de negÃ³cio |
| Alta testabilidade | Use Cases testÃ¡veis sem banco de dados real |
| ManutenÃ§Ã£o simplificada | MudanÃ§as de framework nÃ£o afetam o nÃºcleo |
| Escalabilidade | MÃ³dulos prontos para extraÃ§Ã£o em microsserviÃ§os |

---

## ðŸ› ï¸ Stack TecnolÃ³gica

| Categoria | Tecnologia |
|---|---|
| **Framework** | NestJS 11 |
| **Linguagem** | TypeScript 5.7 |
| **ORM** | Prisma 5 |
| **Banco de Dados** | PostgreSQL 13 |
| **ContainerizaÃ§Ã£o** | Docker + Docker Compose |
| **DocumentaÃ§Ã£o** | Swagger / OpenAPI |
| **Testes** | Jest + Supertest |
| **Qualidade** | ESLint + Prettier |

---

## ðŸš€ Como Executar

### PrÃ©-requisitos

- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) e Docker Compose

### 1. Clone o repositÃ³rio

```bash
git clone https://github.com/icarogoggin/api_sistema_financeiro.git
cd api_sistema_financeiro
```

### 2. Configure as variÃ¡veis de ambiente

```bash
cp .env.example .env
# Edite o .env com suas configuraÃ§Ãµes
```

### 3. Suba o banco de dados via Docker

```bash
docker-compose up -d
```

Isso iniciarÃ¡ um container **PostgreSQL 13** na porta `5432`.

### 4. Instale dependÃªncias e rode as migrations

```bash
npm install
npx prisma migrate dev
```

### 5. Inicie a API

```bash
# Desenvolvimento (hot reload)
npm run start:dev

# ProduÃ§Ã£o
npm run build && npm run start:prod
```

A API estarÃ¡ disponÃ­vel em: **http://localhost:3000**

---

## ðŸ“„ DocumentaÃ§Ã£o da API

Com a aplicaÃ§Ã£o rodando, acesse a documentaÃ§Ã£o interativa Swagger:

```
http://localhost:3000/api
```

---

## ðŸ§ª Testes

```bash
# Testes unitÃ¡rios
npm run test

# Testes com relatÃ³rio de cobertura
npm run test:cov

# Testes end-to-end
npm run test:e2e

# Modo watch
npm run test:watch
```

---

## ðŸ“¦ Scripts DisponÃ­veis

| Script | DescriÃ§Ã£o |
|---|---|
| `npm run start:dev` | Inicia em modo desenvolvimento com hot reload |
| `npm run start:prod` | Inicia a versÃ£o de produÃ§Ã£o compilada |
| `npm run build` | Compila o projeto TypeScript |
| `npm run test` | Executa os testes unitÃ¡rios |
| `npm run test:cov` | Testes com relatÃ³rio de cobertura |
| `npm run lint` | Verifica e corrige problemas de estilo |
| `npm run format` | Formata o cÃ³digo com Prettier |

---

## ðŸ—‚ï¸ VariÃ¡veis de Ambiente

Crie um arquivo `.env` na raiz com base no exemplo abaixo:

```env
# Banco de Dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/finance_db"

# AplicaÃ§Ã£o
PORT=3000
NODE_ENV=development
```

---

## ðŸ¤ Contribuindo

1. FaÃ§a um fork do projeto
2. Crie sua feature branch: `git checkout -b feat/minha-feature`
3. Commit suas mudanÃ§as: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feat/minha-feature`
5. Abra um Pull Request

---

## ðŸ‘¨â€ðŸ’» Autor

**Ãcaro Goggin**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-icarogoggin-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/icarogoggin)
[![GitHub](https://img.shields.io/badge/GitHub-icarogoggin-181717?style=flat-square&logo=github)](https://github.com/icarogoggin)

---

<div align="center">
  <sub>ConstruÃ­do com â¤ï¸ e TypeScript</sub>
</div>
