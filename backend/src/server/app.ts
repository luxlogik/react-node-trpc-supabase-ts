import express, { Request, Response } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createContext } from './context';
import { appRouter } from '../routers/app_router';
import { logger } from '../lib/logger';

class App {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = 3001;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }));
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/api/trpc', createExpressMiddleware({
      router: appRouter,
      createContext,
      onError({ error }) {
        logger.error('tRPC error:', error);
      },
    }));

    this.app.get('/health', (_: Request, res: Response) => {
      res.status(200).json({ status: 'ok' });
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server listening on port ${this.port}`);
    });
  }
}

export default App; 