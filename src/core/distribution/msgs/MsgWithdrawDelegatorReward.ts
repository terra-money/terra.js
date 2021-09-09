import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgWithdrawDelegatorReward as MsgWithdrawDelegatorReward_pb } from '@terra-money/terra.proto/src/cosmos/distribution/v1beta1/tx_pb';

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
      proto.getDelegatorAddress(),
      proto.getValidatorAddress()
    );
  }

  public toProto(): MsgWithdrawDelegatorReward.Proto {
    const { delegator_address, validator_address } = this;
    const msgWithdrawDelegatorRewardProto = new MsgWithdrawDelegatorReward_pb();
    msgWithdrawDelegatorRewardProto.setDelegatorAddress(delegator_address);
    msgWithdrawDelegatorRewardProto.setValidatorAddress(validator_address);
    return msgWithdrawDelegatorRewardProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl(
      '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
    );
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgWithdrawDelegatorReward {
    return MsgWithdrawDelegatorReward.fromProto(
      MsgWithdrawDelegatorReward_pb.deserializeBinary(msgAny.getValue_asU8())
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
