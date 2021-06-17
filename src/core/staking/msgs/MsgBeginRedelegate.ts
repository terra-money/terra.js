import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress, ValAddress } from '../../bech32';

/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
export class MsgBeginRedelegate extends JSONSerializable<MsgBeginRedelegate.Data> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_src_address validator to undelegate from
   * @param validator_dst_address validator to delegate to
   * @param amount LUNA to be redelegated
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_src_address: ValAddress,
    public validator_dst_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromData(data: MsgBeginRedelegate.Data): MsgBeginRedelegate {
    const {
      value: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount,
      },
    } = data;
    return new MsgBeginRedelegate(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      Coin.fromData(amount)
    );
  }

  public toData(): MsgBeginRedelegate.Data {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return {
      type: 'staking/MsgBeginRedelegate',
      value: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgBeginRedelegate {
  export interface Data {
    type: 'staking/MsgBeginRedelegate';
    value: {
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
      amount: Coin.Data;
    };
  }
}
