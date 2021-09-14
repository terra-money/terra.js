import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgBeginRedelegate as MsgBeginRedelegate_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
export class MsgBeginRedelegate extends JSONSerializable<
  MsgBeginRedelegate.Amino,
  MsgBeginRedelegate.Data,
  MsgBeginRedelegate.Proto
> {
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

  public static fromAmino(data: MsgBeginRedelegate.Amino): MsgBeginRedelegate {
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
      Coin.fromAmino(amount)
    );
  }

  public toAmino(): MsgBeginRedelegate.Amino {
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
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(data: MsgBeginRedelegate.Data): MsgBeginRedelegate {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
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
      '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount: amount.toData(),
    };
  }

  public static fromProto(proto: MsgBeginRedelegate.Proto): MsgBeginRedelegate {
    return new MsgBeginRedelegate(
      proto.delegatorAddress,
      proto.validatorSrcAddress,
      proto.validatorDstAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(): MsgBeginRedelegate.Proto {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      amount,
    } = this;
    return MsgBeginRedelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorDstAddress: validator_dst_address,
      validatorSrcAddress: validator_src_address,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      value: MsgBeginRedelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgBeginRedelegate {
    return MsgBeginRedelegate.fromProto(
      MsgBeginRedelegate_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgBeginRedelegate {
  export interface Amino {
    type: 'staking/MsgBeginRedelegate';
    value: {
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
      amount: Coin.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate';
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    amount: Coin.Data;
  }

  export type Proto = MsgBeginRedelegate_pb;
}
