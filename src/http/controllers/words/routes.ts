import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { words } from './words';

export async function wordsRoutes(app: FastifyInstance) {
  app.get('/entries/en', words);
}
