import Queue from 'bull';
import { PDFService } from './pdfService';
import { cleanupStuckJobs, getQueueStats } from '../utils/queueUtils';

// Create a new queue for PDF processing
const pdfProcessingQueue = new Queue('pdf-processing', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

// Process jobs
pdfProcessingQueue.process(async (job) => {
  const { ebookId } = job.data;
  
  try {
    await PDFService.processPDF(ebookId);
  } catch (error) {
    console.error('Error processing PDF job:', error);
    throw error;
  }
});

// Handle job events
pdfProcessingQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed for ebook ${job.data.ebookId}`);
});

pdfProcessingQueue.on('failed', (job, error) => {
  console.error(`Job ${job?.id} failed for ebook ${job?.data.ebookId}:`, error);
});

// Clean up stuck jobs every 5 minutes
setInterval(cleanupStuckJobs, 5 * 60 * 1000);

export const addPDFProcessingJob = async (ebookId: string) => {
  const job = await pdfProcessingQueue.add(
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

export const getJobStatus = async (jobId: string) => {
  const job = await pdfProcessingQueue.getJob(jobId);
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

export const getQueueStatus = async () => {
  return getQueueStats(pdfProcessingQueue);
}; 