import { AggregateRootBase } from '@common/shared/domain/aggregate-root.base';
import { VOEmail } from '@common/shared/domain/value-objects/vo-email';
import { VOPassword } from '@common/shared/domain/value-objects/vo-password';
import { VOUuid } from '@common/shared/domain/value-objects/vo-uuid';
import { VOName } from '@user-registration/domain/value-objects/vo-name';
import { VOLastName } from '@user-registration/domain/value-objects/vo-last-name';
import { IPrimitivesRegister } from '@user-registration/domain/interfaces/primitives-register.interface';

export class UserRegisterAggregateRoot extends AggregateRootBase<VOUuid> {
  private readonly email: VOEmail;
  private readonly name: VOName;
  private readonly lastName: VOLastName;
  private readonly password: VOPassword;
  /**
   * Creates an instance of UserRegisterAggregateRoot.
   * @param props Object containing email, name,lastName and password strings.
   */
  constructor(props: {
    email: string;
    name: string;
    lastName: string;
    password: string;
  }) {
    super();
    this.email = new VOEmail(props.email);
    this.name = new VOName(props.name);
    this.lastName = new VOLastName(props.lastName);
    this.password = new VOPassword(props.password);
  }
  /**
   * Converts the aggregate root to primitive values.
   *
   * @returns The primitive representation of the user.
   */
  public toPrimitives(): IPrimitivesRegister {
    return {
      email: this.getEmail() ?? '',
      name: this.getName() ?? '',
      lastName: this.getLastName() ?? '',
      password: this.getPassword() ?? ''
    };
  }
  /**
   * Gets the user identifier.
   *
   * @returns The user's ID or undefined.
   */
  public getId(): string | undefined {
    return this.id.value;
  }
  /**
   * Gets the user's password.
   *
   * @returns The user's password or undefined.
   */
  public getPassword(): string | undefined {
    return this.password.value;
  }
  /**
   * Gets the user's email.
   *
   * @returns The user's email or undefined.
   */
  public getEmail(): string | undefined {
    return this.email.value;
  }
  /**
   * Gets the user's first name.
   *
   * @returns The user's name or undefined.
   */
  public getName(): string | undefined {
    return this.name.value;
  }
  /**
   * Gets the user's last name.
   *
   * @returns The user's last name or undefined.
   */
  public getLastName(): string | undefined {
    return this.lastName.value;
  }
}
