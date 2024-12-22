// import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { WordsRepository } from '@/repositories/words-repository';
import { paginationMapper } from '../utils/paginationMapper';
import { Word } from '@prisma/client';

interface GetWordsUseCaseRequest {
  word: string;
  limit: number;
  page: number;
}

interface GetWordsUseCaseResponse {
  results: string[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class GetWordsUseCase {
  constructor(private wordsRepository: WordsRepository) { }

  async execute({
    word,
    limit,
    page,
  }: GetWordsUseCaseRequest): Promise<GetWordsUseCaseResponse> {
    const words = await this.wordsRepository.findByWord(word, limit, page);

    const pagination = paginationMapper({ limit, total: words.total, page });

    return {
      results: words.words?.map((item: Word) => item.word),
      ...pagination,
    };
  }
}
