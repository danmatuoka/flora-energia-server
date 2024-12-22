import { PrismaUserWordRepository } from '@/repositories/prisma/prisma-user-word-repository';
import { AxiosDictionaryRepository } from '@/repositories/axios/axios-dictionary-repository';
import { GetWordDetailsUseCase } from '../get-word-details';

export function makeGetWordDetailsUseCase() {
  const userWordRepository = new PrismaUserWordRepository();
  const dictionaryRepository = new AxiosDictionaryRepository();

  const getWordDetailsUseCase = new GetWordDetailsUseCase(
    userWordRepository,
    dictionaryRepository,
  );

  return getWordDetailsUseCase;
}
