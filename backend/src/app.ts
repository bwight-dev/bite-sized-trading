import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import prisma from './db';
import contentRoutes from './routes/content';
import ebookRoutes from './routes/ebookRoutes';
import { authMiddleware } from './middleware/auth';
import { ensureUploadsDirectory } from './utils/fileUtils';

const app = express();

// Ensure uploads directory exists
ensureUploadsDirectory();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Health check endpoint
app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Content routes with authentication
app.use('/content', authMiddleware, contentRoutes);

// Ebook routes
app.use('/ebooks', ebookRoutes);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
