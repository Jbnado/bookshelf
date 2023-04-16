import { Dialect, Sequelize } from 'sequelize';
import { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } from './config';

// Configuração do banco de dados
class Database {
  private databaseConfig = {
    dialect: 'postgres' as Dialect,
    username: DB_USERNAME as string,
    password: DB_PASSWORD as string,
    database: DB_NAME as string,
    host: DB_HOST as string,
    port: Number(DB_PORT),
    define: {
      timestamps: true, // cria automaticamente colunas created_at e updated_at
      underscored: true, // utiliza o padrão snake_case para nome das tabelas e colunas
    },
    
  }
  public connection: Sequelize = new Sequelize;

  constructor() {
    this.connection = new Sequelize(this.databaseConfig);
  }

  public async authenticate() {
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

const database = new Database();

export default database;