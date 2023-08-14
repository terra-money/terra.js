import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { SudoContractProposal as SudoContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
export declare class SudoContractProposal extends JSONSerializable<SudoContractProposal.Amino, SudoContractProposal.Data, SudoContractProposal.Proto> {
    title: string;
    description: string;
    contract: AccAddress;
    msg: object | string;
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract contract address to be migrated from
     * @param msg JSON message to configure the migrate state of the contract
     */
    constructor(title: string, description: string, contract: AccAddress, msg: object | string);
    static fromAmino(data: SudoContractProposal.Amino, _?: boolean): SudoContractProposal;
    toAmino(_?: boolean): SudoContractProposal.Amino;
    static fromProto(proto: SudoContractProposal.Proto, _?: boolean): SudoContractProposal;
    toProto(_?: boolean): SudoContractProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): SudoContractProposal;
    static fromData(data: SudoContractProposal.Data, _?: boolean): SudoContractProposal;
    toData(_?: boolean): SudoContractProposal.Data;
}
export declare namespace SudoContractProposal {
    interface Amino {
        type: 'wasm/SudoContractProposal';
        value: {
            title: string;
            description: string;
            contract: AccAddress;
            msg: object | string;
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.SudoContractProposal';
        title: string;
        description: string;
        contract: AccAddress;
        msg: object | string;
    }
    type Proto = SudoContractProposal_pb;
}
