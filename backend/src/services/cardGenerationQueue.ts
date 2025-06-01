import Queue from 'bull';
import { AIService } from './aiService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new queue for card generation
const cardGenerationQueue = new Queue('card-generation', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

// Process jobs
cardGenerationQueue.process(async (job) => {
  const { ebookId } = job.data;
  
  try {
    // Update ebook status to indicate card generation
    await prisma.ebook.update({
      where: { id: ebookId },
      data: { status: 'GENERATING_CARDS' }
    });

    // Generate cards
    await AIService.generateCardsFromEbook(ebookId);

    // Update ebook status to completed
    await prisma.ebook.update({
      where: { id: ebookId },
      data: { status: 'COMPLETED' }
    });
  } catch (error) {
    console.error('Error processing card generation job:', error);
    
    // Update ebook status to error
    await prisma.ebook.update({
      where: { id: ebookId },
      data: { 
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Failed to generate cards'
      }
    });

    throw error;
  }
});

// Handle job events
cardGenerationQueue.on('completed', (job) => {
  console.log(`Card generation completed for ebook ${job.data.ebookId}`);
});

cardGenerationQueue.on('failed', (job, error) => {
  console.error(`Card generation failed for ebook ${job?.data.ebookId}:`, error);
});

export const addCardGenerationJob = async (ebookId: string) => {
  const job = await cardGenerationQueue.add(
    { ebookId },
    {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      timeout: 30 * 60 * 1000, // 30 minutes timeout
    }
  );
  
  return job.id;
};

export const getCardGenerationStatus = async (jobId: string) => {
  const job = await cardGenerationQueue.getJob(jobId);
  if (!job) {
    return null;
  }

  const state = await job.getState();
  const progress = job.progress;
  const result = job.returnvalue;
  const error = job.failedReason;

  return {
    id: job.id,
    state,
    progress,
    result,
    error,
  };
}; 