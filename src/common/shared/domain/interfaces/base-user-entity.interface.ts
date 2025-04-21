export interface BaseUserEntityProps {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
