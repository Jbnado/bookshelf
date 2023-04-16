import { Sequelize } from 'sequelize';
import { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } from './config.js';

// Configuração do banco de dados
class Database {
  public connection: Sequelize;

  constructor() {
    this.connection = new Sequelize(
      `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      {
        define: {
          timestamps: true, // cria automaticamente colunas created_at e updated_at
          underscored: true, // utiliza o padrão snake_case para nome das tabelas e colunas
        },
      }
    );
  }

  public async authenticate() {
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
      await this.connection.sync();
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

const database = new Database();

export default database;
