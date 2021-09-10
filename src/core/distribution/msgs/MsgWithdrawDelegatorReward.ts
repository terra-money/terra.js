import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgWithdrawDelegatorReward as MsgWithdrawDelegatorReward_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';

/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export class MsgWithdrawDelegatorReward extends JSONSerializable<MsgWithdrawDelegatorReward.Data> {
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
    data: MsgWithdrawDelegatorReward.Data
  ): MsgWithdrawDelegatorReward {
    const {
      value: { delegator_address, validator_address },
    } = data;
    return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
  }

  public toData(): MsgWithdrawDelegatorReward.Data {
    const { delegator_address, validator_address } = this;
    return {
      type: 'distribution/MsgWithdrawDelegationReward',
      value: {
        delegator_address,
        validator_address,
      },
    };
  }

  public static fromProto(
    proto: MsgWithdrawDelegatorReward.Proto
  ): MsgWithdrawDelegatorReward {
    return new MsgWithdrawDelegatorReward(
      proto.delegatorAddress,
      proto.validatorAddress
    );
  }

  public toProto(): MsgWithdrawDelegatorReward.Proto {
    const { delegator_address, validator_address } = this;
    return MsgWithdrawDelegatorReward_pb.fromPartial({
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: MsgWithdrawDelegatorReward_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgWithdrawDelegatorReward {
    return MsgWithdrawDelegatorReward.fromProto(
      MsgWithdrawDelegatorReward_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgWithdrawDelegatorReward {
  export interface Data {
    type: 'distribution/MsgWithdrawDelegationReward';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
    };
  }

  export type Proto = MsgWithdrawDelegatorReward_pb;
}
