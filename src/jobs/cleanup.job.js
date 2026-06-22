import cron from 'node-cron';
import { Op } from 'sequelize';
import Morador from '../models/morador.model.js';
import fs from 'fs';

const log = (msg) => {
  const linha = `[${new Date().toISOString()}] ${msg}`;
  console.log(linha);
  fs.appendFileSync('cleanup.log', linha + '\n');
};

export const initCleanupJob = () => {
  log('Cleanup job registrado — roda todo dia à meia-noite.');

  cron.schedule('0 0 * * *', async () => {
    log('Iniciando limpeza de moradores inativos...');

    const dataLimite = new Date();
    dataLimite.setFullYear(dataLimite.getFullYear() - 5);

    try {
      const deletados = await Morador.destroy({
        where: {
          ativo: false,
          data_inativo: { [Op.lte]: dataLimite },
        },
      });
      log(`✓ Limpeza concluída — ${deletados} morador(es) deletado(s).`);
    } catch (error) {
      log(`✗ Erro na limpeza: ${error.message}`);
    }
  });
};