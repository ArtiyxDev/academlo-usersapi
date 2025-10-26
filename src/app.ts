import express, { Application } from 'express';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { config } from './config';

/**
 * Create and configure Express application
 */
const createApp = (): Application => {
  const app: Application = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS headers
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

  // Root route
  app.get('/', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to Academlo UsersAPI',
      version: '1.0.0',
      endpoints: {
        health: `${config.apiPrefix}/health`,
        users: `${config.apiPrefix}/users`,
      },
    });
  });

  // API routes
  app.use(config.apiPrefix, routes);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
