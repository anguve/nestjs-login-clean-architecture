import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class BaseUserDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'The name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'The last name cannot be empty' })
  lastName: string;

  @IsEmail({}, { message: 'The email must be a valid email address.' })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  email: string;

  @IsNotEmpty({ message: 'The password cannot be empty.' })
  password: string;
}
