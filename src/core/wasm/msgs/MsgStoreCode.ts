import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgStoreCode as MsgStoreCode_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgStoreCode extends JSONSerializable<MsgStoreCode.Data> {
  /**
   * @param sender code creator
   * @param wasm_byte_code base64-encoded bytecode contents
   */
  constructor(public sender: AccAddress, public wasm_byte_code: string) {
    super();
  }

  public static fromData(data: MsgStoreCode.Data): MsgStoreCode {
    const {
      value: { sender, wasm_byte_code },
    } = data;
    return new MsgStoreCode(sender, wasm_byte_code);
  }

  public toData(): MsgStoreCode.Data {
    const { sender, wasm_byte_code } = this;
    return {
      type: 'wasm/MsgStoreCode',
      value: {
        sender,
        wasm_byte_code,
      },
    };
  }

  public static fromProto(proto: MsgStoreCode.Proto): MsgStoreCode {
    return new MsgStoreCode(proto.getSender(), proto.getWasmByteCode_asB64());
  }

  public toProto(): MsgStoreCode.Proto {
    const { sender, wasm_byte_code } = this;
    const msgStoreCodeProto = new MsgStoreCode_pb();
    msgStoreCodeProto.setSender(sender);
    msgStoreCodeProto.setWasmByteCode(wasm_byte_code);
    return msgStoreCodeProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgStoreCode');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgStoreCode {
    return MsgStoreCode.fromProto(
      MsgStoreCode_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgStoreCode {
  export interface Data {
    type: 'wasm/MsgStoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }

  export type Proto = MsgStoreCode_pb;
}
