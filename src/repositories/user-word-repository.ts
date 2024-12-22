import { UserWord } from '@prisma/client';

export interface UserWordRepository {
  create(data: { word: string; userId: string }): Promise<UserWord>;
  getAllUserWords(
    userId: string,
    limit: number,
    page: number,
  ): Promise<{ words: UserWord[]; total: number }>;
}
