import { PrismaWordsRepository } from '@/repositories/prisma/prisma-words-repository';
import { GetWordsUseCase } from '../get-words';

export function makeGetWordsUseCase() {
  const wordsRepository = new PrismaWordsRepository();
  const getWordsUseCase = new GetWordsUseCase(wordsRepository);

  return getWordsUseCase;
}
