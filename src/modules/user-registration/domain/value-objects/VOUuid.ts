import { VOBaseString } from '@common/shared/domain/value-objects/VOString';
import { validate as uuidValidate } from 'uuid';

export class VOUuid extends VOBaseString {
  constructor(uuid: string) {
    super(uuid);

    if (!this.isValidUuid(uuid)) {
      throw new Error('El UUID proporcionado no es válido.');
    }
  }

  private isValidUuid(uuid: string): boolean {
    return uuidValidate(uuid);
  }
}
