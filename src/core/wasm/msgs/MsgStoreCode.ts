import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';

export class MsgStoreCode extends JSONSerializable<MsgStoreCode.Data> {
  /**
   * @param sender contract creator
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
      type: 'wasm/StoreCode',
      value: {
        sender,
        wasm_byte_code,
      },
    };
  }
}

export namespace MsgStoreCode {
  export interface Data {
    type: 'wasm/StoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }
}
