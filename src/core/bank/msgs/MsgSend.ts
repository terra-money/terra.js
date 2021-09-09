import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgSend as MsgSend_pb } from '@terra-money/terra.proto/src/cosmos/bank/v1beta1/tx_pb';

/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export class MsgSend extends JSONSerializable<MsgSend.Data> {
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

  public static fromData(data: MsgSend.Data): MsgSend {
    const {
      value: { from_address, to_address, amount },
    } = data;
    return new MsgSend(from_address, to_address, Coins.fromData(amount));
  }

  public toData(): MsgSend.Data {
    const { from_address, to_address, amount } = this;
    return {
      type: 'bank/MsgSend',
      value: {
        from_address,
        to_address,
        amount: amount.toData(),
      },
    };
  }

  public static fromProto(proto: MsgSend.Proto): MsgSend {
    return new MsgSend(
      proto.getFromAddress(),
      proto.getToAddress(),
      Coins.fromProto(proto.getAmountList())
    );
  }

  public toProto(): MsgSend.Proto {
    const { from_address, to_address, amount } = this;
    const msgSendProto = new MsgSend_pb();
    msgSendProto.setFromAddress(from_address);
    msgSendProto.setToAddress(to_address);
    msgSendProto.setAmountList(amount.toProto());
    return msgSendProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.bank.v1beta1.MsgSend');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgSend {
    return MsgSend.fromProto(
      MsgSend_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgSend {
  export interface Data {
    type: 'bank/MsgSend';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Data;
    };
  }

  export type Proto = MsgSend_pb;
}
