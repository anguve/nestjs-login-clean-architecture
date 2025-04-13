import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class RegisterUsersController {
  constructor() {}

  @Post('register')
  register() {}
}
