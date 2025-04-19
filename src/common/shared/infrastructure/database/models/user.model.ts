import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';
import { DatabaseEncryptionTransformer } from '@common/shared/infrastructure/transformers/database-encryption.transformer';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';

@Entity('users')
export class UserModel extends BaseModel {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({
    transformer: new DatabaseEncryptionTransformer(
      validatedEnvVars.ENCRYPTION_KEY
    )
  })
  password: string;
}
