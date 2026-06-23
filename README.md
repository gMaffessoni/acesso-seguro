# Acesso Seguro — Sistema de Controle de Portaria Integrado

Este repositório contém a base de código do sistema **Acesso Seguro**, uma solução Full-Stack moderna projetada para automatizar, monitorar e auditar acessos de moradores e visitantes em condomínios residenciais.

## 📖 Documentação do Projeto

A documentação detalhada da solução está estruturada de forma centralizada e distribuída:

* **[Documentação Técnica Geral (Macro)](DOCUMENTACAO_TECNICA.md)** — Cobre o objetivo do software, tecnologias, modelagem física de banco de dados (esquema Mermaid ER), API REST baseada em Inertia.js e histórico de desafios de implementação.
* **Manuais de Arquitetura por Pasta (Micro):**
  * [Controllers (Controle e Validação)](src/controllers/README.md)
  * [Data Access (Acesso a Dados)](src/data_access/README.md)
  * [Models (Estrutura do Sequelize)](src/models/README.md)
  * [Middleware (Filtros e Utilitários)](src/middleware/README.md)
  * [Routers (Mapeamento de Rotas)](src/routers/README.md)
  * [Jobs (Tarefas Automatizadas)](src/jobs/README.md)
  * [Views (Interface SPA React)](src/views/README.md)

## 🚀 Como Executar o Projeto

1. **Instalar Dependências:**
   ```bash
   npm install
   ```
2. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as credenciais do PostgreSQL:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=acesso_seguro_db
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   SESSION_SECRET=uma_chave_segura
   PORT=3000
   ```
3. **Inicializar o Banco de Dados e Popular (Seeds):**
   ```bash
   npm run setup
   npm run seed
   ```
4. **Iniciar o Servidor em Desenvolvimento:**
   ```bash
   npm run dev
   ```
