import { Request, Response } from 'express';
import { db } from '../models/db.js';

export const getDashboardStats = (req: Request, res: Response) => {
  const stats = db.getStats();
  res.json({
    success: true,
    data: stats
  });
};
