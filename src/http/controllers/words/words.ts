import { makeGetWordsUseCase } from '@/use-cases/words/factories/make-get-words-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function words(request: FastifyRequest, reply: FastifyReply) {
  const searchWordsQuerySchema = z.object({
    search: z.string().optional(),
    limit: z.coerce.number().min(1).default(5),
    page: z.coerce.number().min(1).default(1),
  });

  const { search, limit, page } = searchWordsQuerySchema.parse(request.query);

  const getWordsUseCase = makeGetWordsUseCase();

  const words = await getWordsUseCase.execute({
    word: search || '',
    limit,
    page,
  });

  return reply.status(200).send(words);
}
