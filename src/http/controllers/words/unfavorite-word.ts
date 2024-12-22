import { makeUnfavoriteWordUseCase } from '@/use-cases/words/factories/make-unfavorite-word-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function unfavoriteWord(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchWordsQuerySchema = z.object({
    word: z.string(),
  });

  const { word } = searchWordsQuerySchema.parse(request.params);

  const unfavoriteWordUseCase = makeUnfavoriteWordUseCase();

  const words = await unfavoriteWordUseCase.execute({
    word,
    userId: request.user.sub,
  });

  return reply.status(200).send(words);
}
