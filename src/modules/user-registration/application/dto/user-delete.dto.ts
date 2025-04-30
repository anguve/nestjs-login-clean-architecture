import { PickType } from '@nestjs/mapped-types';
import { BaseUserDto } from '@user-registration/application/dto/base-user.dto';

export class UserDeleteDto extends PickType(BaseUserDto, ['id'] as const) {
  /**
   * This DTO is used to delete a user.
   * It includes only the 'id' property inherited from BaseUserDto.
   */
}
