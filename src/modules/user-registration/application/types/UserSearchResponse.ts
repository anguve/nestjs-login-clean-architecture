import { UserEntity } from '@auth/domain/entities/UserEntity';

export interface UserSearchResponse {
  users: UserEntity[];
}
