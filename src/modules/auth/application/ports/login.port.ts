import { LoginUserDto } from '@auth/application/dto/LoginUserDto';
import { LoginResponse } from '@auth/application/types/LoginResponse';

export const LOGIN_PORT = Symbol('LOGIN_PORT');

export interface LoginPort {
  execute(data: LoginUserDto): Promise<LoginResponse>;
}
