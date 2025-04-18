import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterResponse } from '@user-registration/application/types/user-register-response';

export const USER_REGISTER_PORT: unique symbol = Symbol('USER_REGISTER_PORT');

export interface UserRegisterPort {
  execute(data: UserRegisterDto): Promise<UserRegisterResponse>;
}
