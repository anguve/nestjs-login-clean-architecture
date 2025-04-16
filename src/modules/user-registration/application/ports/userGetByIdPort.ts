export const USER_GET_BY_ID_PORT = Symbol('USER_GET_BY_ID_PORT');

export interface UserGetByIdPort {
  execute(data: any): Promise<any>;
}
