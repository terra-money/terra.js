import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';

/**
 * A delegator can undelegate an amount of bonded Luna, and will begin the unbonding
 * process for those funds. The unbonding process takes 21 days to complete, during
 * which the Luna cannot be transacted or swapped.
 */
export class MsgUndelegate extends JSONSerializable<MsgUndelegate.Data> {
  /**
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount Luna to be undelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromData(data: MsgUndelegate.Data): MsgUndelegate {
    const {
      value: { delegator_address, validator_address, amount },
    } = data;
    return new MsgUndelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(): MsgUndelegate.Data {
    const { delegator_address, validator_address, amount } = this;
    return {
      type: 'staking/MsgUndelegate',
      value: {
        delegator_address,
        validator_address,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgUndelegate {
  export interface Data {
    type: 'staking/MsgUndelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Data;
    };
  }
}
