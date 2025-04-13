import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IPasswordHasherPort } from '@common/shared/domain/ports/IPasswordHasherPort';

@Injectable()
export class BcryptPasswordHasherAdapter implements IPasswordHasherPort {
  async hash(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
