import { PrismaFavoriteWordRepository } from '@/repositories/prisma/prisma-favorite-word-repository';
import { FavoriteWordUseCase } from '../favorite-word';

export function makeFavoriteWordUseCase() {
  const wordsRepository = new PrismaFavoriteWordRepository();
  const favoriteWordsUseCase = new FavoriteWordUseCase(wordsRepository);

  return favoriteWordsUseCase;
}
