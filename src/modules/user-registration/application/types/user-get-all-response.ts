import { UserRegisterUserEntity } from '@user-registration/domain/entities/user-register-user.entity';
export interface UserGetAllResponse {
  users: UserRegisterUserEntity[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
