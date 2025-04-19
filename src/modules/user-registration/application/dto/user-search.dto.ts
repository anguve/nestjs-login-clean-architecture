import { IsOptional } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class UserSearchDto {
  @IsOptional()
  name?: BaseUserDto['name'];

  @IsOptional()
  lastName?: BaseUserDto['lastName'];

  @IsOptional()
  email?: BaseUserDto['email'];
}
