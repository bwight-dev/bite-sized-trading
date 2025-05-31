import express, { Request, Response } from 'express';
import { contentService } from '../services/contentService';
import { userService } from '../services/userService';

const router = express.Router();

// GET /content/cards
router.get('/cards', async (req: Request, res: Response) => {
  const { page = 1, limit = 10, category, difficulty } = req.query;
  const userId = req.user?.id; // Assuming authentication middleware sets req.user
  const cards = await contentService.getCards(Number(page), Number(limit), category as string, difficulty as string, userId);
  res.json(cards);
});

// POST /content/cards/:id/complete
router.post('/cards/:id/complete', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isCorrect } = req.body;
  const userId = req.user?.id; // Assuming authentication middleware sets req.user
  await contentService.markCardComplete(id, userId, isCorrect);
  res.status(200).json({ message: 'Card marked as completed' });
});

// GET /user/progress
router.get('/user/progress', async (req: Request, res: Response) => {
  const userId = req.user?.id; // Assuming authentication middleware sets req.user
  const progress = await userService.getUserProgress(userId);
  res.json(progress);
});

export default router;
