import { FastifyReply } from 'fastify';

export async function generateJwtToken(
  reply: FastifyReply,
  options: { sub: string },
): Promise<string> {
  return await reply.jwtSign({ sub: options.sub });
}
