import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@auth/domain/repositories/IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {}
