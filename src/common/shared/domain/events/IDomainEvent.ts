// src/common/shared/domain/events/DomainEventBase.ts

export abstract class DomainEventBase {
  readonly occurredOn: Date;

  constructor() {
    this.occurredOn = new Date();
  }

  /**
   * Nombre único del evento, útil para logs, handlers, colas, etc.
   */
  abstract eventName(): string;
}
