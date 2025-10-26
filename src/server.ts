import dotenv from 'dotenv';
import createApp from './app';
import { connectDatabase, syncDatabase } from './config/database';
import { config } from './config';

// Load environment variables
dotenv.config();

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Sync database models
    await syncDatabase();

    // Create Express app
    const app = createApp();

    // Start listening
    app.listen(config.port, () => {
      console.log('=================================');
      console.log(`🚀 Server is running`);
      console.log(`📍 Port: ${config.port}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📡 API Base: ${config.apiPrefix}`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
