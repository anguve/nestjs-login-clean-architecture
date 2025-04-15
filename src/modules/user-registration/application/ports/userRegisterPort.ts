import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import { UserRegisterResponse } from '../types/UserRegisterResponse';

export const USER_REGISTER_PORT = Symbol('USER_REGISTER_PORT');

export interface UserRegisterPort {
  execute(data: UserRegisterDto): Promise<UserRegisterResponse>;
}
