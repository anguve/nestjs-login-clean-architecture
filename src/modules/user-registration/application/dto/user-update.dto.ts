import { IsNotEmpty } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class UserUpdateDto {
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: BaseUserDto['email'];

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: BaseUserDto['name'];

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: BaseUserDto['lastName'];
}
