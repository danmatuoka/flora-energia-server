import { makeGetHistoryWordsUseCase } from '@/use-cases/users/factories/make-get-history-words-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function historyWords(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchWordsQuerySchema = z.object({
    limit: z.coerce.number().min(1).default(5),
    page: z.coerce.number().min(1).default(1),
  });

  const { limit, page } = searchWordsQuerySchema.parse(request.query);

  const getHistoryWordsUseCase = makeGetHistoryWordsUseCase();

  const words = await getHistoryWordsUseCase.execute({
    userId: request.user.sub,
    limit,
    page,
  });

  return reply.status(200).send(words);
}
