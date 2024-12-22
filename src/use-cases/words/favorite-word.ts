import { UserFavorite } from '@prisma/client';
import { FavoriteWordRepository } from '@/repositories/favorite-word-repository';

interface GetWordsUseCaseRequest {
  word: string;
  userId: string;
}

export class FavoriteWordUseCase {
  constructor(private favoriteWordsRepository: FavoriteWordRepository) { }

  async execute({
    word,
    userId,
  }: GetWordsUseCaseRequest): Promise<UserFavorite> {
    const favorite = await this.favoriteWordsRepository.addToFavorite(
      word,
      userId,
    );

    return favorite;
  }
}
