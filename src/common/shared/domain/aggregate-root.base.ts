import { v4 as uuidv4 } from 'uuid';
import { DomainEventBase } from './events/base-domain-event.interface';

export class AggregateRootBase<TId = string> {
  private readonly _id: TId;
  private readonly _domainEvents: DomainEventBase[] = [];

  constructor(id?: TId) {
    this._id = id ?? (uuidv4() as unknown as TId);
  }

  get id(): TId {
    return this._id;
  }

  protected addDomainEvent(event: DomainEventBase): void {
    this._domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  get domainEvents(): DomainEventBase[] {
    return this._domainEvents;
  }
}
