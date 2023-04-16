import { Request as ExpressRequest, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

interface Request extends ExpressRequest {
  userId?: string;
}

interface TokenPayload extends jwt.JwtPayload {
  id: string;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as TokenPayload;
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
