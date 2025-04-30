import { LoginUserDto } from '@auth/application/dto/login-user.dto';
import { LoginResponse } from '@auth/application/types/login-response';

export const LOGIN_PORT: unique symbol = Symbol('LOGIN_PORT');

export interface LoginPort {
  /**
   * Executes the login process using the provided user credentials.
   * @param data - DTO containing the login credentials .
   * @returns A promise resolving with the login response containing tokens or user info.
   */
  execute(data: LoginUserDto): Promise<LoginResponse>;
}
