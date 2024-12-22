import { UserFavorite } from '@prisma/client';

export interface FavoriteWordRepository {
  addToFavorite(word: string, userId: string): Promise<UserFavorite>;
  removeFromFavorite(word: string, userId: string): Promise<UserFavorite>;
  findById(wordId: string, userId: string): Promise<UserFavorite | null>;
}
