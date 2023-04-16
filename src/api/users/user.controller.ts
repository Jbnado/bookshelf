import { Router } from 'express';
import userService from './user.service.js';

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post('/', userService.store);
    this.router.post('/login', userService.login);
    this.router.get('/user', userService.getUser);
  }
}

export default new UserRouter().router;
