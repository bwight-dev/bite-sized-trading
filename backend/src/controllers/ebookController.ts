import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { addPDFProcessingJob, getJobStatus } from '../services/queueService';

const prisma = new PrismaClient();

// Upload ebook
export const uploadEbook = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user?.id; // Assuming you have user authentication middleware
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ebook = await prisma.ebook.create({
      data: {
        userId,
        filename: req.file.filename,
        status: 'UPLOADED',
      },
    });

    res.status(201).json(ebook);
  } catch (error) {
    console.error('Error uploading ebook:', error);
    res.status(500).json({ error: 'Failed to upload ebook' });
  }
};

// Get user's ebooks
export const getUserEbooks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ebooks = await prisma.ebook.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(ebooks);
  } catch (error) {
    console.error('Error fetching ebooks:', error);
    res.status(500).json({ error: 'Failed to fetch ebooks' });
  }
};

// Get ebook status
export const getEbookStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ebook = await prisma.ebook.findFirst({
      where: { id, userId },
    });

    if (!ebook) {
      return res.status(404).json({ error: 'Ebook not found' });
    }

    res.json({ status: ebook.status });
  } catch (error) {
    console.error('Error fetching ebook status:', error);
    res.status(500).json({ error: 'Failed to fetch ebook status' });
  }
};

// Process ebook
export const processEbook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ebook = await prisma.ebook.findFirst({
      where: { id, userId },
    });

    if (!ebook) {
      return res.status(404).json({ error: 'Ebook not found' });
    }

    if (ebook.status === 'PROCESSING') {
      return res.status(400).json({ error: 'Ebook is already being processed' });
    }

    // Add job to processing queue
    const jobId = await addPDFProcessingJob(id);

    res.json({
      message: 'PDF processing started',
      jobId,
      status: 'PROCESSING'
    });
  } catch (error) {
    console.error('Error starting PDF processing:', error);
    res.status(500).json({ error: 'Failed to start PDF processing' });
  }
};

// Get processing job status
export const getProcessingStatus = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const status = await getJobStatus(jobId);

    if (!status) {
      return res.status(404).json({ error: 'Processing job not found' });
    }

    res.json(status);
  } catch (error) {
    console.error('Error fetching processing status:', error);
    res.status(500).json({ error: 'Failed to fetch processing status' });
  }
};

// Delete ebook
export const deleteEbook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const ebook = await prisma.ebook.findFirst({
      where: { id, userId },
    });

    if (!ebook) {
      return res.status(404).json({ error: 'Ebook not found' });
    }

    // Delete the file from the uploads directory
    const filePath = path.join('uploads', ebook.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await prisma.ebook.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting ebook:', error);
    res.status(500).json({ error: 'Failed to delete ebook' });
  }
}; 