import { PrismaUserWordRepository } from '@/repositories/prisma/prisma-user-word-repository';
import { GetHistoryWordsUseCase } from '../get-history-words';

export function makeGetHistoryWordsUseCase() {
  const wordsRepository = new PrismaUserWordRepository();
  const getWordsUseCase = new GetHistoryWordsUseCase(wordsRepository);

  return getWordsUseCase;
}
