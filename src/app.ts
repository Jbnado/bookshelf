import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import database from './config/database';
import userController from './api/users/user.controller';
import { PORT } from './config/config';

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
  }

  private async routes() {
    this.app.use('/api/users', userController);
  }

  public async listen() {
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