import { JSONSerializable } from '../../../util/json';
import { Dec, Int } from '../../numeric';
import { ValAddress } from '../../strings';
import { Validator } from '../Validator';

/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
export class MsgEditValidator extends JSONSerializable<MsgEditValidator.Data> {
  /**
   * @param Description new description to apply
   * @param address new address to apply
   * @param commission_rate new commission rates to apply
   * @param min_self_delegation new min self delegation
   */
  constructor(
    public Description: Validator.Description,
    public address: ValAddress,
    public commission_rate?: Dec,
    public min_self_delegation?: Int
  ) {
    super();
  }

  public static fromData(data: MsgEditValidator.Data): MsgEditValidator {
    const {
      value: { Description, address, commission_rate, min_self_delegation },
    } = data;
    return new MsgEditValidator(
      Description,
      address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toData(): MsgEditValidator.Data {
    const { Description, address, commission_rate, min_self_delegation } = this;
    return {
      type: 'staking/MsgEditValidator',
      value: {
        Description,
        address,
        commission_rate: commission_rate ? commission_rate.toString() : null,
        min_self_delegation: min_self_delegation
          ? min_self_delegation.toString()
          : null,
      },
    };
  }
}

export namespace MsgEditValidator {
  export const DESC_DO_NOT_MODIFY: Validator.Description = {
    moniker: '[do-not-modify]',
    website: '[do-not-modify]',
    identity: '[do-not-modify]',
    details: '[do-not-modify]',
    security_contact: '[do-not-modify]',
  };

  export interface Data {
    type: 'staking/MsgEditValidator';
    value: {
      Description: any;
      address: ValAddress;
      commission_rate: string | null;
      min_self_delegation: string | null;
    };
  }
}
