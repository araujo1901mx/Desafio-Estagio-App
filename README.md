# Desafio de Estágio - Sistema de Gerenciamento Escolar

Um sistema full-stack completo para gerenciamento de usuários, escolas, professores e alunos. Desenvolvido como projeto de avaliação para estágio.

## Live Demo

A aplicação está hospedada e rodando na nuvem:
- **Frontend (Site):** [https://desafio-estagio-frontend.vercel.app](https://desafio-estagio-frontend.vercel.app)
- **Backend (API):** [https://desafio-estagio-backend.vercel.app/api](https://desafio-estagio-backend.vercel.app/api)

## Tecnologias Utilizadas

### Frontend
- **Angular 22** (Standalone Components)
- **TypeScript**
- **RxJS** (Observables para comunicação HTTP)
- **Vercel** (Hospedagem SPA)

### Backend
- **Node.js** com **Express**
- **Sequelize ORM** (Modelagem e Migrations)
- **PostgreSQL** (Banco de dados relacional via Neon.tech)
- **JWT (JSON Web Tokens)** (Autenticação e autorização)
- **Bcrypt** (Criptografia e hashing de senhas)
- **Vercel** (Hospedagem Serverless)

### DevOps
- **Docker** e **Docker Compose** (Containerização para ambiente local)

## Funcionalidades

- **Autenticação:** Login seguro via CPF e Senha utilizando JWT. Senhas são salvas no banco com hash seguro (Bcrypt).
- **Usuários:** Cadastro com validação de CPF único.
- **Escolas:** Cadastro de escolas (nome e endereço).
- **Professores:** Vínculo inteligente (um professor é um usuário vinculado a uma escola). O sistema cria o acesso de usuário e o perfil de professor simultaneamente.
- **Alunos:** Cadastro de alunos e vínculo direto a um professor responsável.
- **Segurança:** Rotas de API protegidas pelo middleware de autenticação (bloqueio sem Token válido).

## Como rodar o projeto localmente

A forma mais rápida de testar o sistema localmente é através do **Docker**. 

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando.

### Passos

1. Clone o repositório:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd desafio-estagio-app
   ```

2. Suba todos os containers com o Docker Compose:
   ```bash
   docker-compose up --build
   ```

Isso fará o seguinte:
- Subirá um banco **PostgreSQL** na porta `5432`.
- Subirá a **API Node.js** na porta `3000` (e rodará as migrations automaticamente).
- Compilará o **Angular** e servirá usando Nginx na porta `4200` (mapeada para a `80` interna).

3. Acesse no navegador:
   - Site: [http://localhost:4200](http://localhost:4200)
   - API: [http://localhost:3000/api](http://localhost:3000/api)

---

## Arquitetura e Modelagem

O banco de dados foi modelado seguindo uma estrutura relacional rígida com UUIDv4 como Chaves Primárias:

- `users`: Armazena dados de login e informações sensíveis.
- `schools`: Armazena os dados das instituições.
- `teachers`: Tabela de relacionamento (Foreign Keys apontando para `users` e `schools`).
- `students`: Armazena alunos e a qual `teacher` eles estão vinculados.

## Notas sobre a Hospedagem (Vercel)

A API Express foi adaptada para rodar em formato **Serverless Function** dentro do Vercel, enquanto o Angular foi configurado para resolver suas rotas como **SPA (Single Page Application)** nativamente através dos arquivos `vercel.json`.
