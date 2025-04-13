export interface BaseRepositoryPort<T> {
  findAll(): Promise<T[]>;
  findOneById(id: number | string): Promise<T | null>;
  findOne(where: Partial<T>): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number | string, data: Partial<T>): Promise<T>;
  delete(id: number | string): Promise<void>;
}
