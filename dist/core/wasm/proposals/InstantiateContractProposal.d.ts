import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { InstantiateContractProposal as InstantiateContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
export declare class InstantiateContractProposal extends JSONSerializable<InstantiateContractProposal.Amino, InstantiateContractProposal.Data, InstantiateContractProposal.Proto> {
    title: string;
    description: string;
    run_as: AccAddress;
    admin: AccAddress | undefined;
    code_id: number;
    init_msg: object | string;
    label: string;
    init_coins: Coins;
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as is a run_as address
     * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
     * @param code_id is the reference to the stored WASM code
     * @param init_msg json encoded message to be passed to the contract on instantiation
     * @param init_coins are transferred to the contract on execution
     * @param label label for the contract. v2 supported only
     */
    constructor(title: string, description: string, run_as: AccAddress, admin: AccAddress | undefined, code_id: number, init_msg: object | string, init_coins: Coins.Input | undefined, label: string);
    static fromAmino(data: InstantiateContractProposal.Amino, _?: boolean): InstantiateContractProposal;
    toAmino(_?: boolean): InstantiateContractProposal.Amino;
    static fromProto(proto: InstantiateContractProposal.Proto, _?: boolean): InstantiateContractProposal;
    toProto(_?: boolean): InstantiateContractProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): InstantiateContractProposal;
    static fromData(data: InstantiateContractProposal.Data, _?: boolean): InstantiateContractProposal;
    toData(_?: boolean): InstantiateContractProposal.Data;
}
export declare namespace InstantiateContractProposal {
    interface Amino {
        type: 'wasm/InstantiateContractProposal';
        value: {
            title: string;
            description: string;
            run_as: AccAddress;
            admin?: AccAddress;
            code_id: string;
            label: string;
            msg: object | string;
            funds: Coins.Amino;
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal';
        title: string;
        description: string;
        run_as: AccAddress;
        admin: AccAddress;
        code_id: string;
        label: string;
        msg: object | string;
        funds: Coins.Data;
    }
    type Proto = InstantiateContractProposal_pb;
}
