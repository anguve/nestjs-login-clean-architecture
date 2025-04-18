import { PickType } from '@nestjs/mapped-types';
import { BaseUserDto } from '@user-registration/application/dto/base-user.dto';

export class UserRegisterDto extends PickType(BaseUserDto, [
  'email',
  'password',
  'name',
  'lastName'
] as const) {}
