import { IsNotEmpty } from 'class-validator';

export class UserGetByIdDto {
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id: string;
}
