import { paginationMapper } from '../utils/paginationMapper';
import { UserWord } from '@prisma/client';
import { UserWordRepository } from '@/repositories/user-word-repository';

interface GetHistoryWordsUseCaseRequest {
  userId: string;
  limit: number;
  page: number;
}

interface GetHistoryWordsUseCaseResponse {
  results: { word: string; added: Date }[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class GetHistoryWordsUseCase {
  constructor(private userWordsRepository: UserWordRepository) { }

  async execute({
    userId,
    limit,
    page,
  }: GetHistoryWordsUseCaseRequest): Promise<GetHistoryWordsUseCaseResponse> {
    const words = await this.userWordsRepository.getAllUserWords(
      userId,
      limit,
      page,
    );

    const pagination = paginationMapper({ limit, total: words.total, page });

    return {
      results: words.words?.map((item: UserWord) => ({
        word: item.word,
        added: item.viewedAt,
      })),
      ...pagination,
    };
  }
}
