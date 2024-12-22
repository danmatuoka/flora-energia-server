import { prisma } from '@/lib/prisma';
import { UserWordRepository } from '../user-word-repository';

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
}
