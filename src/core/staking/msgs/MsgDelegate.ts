import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';

/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export class MsgDelegate extends JSONSerializable<MsgDelegate.Data> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount amount of LUNA to be sent for delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromData(data: MsgDelegate.Data): MsgDelegate {
    const {
      value: { delegator_address, validator_address, amount },
    } = data;
    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(): MsgDelegate.Data {
    const { delegator_address, validator_address, amount } = this;
    return {
      type: 'staking/MsgDelegate',
      value: {
        delegator_address,
        validator_address,
        amount: amount.toData(),
      },
    };
  }

  public static fromProto(data: MsgDelegate.Proto): MsgDelegate {
    const {
      delegator_address, validator_address, amount
    } = data;
    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toProto(): MsgDelegate.Proto {
    const { delegator_address, validator_address, amount } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.MsgDelegate',
      delegator_address,
      validator_address,
      amount: amount.toData(),
    };
  }
}

export namespace MsgDelegate {
  export interface Data {
    type: 'staking/MsgDelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Data;
    };
  }

  export interface Proto {
    '@type': '/cosmos.staking.v1beta1.MsgDelegate';
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin.Data;
  }
}
