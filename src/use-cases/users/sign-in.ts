import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface SignInUseCaseRequest {
  email: string;
  password: string;
}

interface SignInUseCaseResponse {
  user: User;
}

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
