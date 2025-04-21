import { BaseUserEntityProps } from '@src/common/shared/domain/interfaces/base-user-entity.interface';

export type LoginUserEntityProps = Pick<
  BaseUserEntityProps,
  'id' | 'password' | 'isActive' | 'isDeleted'
>;
