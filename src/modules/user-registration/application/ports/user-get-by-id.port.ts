import { UserGetByIdResponse } from '@user-registration/application/types/user-get-by-id-response';
import { UserGetByIdDto } from '@user-registration/application/dto/user-get-by-id.dto';

export const USER_GET_BY_ID_PORT: unique symbol = Symbol('USER_GET_BY_ID_PORT');

export interface UserGetByIdPort {
  execute(data: UserGetByIdDto): Promise<UserGetByIdResponse>;
}
