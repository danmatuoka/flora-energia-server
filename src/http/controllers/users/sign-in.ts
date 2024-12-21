import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSignInUseCase } from '@/use-cases/users/factories/make-signin-use-case';
import { InvalidCredentialsError } from '@/use-cases/users/errors/invalid-credentials-error';
import { generateJwtToken } from '@/http/helpers/generate-jwt';

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = signInBodySchema.parse(request.body);

  try {
    const signInUseCase = makeSignInUseCase();

    const { user } = await signInUseCase.execute({
      email,
      password,
    });

    const token = await generateJwtToken(reply, { sub: user.id });

    return reply.status(200).send({
      id: user.id,
      name: user.username,
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
