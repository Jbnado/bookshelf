import { Request, Response } from 'express';
import User from './user.model';

class UserService {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  }

  async login(req: Request, res: Response) {
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

    return res.json(user);
  }
}

export default new UserService();
