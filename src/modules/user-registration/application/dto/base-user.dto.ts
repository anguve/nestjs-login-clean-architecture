import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseUserDto {
  @IsOptional()
  @IsString({ message: 'El id debe ser una cadena de texto' })
  id?: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  lastName: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;
}
