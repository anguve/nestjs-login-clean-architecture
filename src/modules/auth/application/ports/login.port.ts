import { LoginUserDto } from '@auth/application/dto/login-user.dto';
import { LoginResponse } from '@auth/application/types/login-response';

export const LOGIN_PORT: unique symbol = Symbol('LOGIN_PORT');

export interface LoginPort {
  execute(data: LoginUserDto): Promise<LoginResponse>;
}
