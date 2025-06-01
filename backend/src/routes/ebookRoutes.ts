import express from 'express';
import { upload } from '../middleware/upload';
import {
  uploadEbook,
  getUserEbooks,
  getEbookStatus,
  deleteEbook,
  processEbook,
  getProcessingStatus,
} from '../controllers/ebookController';
import { authMiddleware } from '../middleware/auth';
import { getQueueStatus } from '../services/queueService';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Upload ebook
router.post('/upload', upload.single('file'), uploadEbook);

// Get user's ebooks
router.get('/', getUserEbooks);

// Get ebook status
router.get('/:id/status', getEbookStatus);

// Process ebook
router.post('/:id/process', processEbook);

// Get processing job status
router.get('/processing/:jobId', getProcessingStatus);

// Get queue status
router.get('/queue/status', async (req, res) => {
  try {
    const status = await getQueueStatus();
    res.json(status);
  } catch (error) {
    console.error('Error fetching queue status:', error);
    res.status(500).json({ error: 'Failed to fetch queue status' });
  }
});

// Delete ebook
router.delete('/:id', deleteEbook);

export default router; 