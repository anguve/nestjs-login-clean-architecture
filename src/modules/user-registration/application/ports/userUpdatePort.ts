export const USER_UPDATE_PORT: unique symbol = Symbol('USER_UPDATE_PORT');

export interface UserUpdatePort {
  execute(id: string, data: any): Promise<any>;
}
