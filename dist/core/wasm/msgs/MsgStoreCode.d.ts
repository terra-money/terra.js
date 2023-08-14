import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCode_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgStoreCode as MsgStoreCode_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import { AccessConfig } from '../AccessConfig';
export declare class MsgStoreCode extends JSONSerializable<MsgStoreCode.Amino, MsgStoreCode.Data, MsgStoreCode.Proto> {
    sender: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig | undefined;
    /**
     * @param sender code creator
     * @param wasm_byte_code base64-encoded bytecode contents
     * @param instantiate_permission  InstantiatePermission access control to apply on contract creation, optional. v2 supported only
     */
    constructor(sender: AccAddress, wasm_byte_code: string, instantiate_permission?: AccessConfig | undefined);
    static fromAmino(data: MsgStoreCode.AminoV2 | MsgStoreCode.AminoV1, _?: boolean): MsgStoreCode;
    toAmino(_?: boolean): MsgStoreCode.AminoV2;
    static fromProto(proto: MsgStoreCode.Proto, _?: boolean): MsgStoreCode;
    toProto(_?: boolean): MsgStoreCode.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgStoreCode;
    static fromData(data: MsgStoreCode.DataV2 | MsgStoreCode.DataV1, _?: boolean): MsgStoreCode;
    toData(_?: boolean): MsgStoreCode.Data;
}
export declare namespace MsgStoreCode {
    interface AminoV1 {
        type: 'wasm/MsgStoreCode';
        value: {
            sender: AccAddress;
            wasm_byte_code: string;
        };
    }
    interface AminoV2 {
        type: 'wasm/MsgStoreCode';
        value: {
            sender: AccAddress;
            wasm_byte_code: string;
            instantiate_permission?: AccessConfig.Amino;
        };
    }
    type Amino = AminoV1 | AminoV2;
    interface DataV1 {
        '@type': '/terra.wasm.v1beta1.MsgStoreCode';
        sender: AccAddress;
        wasm_byte_code: string;
    }
    interface DataV2 {
        '@type': '/cosmwasm.wasm.v1.MsgStoreCode';
        sender: AccAddress;
        wasm_byte_code: string;
        instantiate_permission?: AccessConfig.Data;
    }
    type Data = DataV1 | DataV2;
    type Proto = MsgStoreCode_legacy_pb | MsgStoreCode_pb;
}
