import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateCode as MsgMigrateCode_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
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

  public static fromAmino(
    data: MsgMigrateCode.Amino,
    isClassic?: boolean
  ): MsgMigrateCode {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { sender, code_id, wasm_byte_code },
    } = data;
    return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
  }

  public toAmino(isClassic?: boolean): MsgMigrateCode.Amino {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
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

  public static fromProto(
    proto: MsgMigrateCode.Proto,
    isClassic?: boolean
  ): MsgMigrateCode {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgMigrateCode(
      proto.sender,
      proto.codeId.toNumber(),
      Buffer.from(proto.wasmByteCode).toString('base64')
    );
  }

  public toProto(isClassic?: boolean): MsgMigrateCode.Proto {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { sender, code_id, wasm_byte_code } = this;
    return MsgMigrateCode_legacy_pb.fromPartial({
      codeId: Long.fromNumber(code_id),
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgMigrateCode',
      value: MsgMigrateCode_legacy_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgMigrateCode {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgMigrateCode.fromProto(
      MsgMigrateCode_legacy_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgMigrateCode.Data,
    isClassic?: boolean
  ): MsgMigrateCode {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { sender, code_id, wasm_byte_code } = data;
    return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
  }

  public toData(isClassic?: boolean): MsgMigrateCode.Data {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
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

  export type Proto = MsgMigrateCode_legacy_pb;
}
