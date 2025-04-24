export class BaseResponseDto<T> {
  message: string;
  success: boolean;
  data?: T;

  constructor(data?: T, message = '') {
    this.message = message;
    this.success = true;
    this.data = data;
  }
}
