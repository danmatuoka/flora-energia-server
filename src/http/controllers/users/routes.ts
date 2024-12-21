import { FastifyInstance } from 'fastify';

import { signUp } from './sign-up';
import { signIn } from './sign-in';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth/signup', signUp);
  app.post('/auth/signin', signIn);
}
