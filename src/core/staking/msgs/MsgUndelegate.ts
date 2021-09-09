import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgUndelegate as MsgUndelegate_pb } from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/tx_pb';

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

  public static fromProto(proto: MsgUndelegate.Proto): MsgUndelegate {
    return new MsgUndelegate(
      proto.getDelegatorAddress(),
      proto.getValidatorAddress(),
      Coin.fromProto(proto.getAmount() as Coin.Proto)
    );
  }

  public toProto(): MsgUndelegate.Proto {
    const { delegator_address, validator_address, amount } = this;
    const msgUndelegateProto = new MsgUndelegate_pb();
    msgUndelegateProto.setDelegatorAddress(delegator_address);
    msgUndelegateProto.setValidatorAddress(validator_address);
    msgUndelegateProto.setAmount(amount.toProto());
    return msgUndelegateProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.staking.v1beta1.MsgUndelegate');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgUndelegate {
    return MsgUndelegate.fromProto(
      MsgUndelegate_pb.deserializeBinary(msgAny.getValue_asU8())
    );
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

  export type Proto = MsgUndelegate_pb;
}
