import { IsOptional } from 'class-validator';
import { BaseUserDto } from '@user-registration/application/dto/base-user.dto';

export class UserSearchDto {
  @IsOptional()
  name?: BaseUserDto['name'];

  @IsOptional()
  lastName?: BaseUserDto['lastName'];

  @IsOptional()
  email?: BaseUserDto['email'];
}
