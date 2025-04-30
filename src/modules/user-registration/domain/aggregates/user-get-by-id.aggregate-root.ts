import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';

import { VOUuid } from '@common/shared/domain/value-objects/vo-uuid';

export class UserGetByIdAggregateRoot extends AggregateRootBase<VOUuid> {
  constructor(props: { id: string }) {
    super(props.id ? new VOUuid(props.id) : undefined);
  }

  public toPrimitives(): string {
    return this.getId() ?? '';
  }

  public getId(): string | undefined {
    return this.id.value;
  }
}
