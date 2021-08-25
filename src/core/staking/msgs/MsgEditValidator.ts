import { JSONSerializable } from '../../../util/json';
import { Dec, Int } from '../../numeric';
import { ValAddress } from '../../bech32';
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
    public description: Validator.Description,
    public validator_address: ValAddress,
    public commission_rate?: Dec,
    public min_self_delegation?: Int
  ) {
    super();
  }

  public static fromData(data: MsgEditValidator.Data): MsgEditValidator {
    const {
      value: {
        description,
        validator_address,
        commission_rate,
        min_self_delegation,
      },
    } = data;
    return new MsgEditValidator(
      Validator.Description.fromData(description),
      validator_address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toData(): MsgEditValidator.Data {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return {
      type: 'staking/MsgEditValidator',
      value: {
        description,
        validator_address,
        commission_rate: commission_rate
          ? commission_rate.toString()
          : undefined,
        min_self_delegation: min_self_delegation
          ? min_self_delegation.toString()
          : undefined,
      },
    };
  }

  public static fromProto(data: MsgEditValidator.Proto): MsgEditValidator {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = data;
    return new MsgEditValidator(
      Validator.Description.fromData(description),
      validator_address,
      commission_rate ? new Dec(commission_rate) : undefined,
      min_self_delegation ? new Int(min_self_delegation) : undefined
    );
  }

  public toProto(): MsgEditValidator.Proto {
    const {
      description,
      validator_address,
      commission_rate,
      min_self_delegation,
    } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgEditValidator',
      description,
      validator_address,
      commission_rate: commission_rate
        ? commission_rate.toString()
        : undefined,
      min_self_delegation: min_self_delegation
        ? min_self_delegation.toString()
        : undefined,
    };
  }
}

export namespace MsgEditValidator {
  export const DESC_DO_NOT_MODIFY: Validator.Description.Data = {
    moniker: '[do-not-modify]',
    website: '[do-not-modify]',
    identity: '[do-not-modify]',
    details: '[do-not-modify]',
    security_contact: '[do-not-modify]',
  };

  export interface Data {
    type: 'staking/MsgEditValidator';
    value: {
      description: Validator.Description.Data;
      validator_address: ValAddress;
      commission_rate?: string;
      min_self_delegation?: string;
    };
  }

  export interface Proto {
    '@type': '/cosmos.staking.v1beta1.MsgEditValidator';
    description: Validator.Description.Data;
    validator_address: ValAddress;
    commission_rate?: string;
    min_self_delegation?: string;
  }
}
