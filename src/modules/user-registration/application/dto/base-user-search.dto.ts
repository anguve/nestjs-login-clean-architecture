import { IsOptional } from 'class-validator';

export class BaseUserSearchDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  email?: string;
}
