import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MigrateContractProposal as MigrateContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
/** MigrateContractProposal gov proposal content type to migrate a contract. */
export declare class MigrateContractProposal extends JSONSerializable<MigrateContractProposal.Amino, MigrateContractProposal.Data, MigrateContractProposal.Proto> {
    title: string;
    description: string;
    contract: AccAddress;
    new_code_id: number;
    migrate_msg: object | string;
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    constructor(title: string, description: string, contract: AccAddress, new_code_id: number, migrate_msg: object | string);
    static fromAmino(data: MigrateContractProposal.Amino, _?: boolean): MigrateContractProposal;
    toAmino(_?: boolean): MigrateContractProposal.Amino;
    static fromProto(proto: MigrateContractProposal.Proto, _?: boolean): MigrateContractProposal;
    toProto(_?: boolean): MigrateContractProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MigrateContractProposal;
    static fromData(data: MigrateContractProposal.Data, _?: boolean): MigrateContractProposal;
    toData(_?: boolean): MigrateContractProposal.Data;
}
export declare namespace MigrateContractProposal {
    interface Amino {
        type: 'wasm/MigrateContractProposal';
        value: {
            title: string;
            description: string;
            contract: AccAddress;
            code_id: string;
            msg: object | string;
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.MigrateContractProposal';
        title: string;
        description: string;
        contract: AccAddress;
        code_id: string;
        msg: object | string;
    }
    type Proto = MigrateContractProposal_pb;
}
