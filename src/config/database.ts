import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database configuration and connection setup
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'usersdb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * Test database connection
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

/**
 * Sync database models
 */
export const syncDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database models synchronized successfully');
  } catch (error) {
    console.error('❌ Error synchronizing database models:', error);
  }
};

export default sequelize;
