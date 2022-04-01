import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: process.env.DB_ENGINE as Dialect,
  logging: false,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
});

export { sequelize };

