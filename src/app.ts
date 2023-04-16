import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import database from './config/database.js';
import userController from './api/users/user.controller.js';
import { PORT } from './config/config.js';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.listen();
  }

  private async middleware() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async routes() {
    this.app.use('/api/users', userController);
  }

  public async listen() {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const publicDirectoryPath = path.join(__dirname, 'public');
    this.app.use(express.static(publicDirectoryPath));

    await database.authenticate();

    const port = PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  }
}

export default new App().app;
