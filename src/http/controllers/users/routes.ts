import { FastifyInstance } from 'fastify';

import { signUp } from './sign-up';
import { signIn } from './sign-in';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { profile } from './profile';
import { favoriteWords } from './favorite-words';
import { historyWords } from './history-words';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth/signup', signUp);
  app.post('/auth/signin', signIn);
  app.get('/user/me', { onRequest: [verifyJwt] }, profile);
  app.get('/user/me/favorite', { onRequest: [verifyJwt] }, favoriteWords);
  app.get('/user/me/history', { onRequest: [verifyJwt] }, historyWords);
}
