import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgBeginRedelegate as MsgBeginRedelegate_pb } from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/tx_pb';

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

  public static fromProto(proto: MsgBeginRedelegate.Proto): MsgBeginRedelegate {
    return new MsgBeginRedelegate(
      proto.getDelegatorAddress(),
      proto.getValidatorSrcAddress(),
      proto.getValidatorDstAddress(),
      Coin.fromProto(proto.getAmount() as Coin.Proto)
    );
  }

  public toProto(): MsgBeginRedelegate.Proto {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    const msgBeginRedelegateProto = new MsgBeginRedelegate_pb();
    msgBeginRedelegateProto.setDelegatorAddress(delegator_address);
    msgBeginRedelegateProto.setValidatorDstAddress(validator_dst_address);
    msgBeginRedelegateProto.setValidatorSrcAddress(validator_src_address);
    msgBeginRedelegateProto.setAmount(amount.toProto());
    return msgBeginRedelegateProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.staking.v1beta1.MsgBeginRedelegate');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgBeginRedelegate {
    return MsgBeginRedelegate.fromProto(
      MsgBeginRedelegate_pb.deserializeBinary(msgAny.getValue_asU8())
    );
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

  export type Proto = MsgBeginRedelegate_pb;
}
