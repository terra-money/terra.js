import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

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

  public static fromProto(data: MsgMigrateCode.Proto): MsgMigrateCode {
    const { sender, code_id, wasm_byte_code } = data;
    return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
  }

  public toProto(): MsgMigrateCode.Proto {
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
  export interface Data {
    type: 'wasm/MsgMigrateCode';
    value: {
      code_id: string;
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }

  export interface Proto {
    '@type': '/terra.wasm.v1beta1.MsgMigrateCode';
    code_id: string;
    sender: AccAddress;
    wasm_byte_code: string;
  }
}
