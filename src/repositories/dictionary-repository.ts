import { DictionaryResponse } from './types/ApiResponse';

export interface DictionaryRepository {
  getWordDetails(data: { word: string }): Promise<DictionaryResponse>;
}
