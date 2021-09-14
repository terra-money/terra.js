import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateCode as MsgMigrateCode_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';
import * as Long from 'long';

export class MsgMigrateCode extends JSONSerializable<
  MsgMigrateCode.Amino,
  MsgMigrateCode.Data,
  MsgMigrateCode.Proto
> {
  /**
   * @param sender code migrator address
   * @param code_id reference to the code on the blockchain
   * @param wasm_byte_code base64-encoded bytecode contents
   */
  constructor(
    public sender: AccAddress,
    public code_id: number,
    public wasm_byte_code: string
  ) {
    super();
  }

  public static fromAmino(data: MsgMigrateCode.Amino): MsgMigrateCode {
    const {
      value: { sender, code_id, wasm_byte_code },
    } = data;
    return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
  }

  public toAmino(): MsgMigrateCode.Amino {
    const { sender, code_id, wasm_byte_code } = this;
    return {
      type: 'wasm/MsgMigrateCode',
      value: {
        sender,
        code_id: code_id.toFixed(),
        wasm_byte_code,
      },
    };
  }

  public static fromProto(proto: MsgMigrateCode.Proto): MsgMigrateCode {
    return new MsgMigrateCode(
      proto.sender,
      proto.codeId.toNumber(),
      Buffer.from(proto.wasmByteCode).toString('base64')
    );
  }

  public toProto(): MsgMigrateCode.Proto {
    const { sender, code_id, wasm_byte_code } = this;
    return MsgMigrateCode_pb.fromPartial({
      codeId: Long.fromNumber(code_id),
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgMigrateCode',
      value: MsgMigrateCode_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgMigrateCode {
    return MsgMigrateCode.fromProto(MsgMigrateCode_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgMigrateCode.Data): MsgMigrateCode {
    const { sender, code_id, wasm_byte_code } = data;
    return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
  }

  public toData(): MsgMigrateCode.Data {
    const { sender, code_id, wasm_byte_code } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgMigrateCode',
      sender,
      code_id: code_id.toFixed(),
      wasm_byte_code,
    };
  }
}

export namespace MsgMigrateCode {
  export interface Amino {
    type: 'wasm/MsgMigrateCode';
    value: {
      code_id: string;
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }

  export interface Data {
    '@type': '/terra.wasm.v1beta1.MsgMigrateCode';
    code_id: string;
    sender: AccAddress;
    wasm_byte_code: string;
  }

  export type Proto = MsgMigrateCode_pb;
}
