import { UserSearchDto } from '@user-registration/application/dto/UserSearchDto';
import { UserSearchResponse } from '@user-registration/application/types/UserSearchResponse';

export const USER_SEARCH_PORT: unique symbol = Symbol('USER_SEARCH_PORT');

export interface UserSearchPort {
  execute(data: UserSearchDto): Promise<UserSearchResponse>;
}
