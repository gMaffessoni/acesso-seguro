# Camada de Controladores (Controllers)

Esta camada é responsável por orquestrar o fluxo de controle da aplicação. Ela atua como intermediária entre a interface do usuário (Views) e as operações de banco de dados (Data Access).

## Responsabilidades
1. **Tratamento de Requisições:** Capturar parâmetros, corpo da requisição e cabeçalhos enviados pelo Express.
2. **Sanitização de Dados:** Limpeza de entradas de dados sensíveis (ex: remoção de caracteres não numéricos em CPFs e telefones).
3. **Validação:** Garantir a integridade dos dados de entrada (como tamanho do CPF e campos obrigatórios) antes de submeter à persistência.
4. **Gerenciamento de Estado da Sessão:** Manipulação de mensagens flash e logs de erros de validação (`req.session.flash` e `req.session.errors`).
5. **Direcionamento de Resposta:** Renderizar componentes SPA usando o protocolo Inertia.js (`res.inertia`) ou redirecionar fluxos utilizando redirecionamentos semânticos (HTTP 303).

## Padrões de Projeto Aplicados
* **Singleton:** Cada controlador é exportado como uma instância única (`export default new Controller()`), garantindo que a mesma instância gerencie as requisições, economizando memória em runtime.

## Diretrizes de Desenvolvimento e Manutenção
> [!IMPORTANT]
> **Nunca** realize consultas diretas ao banco de dados ou execute métodos do Sequelize ORM dentro dos controladores. Qualquer operação de banco de dados deve ser delegada exclusivamente para as classes da camada de **Data Access (DA)**.
