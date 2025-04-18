import { PickType } from '@nestjs/mapped-types';
import { BaseUserDto } from '@user-registration/application/dto/base-user.dto';

export class UserDeleteDto extends PickType(BaseUserDto, ['id'] as const) {}
