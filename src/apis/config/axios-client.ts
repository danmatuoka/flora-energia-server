import { env } from '@/env';
import axios from 'axios';

export const dictionaryClient = axios.create({
  baseURL: env.DICTIONARY_BASE_URL,
});
