import sequelize from '../config/database.js';
import Morador from '../models/morador.model.js';
import 'dotenv/config';

const moradoresFicticios = [
  { nome: 'Ana Paula Silva', cpf: '111.111.111-11', telefone: '(11) 98888-1111', numero_casa: '101', placa_carro: 'ABC-1234' },
  { nome: 'Carlos Eduardo Mendes', cpf: '222.222.222-22', telefone: '(11) 98888-2222', numero_casa: '102', placa_carro: 'XYZ-9876' },
  { nome: 'Beatriz Souza', cpf: '333.333.333-33', telefone: '(11) 98888-3333', numero_casa: '103', placa_carro: null },
  { nome: 'Fernando Alves', cpf: '444.444.444-44', telefone: '(11) 98888-4444', numero_casa: '104', placa_carro: 'DEF-5678' }
];

async function seedDatabase() {
  try {
    // Conecta ao banco de dados
    await sequelize.authenticate();
    console.log('⏳ Conectando ao banco de dados...');

    // Conta quantos moradores já existem
    const count = await Morador.count();
    
    if (count === 0) {
      // Se não tiver nenhum, insere a lista inteira
      await Morador.bulkCreate(moradoresFicticios);
      console.log('✅ Moradores fictícios inseridos com sucesso!');
    } else {
      console.log(`ℹ️ O banco já possui ${count} morador(es). Nenhuma ação realizada para não duplicar dados.`);
    }

  } catch (error) {
    console.error('❌ Erro ao popular o banco:', error.message);
  } finally {
    // Fecha a conexão e encerra o script
    await sequelize.close();
    process.exit(0);
  }
}

seedDatabase();