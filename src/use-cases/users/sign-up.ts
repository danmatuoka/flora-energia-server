import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface SignUpUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

interface SignUpUseCaseResponse {
  user: User;
}

export class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    username,
    email,
    password,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password: password_hash,
    });

    return {
      user,
    };
  }
}
