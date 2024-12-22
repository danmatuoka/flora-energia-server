import { prisma } from '@/lib/prisma';
import { FavoriteWordRepository } from '../favorite-word-repository';
import { UserFavorite } from '@prisma/client';

export class PrismaFavoriteWordRepository implements FavoriteWordRepository {
  async addToFavorite(word: string, userId: string): Promise<UserFavorite> {
    return await prisma.userFavorite.create({
      data: {
        word,
        userId,
      },
    });
  }
  async removeFromFavorite(
    word: string,
    userId: string,
  ): Promise<UserFavorite> {
    const wordId = await this.findById(word, userId);

    if (wordId) {
      return await prisma.userFavorite.delete({
        where: {
          id: wordId.id,
        },
      });
    }
  }

  async findById(word: string, userId: string): Promise<UserFavorite | null> {
    const favorite = await prisma.userFavorite.findFirst({
      where: {
        AND: [
          {
            word,
          },
          {
            userId,
          },
        ],
      },
    });

    return favorite;
  }

  async getAllFavorites(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{ words: UserFavorite[]; total: number }> {
    const words = await prisma.userFavorite.findMany({
      where: {
        userId,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        favoritedAt: 'asc',
      },
    });

    const total = await prisma.userFavorite.count({
      where: {
        userId,
      },
    });

    return { words, total };
  }
}
