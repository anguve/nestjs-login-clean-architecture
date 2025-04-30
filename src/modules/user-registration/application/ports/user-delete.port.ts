import { UserDeleteDto } from '@user-registration/application/dto/user-delete.dto';
import { UserDeleteResponse } from '@user-registration/application/types/user-delete-response';

export const USER_DELETE_PORT: unique symbol = Symbol('USER_DELETE_PORT');

export interface UserDeletePort {
  execute(data: UserDeleteDto): Promise<UserDeleteResponse>;
}
