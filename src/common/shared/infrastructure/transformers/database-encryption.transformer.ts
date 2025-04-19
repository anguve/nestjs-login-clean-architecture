import crypto from 'node:crypto';
import { ValueTransformer } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { IPasswordHasherPort } from '@common/shared/domain/ports/password-hasher.port';

export class DatabaseEncryptionTransformer
  implements ValueTransformer, IPasswordHasherPort
{
  private readonly algorithm = 'aes-256-ctr';
  private readonly ivLength = 16;

  constructor(private readonly secretKey: string) {
    if (!secretKey || secretKey.length !== 64) {
      throw new InternalServerErrorException(
        'Encryption key must be a 64-character hexadecimal string (256 bits).'
      );
    }
  }

  to(value: string): string {
    if (!value) {
      return value;
    }

    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.secretKey, 'hex'),
      iv
    );
    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  from(value: string): string {
    if (!value) {
      return value;
    }

    const [ivHex, encryptedHex] = value.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey, 'hex'),
      iv
    );
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final()
    ]);
    return decrypted.toString();
  }
}
