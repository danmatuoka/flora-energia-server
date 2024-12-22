import { PrismaFavoriteWordRepository } from '@/repositories/prisma/prisma-favorite-word-repository';
import { UnfavoriteWordUseCase } from '../unfavorite-word';

export function makeUnfavoriteWordUseCase() {
  const wordsRepository = new PrismaFavoriteWordRepository();
  const favoriteWordsUseCase = new UnfavoriteWordUseCase(wordsRepository);

  return favoriteWordsUseCase;
}
