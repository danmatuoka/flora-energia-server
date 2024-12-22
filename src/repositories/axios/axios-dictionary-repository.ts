import { AxiosError } from 'axios';
import { DictionaryRepository } from '../dictionary-repository';
import { dictionaryClient } from '@/apis/config/axios-client';
import { WordDoNotExistsError } from '@/use-cases/words/errors/word-do-not-exists-error';

export class AxiosDictionaryRepository implements DictionaryRepository {
  private api = dictionaryClient;

  async getWordDetails(data: { word: string }): Promise<any> {
    try {
      const response = await this.api.get(`/${data.word}`);

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new WordDoNotExistsError();
      }
    }
  }
}
