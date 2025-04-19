import { IsNotEmpty } from 'class-validator';
import { BaseUserDto } from '@user-registration/application/dto/base-user.dto';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: BaseUserDto['email'];

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: BaseUserDto['password'];

  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: BaseUserDto['name'];

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: BaseUserDto['lastName'];
}
