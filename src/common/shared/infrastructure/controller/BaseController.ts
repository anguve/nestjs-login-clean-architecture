import { BaseResponseDto } from '@common/shared/dto/base-response.dto';

export abstract class BaseController {
  protected createResponse<T>(data: T, message: string): BaseResponseDto<T> {
    return new BaseResponseDto(data, message);
  }
}
