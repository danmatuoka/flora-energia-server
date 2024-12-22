import { UserWordRepository } from '@/repositories/user-word-repository';
import { DictionaryRepository } from '@/repositories/dictionary-repository';
import { DictionaryResponse } from '@/repositories/types/ApiResponse';

interface GetWordsUseCaseRequest {
  word: string;
  userId: string;
}

export class GetWordDetailsUseCase {
  constructor(
    private userWordRepository: UserWordRepository,
    private dictionaryRepository: DictionaryRepository,
  ) { }

  async execute({
    word,
    userId,
  }: GetWordsUseCaseRequest): Promise<DictionaryResponse> {
    const wordDetails = await this.dictionaryRepository.getWordDetails({
      word,
    });

    await this.userWordRepository.create({
      word,
      userId,
    });

    return wordDetails;
  }
}
