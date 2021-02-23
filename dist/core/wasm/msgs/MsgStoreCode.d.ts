import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
export declare class MsgStoreCode extends JSONSerializable<MsgStoreCode.Data> {
    sender: AccAddress;
    wasm_byte_code: string;
    /**
     * @param sender contract creator
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    constructor(sender: AccAddress, wasm_byte_code: string);
    static fromData(data: MsgStoreCode.Data): MsgStoreCode;
    toData(): MsgStoreCode.Data;
}
export declare namespace MsgStoreCode {
    interface Data {
        type: 'wasm/MsgStoreCode';
        value: {
            sender: AccAddress;
            wasm_byte_code: string;
        };
    }
}
