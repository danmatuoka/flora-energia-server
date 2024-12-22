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
}
