import { makeFavoriteWordUseCase } from '@/use-cases/words/factories/make-favorite-word-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function favoriteWord(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchWordsQuerySchema = z.object({
    word: z.string(),
  });

  const { word } = searchWordsQuerySchema.parse(request.params);

  const favoriteWordUseCase = makeFavoriteWordUseCase();

  const words = await favoriteWordUseCase.execute({
    word,
    userId: request.user.sub,
  });

  return reply.status(200).send(words);
}
