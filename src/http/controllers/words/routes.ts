import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { words } from './words';
import { wordDetails } from './words-details';
import { favoriteWord } from './favorite-word';
import { unfavoriteWord } from './unfavorite-word';

export async function wordsRoutes(app: FastifyInstance) {
  app.get('/entries/en', words);
  app.get('/entries/en/:word', { onRequest: [verifyJwt] }, wordDetails);
  app.post(
    '/entries/en/:word/favorite',
    { onRequest: [verifyJwt] },
    favoriteWord,
  );
  app.delete(
    '/entries/en/:word/unfavorite',
    { onRequest: [verifyJwt] },
    unfavoriteWord,
  );
}
