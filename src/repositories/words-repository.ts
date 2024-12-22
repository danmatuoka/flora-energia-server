import { Word } from '@prisma/client';

export interface WordsRepository {
  findByWord(
    word: string,
    limit: number,
    page: number,
  ): Promise<{ words: Word[]; total: number }>;
}
