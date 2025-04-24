import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  FindManyOptions
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {
    // Empty constructor: dependencies are injected here.
    // No additional logic is executed to keep single responsibility.
  }

  async findAll(
    page = 1,
    limit = 10,
    options?: FindManyOptions<T>
  ): Promise<[T[], number]> {
    const response = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      ...options
    });
    return response;
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

  async search(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }
}
