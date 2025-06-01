import Queue from 'bull';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const cleanupStuckJobs = async () => {
  try {
    // Find ebooks stuck in PROCESSING state
    const stuckEbooks = await prisma.ebook.findMany({
      where: {
        status: 'PROCESSING',
        updatedAt: {
          lt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        }
      }
    });

    // Update their status to ERROR
    for (const ebook of stuckEbooks) {
      await prisma.ebook.update({
        where: { id: ebook.id },
        data: {
          status: 'ERROR',
          error: 'Processing timed out after 30 minutes'
        }
      });
    }

    console.log(`Cleaned up ${stuckEbooks.length} stuck jobs`);
  } catch (error) {
    console.error('Error cleaning up stuck jobs:', error);
  }
};

export const getQueueStats = async (queue: Queue.Queue) => {
  const [waiting, active, completed, failed] = await Promise.all([
    queue.getWaitingCount(),
    queue.getActiveCount(),
    queue.getCompletedCount(),
    queue.getFailedCount()
  ]);

  return {
    waiting,
    active,
    completed,
    failed
  };
}; 