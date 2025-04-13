import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  DataSource,
  EntityTarget,
  ObjectLiteral
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryPort } from '@common/shared/domain/repositories/BaseRepositoryPort';

@Injectable()
export class BaseRepository<T extends ObjectLiteral>
  implements BaseRepositoryPort<T>
{
  protected readonly repository: Repository<T>;

  constructor(
    protected readonly dataSource: DataSource,
    private readonly entity: EntityTarget<T>
  ) {
    this.repository = this.dataSource.getRepository(this.entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOneById(id: number | string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as any
    });
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where });
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create(data as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async update(id: number | string, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return this.findOneById(id) as Promise<T>;
  }

  async delete(id: number | string): Promise<void> {
    await this.repository.delete(id);
  }
}
