# Camada de Modelagem Relacional (Models)

Esta camada mapeia as tabelas físicas do banco de dados relacional (PostgreSQL) para classes Javascript consumíveis na aplicação através do Sequelize ORM.

## Responsabilidades
1. **Definição de Schema:** Declarar atributos, tipos de dados (DataTypes), valores default e permissão de nulos de cada tabela.
2. **Definição de Constraints (Restrições):** Mapear índices únicos (ex: CPF único) e relacionamentos.
3. **Mapeamento de Metadados:** Configurar nomes das tabelas físicas (`tableName`) e campos de auditoria de alteração (`timestamps: true`, mapeado automaticamente para `created_at` e `updated_at`).

## Padrões de Projeto Aplicados
* **Active Record:** O Sequelize permite que as instâncias dos modelos carreguem consigo os métodos de alteração direta do próprio registro (ex: `morador.update()`, `morador.destroy()`).

## Diretrizes de Desenvolvimento e Manutenção
> [!IMPORTANT]
> Toda alteração estrutural nas tabelas deve ser feita alterando os arquivos desta pasta. A sincronização de desenvolvimento é configurada em runtime via `sequelize.sync({ alter: true })` no [server.js](file:///C:/projetos/acesso-seguro-1/src/server.js#L70).
