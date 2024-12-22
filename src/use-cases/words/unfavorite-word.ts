import { UserFavorite } from '@prisma/client';
import { FavoriteWordRepository } from '@/repositories/favorite-word-repository';

interface GetWordsUseCaseRequest {
  word: string;
  userId: string;
}

export class UnfavoriteWordUseCase {
  constructor(private favoriteWordsRepository: FavoriteWordRepository) { }

  async execute({
    word,
    userId,
  }: GetWordsUseCaseRequest): Promise<UserFavorite> {
    const favorite = await this.favoriteWordsRepository.removeFromFavorite(
      word,
      userId,
    );

    return favorite;
  }
}
