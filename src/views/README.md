# Camada de Apresentação (Views)

Esta pasta contém o ecossistema do front-end da aplicação, desenvolvido como uma Single Page Application (SPA) reativa utilizando React e Tailwind CSS.

## Responsabilidades
1. **Renderização de Interface (UI):** Construção de formulários, tabelas, modais de cadastro e botões de controle de fluxo de acesso.
2. **Navegação SPA:** Uso do `router` do Inertia.js para trocar de tela e enviar requisições sem que o navegador sofra recarregamento completo da página (full page reload).
3. **Feedback Visual:** Capturar e exibir flash messages de sucesso e erros retornados pelo back-end em tempo real.

## Estrutura do Diretório
* [Home/](file:///C:/projetos/acesso-seguro-1/src/views/Home/): Componentes da página inicial do sistema.
* [Moradores/](file:///C:/projetos/acesso-seguro-1/src/views/Moradores/): Listagens, modais de cadastro e edição de residentes.
* [Visitantes/](file:///C:/projetos/acesso-seguro-1/src/views/Visitantes/): Controle de entradas, saídas e histórico da portaria.
* [app.jsx](file:///C:/projetos/acesso-seguro-1/src/views/app.jsx): Ponto de entrada (bootstrap) do Inertia + React no cliente.

## Diretrizes de Desenvolvimento e Manutenção
> [!IMPORTANT]
> A importação das views é dinâmica e gerenciada pelo Vite no arquivo [app.jsx](file:///C:/projetos/acesso-seguro-1/src/views/app.jsx) através de `import.meta.glob('./**/*.jsx')`. Sendo assim, a estrutura de pastas reflete diretamente os nomes dos componentes mapeados no back-end. Exemplo: `Moradores/Index` refere-se ao arquivo `Moradores/Index.jsx`.
