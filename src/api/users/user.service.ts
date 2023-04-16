import { Request, Response } from 'express';
import User from './user.model.js';

class UserService {
  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'E-mail already exists' });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      // Remove the password field from the response
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = await user.checkPassword(password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = user.generateToken();

      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = User.verifyToken(token);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserService();
