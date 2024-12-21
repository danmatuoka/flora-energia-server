import { FastifyInstance } from 'fastify';

import { signUp } from './sign-up';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth/signup', signUp);
}
