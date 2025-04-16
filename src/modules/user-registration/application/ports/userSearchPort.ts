export const USER_SEARCH_PORT = Symbol('USER_SEARCH_PORT');

export interface UserSearchPort {
  execute(data: any): Promise<any>;
}
