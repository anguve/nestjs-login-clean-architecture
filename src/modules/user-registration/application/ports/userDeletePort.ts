import { UserDeleteDto } from '@user-registration/application/dto/UserDeleteDto';
import { UserDeleteResponse } from '@user-registration/application/types/UserDeleteResponse';

export const USER_DELETE_PORT: unique symbol = Symbol('USER_DELETE_PORT');

export interface UserDeletePort {
  execute(data: UserDeleteDto): Promise<UserDeleteResponse>;
}
