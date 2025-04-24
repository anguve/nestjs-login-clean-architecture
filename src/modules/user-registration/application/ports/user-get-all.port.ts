import { UserGetAllResponse } from '@user-registration/application/types/user-get-all-response';

export const USER_GET_ALL_PORT: unique symbol = Symbol('USER_GET_ALL_PORT');

export interface UserGetAllPort {
  /**
   * Executes the use case to retrieve a paginated list of users.
   *
   * This method initializes the aggregate root with the given pagination parameters,
   * delegates the data fetching to the repository, and returns the formatted response.
   *
   * @param page - The current page number to retrieve.
   * @param limit - The maximum number of users to retrieve per page.
   * @returns A promise that resolves with the list of users and associated metadata.
   */
  execute(page: number, limit: number): Promise<UserGetAllResponse>;
}
