import { prisma } from '@/lib/prisma';

import { WordsRepository } from '../words-repository';

export class PrismaWordsRepository implements WordsRepository {
  async findByWord(word: string, limit: number, page: number) {
    const words = await prisma.word.findMany({
      where: {
        word: {
          startsWith: word,
        },
      },
      take: limit,
      skip: limit * page,
      orderBy: {
        word: 'asc',
      },
    });

    const total = await prisma.word.count({
      where: {
        word: {
          startsWith: word,
        },
      },
    });

    return { words, total };
  }
}
