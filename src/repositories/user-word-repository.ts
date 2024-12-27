import { UserWord } from '@prisma/client';

export interface UserWordRepository {
  create(data: { word: string; userId: string }): Promise<UserWord>;
  findOneWord(word: string, userId: string): Promise<UserWord | null>;
  getAllUserWords(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{ words: UserWord[]; total: number }>;
}
