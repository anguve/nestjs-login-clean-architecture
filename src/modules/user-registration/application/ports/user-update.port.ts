import { UserUpdateDto } from '@user-registration/application/dto/user-update.dto';
import { UserUpdateResponse } from '@user-registration/application/types/user-update-response';

export const USER_UPDATE_PORT: unique symbol = Symbol('USER_UPDATE_PORT');

export interface UserUpdatePort {
  execute(data: UserUpdateDto): Promise<UserUpdateResponse>;
}
