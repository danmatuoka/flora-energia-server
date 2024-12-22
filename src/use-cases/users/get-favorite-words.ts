import { paginationMapper } from '../utils/paginationMapper';
import { UserFavorite } from '@prisma/client';
import { FavoriteWordRepository } from '@/repositories/favorite-word-repository';

interface GetFavoriteWordsUseCaseRequest {
  userId: string;
  limit: number;
  page: number;
}

interface GetFavoriteWordsUseCaseResponse {
  results: { word: string; added: Date }[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class GetFavoriteWordsUseCase {
  constructor(private favoriteWordsRepository: FavoriteWordRepository) { }

  async execute({
    userId,
    limit,
    page,
  }: GetFavoriteWordsUseCaseRequest): Promise<GetFavoriteWordsUseCaseResponse> {
    const words = await this.favoriteWordsRepository.getAllFavorites(
      userId,
      limit,
      page,
    );

    const pagination = paginationMapper({ limit, total: words.total, page });

    return {
      results: words.words?.map((item: UserFavorite) => ({
        word: item.word,
        added: item.favoritedAt,
      })),
      ...pagination,
    };
  }
}
