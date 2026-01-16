# 💅 Unhas VF — Backend API

Backend da aplicação **Unhas VF**, um sistema de gerenciamento de **clientes e agendamentos**, desenvolvido para **uso real em um pequeno negócio**, com foco em organização, segurança e escalabilidade.

Este projeto foi criado para atender uma necessidade real de controle de agenda e clientes, sendo utilizado diariamente.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL (Neon)**
- **JWT (Autenticação)**
- **Zod (Validação de dados)**
- **Axios**
- **Docker (ambiente local)**
- **Render (Deploy)**
- **tsup (build)**

---

## 🧠 Arquitetura

O projeto segue uma arquitetura em camadas:

- **Controllers** → Responsáveis por receber e responder as requisições
- **Services** → Contêm as regras de negócio
- **Middlewares** → Autenticação, autorização e tratamento de erros
- **Routes** → Definição das rotas da API
- **Prisma** → Comunicação com o banco de dados

Separação clara de responsabilidades, facilitando manutenção e escalabilidade.

---

## 🔐 Autenticação e segurança

- Autenticação via **JWT**
- Rotas protegidas por middleware
- Validação de dados com **Zod**
- Tratamento centralizado de erros com `AppError`
- Variáveis sensíveis protegidas via `.env`

> ⚠️ Por se tratar de um sistema em uso real, **nenhum dado sensível é exposto neste repositório**.

---

## 📦 Funcionalidades

### 👤 Usuários

- Login
- Autenticação
- Controle de permissões

### 👥 Clientes

- Criar cliente
- Listar clientes
- Buscar por nome
- Editar cliente
- Excluir cliente

### 📅 Agendamentos

- Criar agendamento
- Listar agendamentos
- Filtrar por data
- Editar agendamento
- Excluir agendamento
- Controle de status
