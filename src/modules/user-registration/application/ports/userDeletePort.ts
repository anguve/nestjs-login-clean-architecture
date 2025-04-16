export const USER_DELETE_PORT = Symbol('USER_DELETE_PORT');

export interface UserDeletePort {
  execute(data: any): Promise<any>;
}
