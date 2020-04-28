import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgModifyWithdrawAddress extends JSONSerializable<
  MsgModifyWithdrawAddress.Data
> {
  /**
   * @param delegator_address delegator's account address
   * @param withdraw_address desired new withdraw address
   */
  constructor(
    public delegator_address: AccAddress,
    public withdraw_address: AccAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgModifyWithdrawAddress.Data
  ): MsgModifyWithdrawAddress {
    const {
      value: { delegator_address, withdraw_address },
    } = data;
    return new MsgModifyWithdrawAddress(delegator_address, withdraw_address);
  }

  public toData(): MsgModifyWithdrawAddress.Data {
    const { delegator_address, withdraw_address } = this;
    return {
      type: 'distribution/MsgModifyWithdrawAddress',
      value: {
        delegator_address,
        withdraw_address,
      },
    };
  }
}

export namespace MsgModifyWithdrawAddress {
  export interface Data {
    type: 'distribution/MsgModifyWithdrawAddress';
    value: {
      delegator_address: AccAddress;
      withdraw_address: AccAddress;
    };
  }
}
