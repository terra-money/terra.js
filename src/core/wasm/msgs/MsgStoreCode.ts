import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCode_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';

export class MsgStoreCode extends JSONSerializable<
  MsgStoreCode.Amino,
  MsgStoreCode.Data,
  MsgStoreCode.Proto
> {
  /**
   * @param sender code creator
   * @param wasm_byte_code base64-encoded bytecode contents
   */
  constructor(public sender: AccAddress, public wasm_byte_code: string) {
    super();
  }

  public static fromAmino(data: MsgStoreCode.Amino): MsgStoreCode {
    const {
      value: { sender, wasm_byte_code },
    } = data;
    return new MsgStoreCode(sender, wasm_byte_code);
  }

  public toAmino(): MsgStoreCode.Amino {
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
    return new MsgStoreCode(
      proto.sender,
      Buffer.from(proto.wasmByteCode).toString('base64')
    );
  }

  public toProto(): MsgStoreCode.Proto {
    const { sender, wasm_byte_code } = this;
    return MsgStoreCode_pb.fromPartial({
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgStoreCode',
      value: MsgStoreCode_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgStoreCode {
    return MsgStoreCode.fromProto(MsgStoreCode_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgStoreCode.Data): MsgStoreCode {
    const { sender, wasm_byte_code } = data;
    return new MsgStoreCode(sender, wasm_byte_code);
  }

  public toData(): MsgStoreCode.Data {
    const { sender, wasm_byte_code } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgStoreCode',
      sender,
      wasm_byte_code,
    };
  }
}

export namespace MsgStoreCode {
  export interface Amino {
    type: 'wasm/MsgStoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }

  export interface Data {
    '@type': '/terra.wasm.v1beta1.MsgStoreCode';
    sender: AccAddress;
    wasm_byte_code: string;
  }

  export type Proto = MsgStoreCode_pb;
}
