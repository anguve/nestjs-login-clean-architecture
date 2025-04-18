import { UserRegisterUserEntity } from '../../domain/entities/user-register-user.entity';

export interface UserSearchResponse {
  users: UserRegisterUserEntity[];
}
