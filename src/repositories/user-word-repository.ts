import { UserWord } from '@prisma/client';

export interface UserWordRepository {
  create(data: { word: string; userId: string }): Promise<UserWord>;
}
