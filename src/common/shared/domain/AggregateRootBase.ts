// src/common/shared/domain/AggregateRootBase.ts

import { v4 as uuidv4 } from 'uuid';
import { DomainEventBase } from './events/IDomainEvent';

export abstract class AggregateRootBase<TId = string> {
  protected readonly _id: TId;
  private readonly _domainEvents: DomainEventBase[] = [];

  constructor(id?: TId) {
    this._id = id ?? (uuidv4() as unknown as TId);
  }

  get id(): TId {
    return this._id;
  }

  /**
   * Agrega un evento de dominio para que luego sea publicado.
   */
  protected addDomainEvent(event: DomainEventBase): void {
    this._domainEvents.push(event);
  }

  /**
   * Limpia todos los eventos registrados (usualmente después de ser publicados).
   */
  clearDomainEvents(): void {
    this._domainEvents.length = 0;
  }

  /**
   * Retorna todos los eventos generados hasta ahora.
   */
  get domainEvents(): DomainEventBase[] {
    return this._domainEvents;
  }
}
