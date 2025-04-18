export const USER_GET_ALL_PORT: unique symbol = Symbol('USER_GET_ALL_PORT');

export interface UserGetAllPort {
  execute(): Promise<any>;
}
