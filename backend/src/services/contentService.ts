import prisma from '../db';
import { Card, UserCardCompletion, UserProgress } from '@prisma/client';

export const contentService = {
  async getCards(page: number, limit: number, category?: string, difficulty?: string, userId?: string) {
    const skip = (page - 1) * limit;
    const where = {
      ...(category && { category }),
      ...(difficulty && { difficulty }),
    };
    const cards = await prisma.card.findMany({
      where,
      skip,
      take: limit,
      include: {
        userCardCompletions: userId ? {
          where: { userId },
        } : undefined,
      },
    });
    return cards;
  },

  async markCardComplete(cardId: string, userId: string, isCorrect: boolean) {
    await prisma.userCardCompletion.create({
      data: {
        cardId,
        userId,
        isCorrect,
      },
    });
    await this.updateStreak(userId);
  },

  async getUserProgress(userId: string) {
    return prisma.userProgress.findUnique({
      where: { userId },
    });
  },

  async updateStreak(userId: string) {
    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });
    if (progress) {
      const today = new Date();
      const lastActive = new Date(progress.lastActiveDate);
      const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        await prisma.userProgress.update({
          where: { userId },
          data: {
            currentStreak: progress.currentStreak + 1,
            lastActiveDate: today,
          },
        });
      } else if (diffDays > 1) {
        await prisma.userProgress.update({
          where: { userId },
          data: {
            currentStreak: 1,
            lastActiveDate: today,
          },
        });
      }
    }
  },
};
