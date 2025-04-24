import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterResponse } from '@user-registration/application/types/user-register-response';

export const USER_REGISTER_PORT: unique symbol = Symbol('USER_REGISTER_PORT');

export interface UserRegisterPort {
  /**
   * Execute the user registration logic.
   *
   * @param data - User registration data (DTO).
   * @returns A promise resolving to the user registration response.
   */
  execute(data: UserRegisterDto): Promise<UserRegisterResponse>;
}
