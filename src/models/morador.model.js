import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Morador = sequelize.define('Morador', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING, allowNull: true },
  placa_carro: { type: DataTypes.STRING, allowNull: true },
  numero_casa: { type: DataTypes.STRING, allowNull: false },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
  data_inativo: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'moradores'
});

export default Morador;