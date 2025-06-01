import express from 'express';
import { upload } from '../middleware/upload';
import {
  uploadEbook,
  getUserEbooks,
  getEbookStatus,
  deleteEbook,
} from '../controllers/ebookController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Upload ebook
router.post('/upload', upload.single('file'), uploadEbook);

// Get user's ebooks
router.get('/', getUserEbooks);

// Get ebook status
router.get('/:id/status', getEbookStatus);

// Delete ebook
router.delete('/:id', deleteEbook);

export default router; 