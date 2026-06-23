# Tarefas Agendadas (Jobs)

Esta pasta gerencia tarefas automatizadas executadas em segundo plano (background tasks), essenciais para manutenção, auditoria e limpeza lógica da aplicação.

## Responsabilidades
1. **Agendamento por Tempo (Cron):** Definir janelas de tempo ideais para processamento pesado (ex: execução diária à meia-noite).
2. **Conformidade de Dados (LGPD/GDPR):** Garantir a exclusão física/lógica de registros inativos após o prazo legal estabelecido, minimizando passivos jurídicos de vazamento de dados.
3. **Escrita de Logs de Auditoria:** Registrar no arquivo local `cleanup.log` o status de execução de cada job.

## Padrões de Projeto Aplicados
* **Scheduler Pattern:** Automatiza a execução de processos por recorrência temporal sem intervenção humana.

## Diretrizes de Desenvolvimento e Manutenção
> [!WARNING]
> Erros ocorridos durante a execução dos jobs devem ser capturados e registrados no log, **jamais** lançando exceções não tratadas (uncaught exceptions) que possam causar o travamento ou encerramento (crash) do servidor Express principal.
