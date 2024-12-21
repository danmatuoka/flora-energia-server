import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from '@/use-cases/users/errors/user-already-exists-error';
import { generateJwtToken } from '@/http/helpers/generate-jwt';
import { makeSignUpUseCase } from '@/use-cases/users/factories/make-signup-use-case';

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(request.body);

  try {
    const signUpUseCase = makeSignUpUseCase();

    const { user } = await signUpUseCase.execute({
      username,
      email,
      password,
    });

    const token = await generateJwtToken(reply, { sub: user.id });

    return reply.status(200).send({ id: user.id, name: user.username, token });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
