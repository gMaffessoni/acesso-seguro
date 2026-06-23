# Camada de Middlewares

Middlewares interceptam o ciclo de requisição e resposta do Express para injetar utilitários, autenticações, tratamentos ou configurações aplicadas globalmente ou em rotas específicas.

## Responsabilidades
1. **Decodificação de Protocolos Customizados:** Processar requisições para identificar a necessidade de retorno JSON de SPA ou renderização de layout completo HTML (comportamento do `inertiaMiddleware`).
2. **Extensão de Objetos do Express:** Injetar métodos auxiliares nas variáveis de resposta (`res`) para simplificar o desenvolvimento das rotas.
3. **Compartilhamento Global de Dados:** Disponibilizar flash messages de sucesso e erros oriundas da sessão de forma unificada nas rotas.

## Padrões de Projeto Aplicados
* **Middleware (Chain of Responsibility):** Passa a requisição sequencialmente por tratadores até atingir a rota destino.

## Diretrizes de Desenvolvimento e Manutenção
> [!IMPORTANT]
> Middlewares devem sempre invocar a função callback `next()` no término do processamento de sucesso para evitar o travamento da requisição HTTP.
