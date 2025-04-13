import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral
} from 'typeorm';
import { IBaseRepositoryPort } from '@common/shared/domain/ports/IBaseRepositoryPort';

export class BaseRepository<T extends ObjectLiteral>
  implements IBaseRepositoryPort<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOneById(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id: id as NonNullable<T['id']> }
    });
  }
  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data);
    return this.findOneById(id) as Promise<T>;
  }

  async delete(id: number | string): Promise<void> {
    await this.repository.delete(id);
  }
}
