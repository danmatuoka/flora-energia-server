import { WordDoNotExistsError } from '@/use-cases/words/errors/word-do-not-exists-error';
import { makeGetWordDetailsUseCase } from '@/use-cases/words/factories/make-get-word-details-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function wordDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchWordsQuerySchema = z.object({
    word: z.string(),
  });

  const { word } = searchWordsQuerySchema.parse(request.params);

  try {
    const getWordDetailsUseCase = makeGetWordDetailsUseCase();

    const words = await getWordDetailsUseCase.execute({
      word,
      userId: request.user.sub,
    });

    return reply.status(200).send(words);
  } catch (err) {
    if (err instanceof WordDoNotExistsError) {
      return reply.status(400).send({ message: err.message });
    }
  }
}
