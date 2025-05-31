import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Simulate authentication - replace with actual JWT or session logic
  req.user = { id: 'user123' }; // Example user ID
  next();
};
