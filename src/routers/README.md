# Definições de Rotas (Routers)

Esta camada mapeia as URLs (endpoints) do sistema aos métodos específicos dos controladores Express.

## Responsabilidades
1. **Mapeamento de Verbos HTTP:** Declarar de forma explícita e legível as operações (GET, POST, PUT, DELETE).
2. **Definição de Parâmetros Dinâmicos:** Mapear curingas nas URLs (ex: `/moradores/:id/`).
3. **Agrupamento Temático:** Separar as definições de rotas por entidades de domínio (ex: Moradores vs. Visitantes).

## Diretrizes de Desenvolvimento e Manutenção
> [!TIP]
> Desenhe rotas respeitando a semântica RESTful:
> * `GET /entidade` - Listagem.
> * `GET /entidade/:id` - Edição/Visualização individual.
> * `POST /entidade` - Criação.
> * `PUT /entidade/:id` - Atualização completa.
