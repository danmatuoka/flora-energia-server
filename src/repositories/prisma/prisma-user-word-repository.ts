import { prisma } from '@/lib/prisma';
import { UserWordRepository } from '../user-word-repository';
import { UserWord } from '@prisma/client';

export class PrismaUserWordRepository implements UserWordRepository {
  async create(data: { word: string; userId: string }) {
    const userWord = await prisma.userWord.create({
      data: {
        word: data.word,
        userId: data.userId,
      },
    });

    return userWord;
  }

  async getAllUserWords(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{ words: UserWord[]; total: number }> {
    const words = await prisma.userWord.findMany({
      where: {
        userId,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        viewedAt: 'asc',
      },
    });

    const total = await prisma.userWord.count({
      where: {
        userId,
      },
    });

    return { words, total };
  }
}
