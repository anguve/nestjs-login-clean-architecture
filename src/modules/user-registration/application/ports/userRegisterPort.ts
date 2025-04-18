import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import { UserRegisterResponse } from '@user-registration/application/types/UserRegisterResponse';

export const USER_REGISTER_PORT: unique symbol = Symbol('USER_REGISTER_PORT');

export interface UserRegisterPort {
  execute(data: UserRegisterDto): Promise<UserRegisterResponse>;
}
