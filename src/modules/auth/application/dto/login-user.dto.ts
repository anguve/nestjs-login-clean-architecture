import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  @IsNotEmpty({ message: 'The email cannot be empty.' })
  email: string;

  @IsNotEmpty({ message: 'The password cannot be empty.' })
  password: string;
}
