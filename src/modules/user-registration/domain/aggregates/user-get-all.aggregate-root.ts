import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOUuid } from '@common/shared/domain/value-objects/vo-uuid';
import { VOQueryLimit } from '@src/common/shared/domain/value-objects/vo-query-limit';
import { VOQueryPage } from '@src/common/shared/domain/value-objects/vo-query-page';
import { IPrimitivesGetAll } from '../interfaces/primitives-get-all.interface';

export class UserGetAllAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly limit?: VOQueryLimit;
  private readonly page?: VOQueryPage;

  constructor(props: { limit: number; page: number }) {
    super();
    this.limit = new VOQueryLimit(props.limit);
    this.page = new VOQueryPage(props.page);
  }

  public toPrimitives(): IPrimitivesGetAll {
    return {
      limit: this.getLimit(),
      page: this.getPage()
    };
  }

  public getLimit(): number | undefined {
    return this.limit?.value;
  }

  public getPage(): number | undefined {
    return this.page?.value;
  }
}
