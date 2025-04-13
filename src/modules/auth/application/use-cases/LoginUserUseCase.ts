import { Inject, Injectable } from '@nestjs/common';
import { LoginPort } from '@auth/application/ports/login.port';
import { LoginUserDto } from '@auth/application/dto/LoginUserDto';
import { LoginResponse } from '@auth/application/types/LoginResponse';
import { VOEmail } from '@auth/domain/value-objects/VOEmail';
import { VOPassword } from '@auth/domain/value-objects/VOPassword';
import {
  I_USER_REPOSITORY,
  IUserRepository
} from '@auth/domain/repositories/IUserRepository';

@Injectable()
export class LoginUserUseCase implements LoginPort {
  constructor(
    @Inject(I_USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) {}

  async execute(data: LoginUserDto): Promise<LoginResponse> {
    const email = new VOEmail(data.email);
    const password = new VOPassword(data.password);

    const user = await this.userRepository.findByEmail(email.getValue());

    console.log(user?.email);

    if (!user) {
      console.log(user);
    }

    if (!password) {
      console.log(password);
    }

    return {
      success: true,
      message: 'hola',
      token: 'hola'
    };
  }
}
