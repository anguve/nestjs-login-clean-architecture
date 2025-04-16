export const USER_GET_ALL_PORT = Symbol('USER_GET_ALL_PORT');

export interface UserGetAllPort {
  execute(): Promise<any>;
}
