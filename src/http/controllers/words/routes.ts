import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { words } from './words';
import { wordDetails } from './words-details';

export async function wordsRoutes(app: FastifyInstance) {
  app.get('/entries/en', words);
  app.get('/entries/en/:word', { onRequest: [verifyJwt] }, wordDetails);
}
