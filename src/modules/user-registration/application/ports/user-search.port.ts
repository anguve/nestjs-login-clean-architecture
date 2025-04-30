import { UserSearchDto } from '@user-registration/application/dto/user-search.dto';
import { UserSearchResponse } from '@user-registration/application/types/user-search-response';

export const USER_SEARCH_PORT: unique symbol = Symbol('USER_SEARCH_PORT');

export interface UserSearchPort {
  execute(data: UserSearchDto): Promise<UserSearchResponse>;
}
