import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateCode as MsgMigrateCode_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
export declare class MsgMigrateCode extends JSONSerializable<MsgMigrateCode.Amino, MsgMigrateCode.Data, MsgMigrateCode.Proto> {
    sender: AccAddress;
    code_id: number;
    wasm_byte_code: string;
    /**
     * @param sender code migrator address
     * @param code_id reference to the code on the blockchain
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    constructor(sender: AccAddress, code_id: number, wasm_byte_code: string);
    static fromAmino(_data: MsgMigrateCode.Amino, _?: boolean): MsgMigrateCode;
    toAmino(_?: boolean): MsgMigrateCode.Amino;
    static fromProto(_proto: MsgMigrateCode.Proto, _?: boolean): MsgMigrateCode;
    toProto(_?: boolean): MsgMigrateCode.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(_msgAny: Any, _?: boolean): MsgMigrateCode;
    static fromData(_data: MsgMigrateCode.Data, _?: boolean): MsgMigrateCode;
    toData(_?: boolean): MsgMigrateCode.Data;
}
export declare namespace MsgMigrateCode {
    interface Amino {
        type: 'wasm/MsgMigrateCode';
        value: {
            code_id: string;
            sender: AccAddress;
            wasm_byte_code: string;
        };
    }
    interface Data {
        '@type': '/terra.wasm.v1beta1.MsgMigrateCode';
        code_id: string;
        sender: AccAddress;
        wasm_byte_code: string;
    }
    type Proto = MsgMigrateCode_legacy_pb;
}
