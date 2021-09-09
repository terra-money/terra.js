import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgMigrateCode as MsgMigrateCode_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgMigrateCode extends JSONSerializable<MsgMigrateCode.Data> {
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

  public static fromData(data: MsgMigrateCode.Data): MsgMigrateCode {
    const {
      value: { sender, code_id, wasm_byte_code },
    } = data;
    return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
  }

  public toData(): MsgMigrateCode.Data {
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
      proto.getSender(),
      proto.getCodeId(),
      proto.getWasmByteCode_asB64()
    );
  }

  public toProto(): MsgMigrateCode.Proto {
    const { sender, code_id, wasm_byte_code } = this;
    const msgMigrateCodeProto = new MsgMigrateCode_pb();
    msgMigrateCodeProto.setSender(sender);
    msgMigrateCodeProto.setCodeId(code_id);
    msgMigrateCodeProto.setWasmByteCode(wasm_byte_code);
    return msgMigrateCodeProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgMigrateCode');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgMigrateCode {
    return MsgMigrateCode.fromProto(
      MsgMigrateCode_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgMigrateCode {
  export interface Data {
    type: 'wasm/MsgMigrateCode';
    value: {
      code_id: string;
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }

  export type Proto = MsgMigrateCode_pb;
}
