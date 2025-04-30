import { Inject, Injectable } from '@nestjs/common';
import { UserGetAllPort } from '@user-registration/application/ports/user-get-all.port';
import { UserGetAllResponse } from '@user-registration/application/types/user-get-all-response';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';
import { UserGetAllAggregateRoot } from '@user-registration/domain/aggregates/user-get-all.aggregate-root';

@Injectable()
export class UserGetAllUseCase implements UserGetAllPort {
  /**
   * Constructs the use case with the injected user repository dependency.
   *
   * @param userRepository - The repository used to retrieve user data.
   */
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    /* Empty constructor: dependencies are injected here.
     No additional logic is executed to keep single responsibility. */
  }
  /**
   * Executes the use case to retrieve paginated user data.
   *
   * @param page - The current page number.
   * @param limit - The maximum number of items per page.
   * @returns A response object containing users and pagination metadata.
   */
  async execute(page: number, limit: number): Promise<UserGetAllResponse> {
    const userGetAllAggregateRoot = new UserGetAllAggregateRoot({
      page,
      limit
    });
    const response = await this.getAllUserDB(
      userGetAllAggregateRoot.getPage() ?? 0,
      userGetAllAggregateRoot.getLimit() ?? 0
    );
    return {
      users: response.users,
      meta: response.meta
    };
  }
  /**
   * Fetches the user data from the repository using pagination.
   *
   * @param page - The page number to retrieve.
   * @param limit - The number of items per page.
   * @returns A paginated list of users and metadata.
   */
  private async getAllUserDB(page: number, limit: number) {
    return this.userRepository.getAll(page, limit);
  }
}
