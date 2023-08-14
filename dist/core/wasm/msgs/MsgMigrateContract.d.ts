import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
export declare class MsgMigrateContract extends JSONSerializable<MsgMigrateContract.Amino, MsgMigrateContract.Data, MsgMigrateContract.Proto> {
    admin: AccAddress;
    contract: AccAddress;
    new_code_id: number;
    migrate_msg: object | string;
    /**
     * @param admin contract admin
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    constructor(admin: AccAddress, contract: AccAddress, new_code_id: number, migrate_msg: object | string);
    static fromAmino(data: MsgMigrateContract.Amino, _?: boolean): MsgMigrateContract;
    toAmino(_?: boolean): MsgMigrateContract.Amino;
    static fromProto(proto: MsgMigrateContract.Proto, _?: boolean): MsgMigrateContract;
    toProto(_?: boolean): MsgMigrateContract.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgMigrateContract;
    static fromData(data: MsgMigrateContract.Data, _?: boolean): MsgMigrateContract;
    toData(_?: boolean): MsgMigrateContract.Data;
}
export declare namespace MsgMigrateContract {
    interface AminoV1 {
        type: 'wasm/MsgMigrateContract';
        value: {
            admin: AccAddress;
            contract: AccAddress;
            new_code_id: string;
            migrate_msg: object | string;
        };
    }
    interface AminoV2 {
        type: 'wasm/MsgMigrateContract';
        value: {
            sender: AccAddress;
            contract: AccAddress;
            code_id: string;
            msg: object | string;
        };
    }
    interface DataV1 {
        '@type': '/terra.wasm.v1beta1.MsgMigrateContract';
        admin: AccAddress;
        contract: AccAddress;
        new_code_id: string;
        migrate_msg: object | string;
    }
    interface DataV2 {
        '@type': '/cosmwasm.wasm.v1.MsgMigrateContract';
        sender: AccAddress;
        contract: AccAddress;
        code_id: string;
        msg: object | string;
    }
    type Amino = AminoV1 | AminoV2;
    type Data = DataV1 | DataV2;
    type Proto = MsgMigrateContract_legacy_pb | MsgMigrateContract_pb;
}
