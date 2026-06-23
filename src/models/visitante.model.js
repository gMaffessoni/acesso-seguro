import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Visitante = sequelize.define('Visitante', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
  // Novos campos adicionados para o Histórico
  placa_carro: { type: DataTypes.STRING, allowNull: true },
  tempo_visita: { type: DataTypes.STRING, allowNull: false }, // Ex: "Algumas horas", "O dia todo"
  hora_entrada: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // Pega a hora atual do servidor automaticamente
  hora_saida: { type: DataTypes.DATE, allowNull: true }, // Começa vazio
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'visitantes'
});

export default Visitante;