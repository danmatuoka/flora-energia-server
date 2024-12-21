import { FastifyInstance } from 'fastify';

import { signUp } from './sign-up';
import { signIn } from './sign-in';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { profile } from './profile';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth/signup', signUp);
  app.post('/auth/signin', signIn);
  app.get('/user/me', { onRequest: [verifyJwt] }, profile);
}
