import { UserRegisterUserEntity } from '@user-registration/domain/entities/user-register-user.entity';

export interface UserSearchResponse {
  users: UserRegisterUserEntity[];
}
