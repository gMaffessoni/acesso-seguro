import pg from 'pg';
import sequelize from '../config/database.js';
import 'dotenv/config';

const { Client } = pg;

const DB_NAME = process.env.DB_NAME || 'acesso_seguro_db';

async function setup() {
  const client = new Client({
    host:     process.env.DB_HOST     || 'localhost',
    port:     process.env.DB_PORT     || 5432,
    user:     process.env.DB_USER     || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres',
  });

  await client.connect();

  const existe = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`, [DB_NAME]
  );

  if (existe.rowCount === 0) {
    await client.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`✅ Banco "${DB_NAME}" criado!`);
  } else {
    console.log(`ℹ️  Banco "${DB_NAME}" já existe, pulando.`);
  }

  await client.end();

  await sequelize.sync({ alter: true });
  console.log('✅ Tabelas sincronizadas!');

  await sequelize.close();
}

setup().catch((err) => {
  console.error('❌ Erro no setup:', err.message);
  process.exit(1);
});