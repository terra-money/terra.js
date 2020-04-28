import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';

/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export class MsgWithdrawDelegationReward extends JSONSerializable<
  MsgWithdrawDelegationReward.Data
> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgWithdrawDelegationReward.Data
  ): MsgWithdrawDelegationReward {
    const {
      value: { delegator_address, validator_address },
    } = data;
    return new MsgWithdrawDelegationReward(
      delegator_address,
      validator_address
    );
  }

  public toData(): MsgWithdrawDelegationReward.Data {
    const { delegator_address, validator_address } = this;
    return {
      type: 'distribution/MsgWithdrawDelegationReward',
      value: {
        delegator_address,
        validator_address,
      },
    };
  }
}

export namespace MsgWithdrawDelegationReward {
  export interface Data {
    type: 'distribution/MsgWithdrawDelegationReward';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
    };
  }
}
