# Camada de Acesso a Dados (Data Access)

Esta camada (frequentemente referida como **Repository** ou **DAO**) encapsula toda a lógica de persistência e comunicação relacional com o banco de dados.

## Responsabilidades
1. **Abstração do ORM:** Centralizar consultas, filtros e modificações realizadas por meio do Sequelize.
2. **Encapsulamento de Erros:** Capturar exceções nativas de banco de dados (ex: violações de restrição de integridade ou duplicidade de chaves únicas) e devolvê-las em um objeto padronizado contendo o status (`ok`, `error`, `not_found`).
3. **Isolamento de Queries:** Impedir que o restante do sistema precise saber a respeito de chaves primárias, estrangeiras ou relacionamentos do banco de dados relacional.

## Padrões de Projeto Aplicados
* **Data Access Object (DAO) / Repository:** Isola o mecanismo de acesso a dados da lógica de negócios.
* **Singleton:** Cada classe DA é exportada pré-instanciada.

## Diretrizes de Desenvolvimento e Manutenção
> [!TIP]
> Caso seja necessário migrar a base de dados do PostgreSQL para outra tecnologia (como MongoDB) ou substituir o Sequelize por outro ORM (como Prisma ou Knex.js), **apenas** os arquivos contidos nesta pasta precisam ser refatorados. Os controladores continuarão consumindo os mesmos métodos (ex: `getAll`, `getById`).
