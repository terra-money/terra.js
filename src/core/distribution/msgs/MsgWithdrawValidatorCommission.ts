import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgWithdrawValidatorCommission extends JSONSerializable<MsgWithdrawValidatorCommission.Data> {
  /**
   * @param validator_address validator's operator address
   */
  constructor(public validator_address: ValAddress) {
    super();
  }

  public static fromData(
    data: MsgWithdrawValidatorCommission.Data
  ): MsgWithdrawValidatorCommission {
    const {
      value: { validator_address },
    } = data;
    return new MsgWithdrawValidatorCommission(validator_address);
  }

  public toData(): MsgWithdrawValidatorCommission.Data {
    const { validator_address } = this;
    return {
      type: 'distribution/MsgWithdrawValidatorCommission',
      value: {
        validator_address,
      },
    };
  }
}

export namespace MsgWithdrawValidatorCommission {
  export interface Data {
    type: 'distribution/MsgWithdrawValidatorCommission';
    value: {
      validator_address: ValAddress;
    };
  }
}
