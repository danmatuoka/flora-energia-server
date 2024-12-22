import { GetFavoriteWordsUseCase } from '../get-favorite-words';
import { PrismaFavoriteWordRepository } from '@/repositories/prisma/prisma-favorite-word-repository';

export function makeGetFavoriteWordsUseCase() {
  const wordsRepository = new PrismaFavoriteWordRepository();
  const getWordsUseCase = new GetFavoriteWordsUseCase(wordsRepository);

  return getWordsUseCase;
}
