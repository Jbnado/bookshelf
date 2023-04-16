import dotenv from 'dotenv';
dotenv.config();
// Exporta um objeto com todas as variáveis de ambiente

export const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, PORT, JWT_SECRET } = process.env;