import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// there's no difference between two protos
//import { MsgSend as MsgSend_legacy_pb } from '@terra-money/legacy.proto/cosmos/bank/v1beta1/tx';
import { MsgSend as MsgSend_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/tx';

/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export class MsgSend extends JSONSerializable<
  MsgSend.Amino,
  MsgSend.Data,
  MsgSend.Proto
> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromAmino(data: MsgSend.Amino, _?: boolean): MsgSend {
    _;
    const {
      value: { from_address, to_address, amount },
    } = data;
    return new MsgSend(from_address, to_address, Coins.fromAmino(amount));
  }

  public toAmino(isClassic?: boolean): MsgSend.Amino {
    const { from_address, to_address, amount } = this;
    return {
      type: isClassic ? 'bank/MsgSend' : 'cosmos-sdk/MsgSend',
      value: {
        from_address,
        to_address,
        amount: amount.toAmino(),
      },
    };
  }

  public static fromData(data: MsgSend.Data, isClassic?: boolean): MsgSend {
    isClassic;
    const { from_address, to_address, amount } = data;

    return new MsgSend(from_address, to_address, Coins.fromData(amount));
  }

  public toData(_?: boolean): MsgSend.Data {
    _;
    const { from_address, to_address, amount } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address,
      to_address,
      amount: amount.toData(),
    };
  }

  public static fromProto(proto: MsgSend.Proto, _?: boolean): MsgSend {
    _;
    return new MsgSend(
      proto.fromAddress,
      proto.toAddress,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(_?: boolean): MsgSend.Proto {
    _;
    const { from_address, to_address, amount } = this;
    return MsgSend_pb.fromPartial({
      fromAddress: from_address,
      toAddress: to_address,
      amount: amount.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: MsgSend_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgSend {
    return MsgSend.fromProto(MsgSend_pb.decode(msgAny.value), isClassic);
  }
}

export namespace MsgSend {
  export interface Amino {
    type: 'bank/MsgSend' | 'cosmos-sdk/MsgSend';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgSend';
    from_address: AccAddress;
    to_address: AccAddress;
    amount: Coins.Data;
  }

  export type Proto = MsgSend_pb;
}
