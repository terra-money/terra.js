import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { UpdateAdminProposal as UpdateAdminProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
/** UpdateAdminProposal gov proposal content type to set an admin for a contract. */
export declare class UpdateAdminProposal extends JSONSerializable<UpdateAdminProposal.Amino, UpdateAdminProposal.Data, UpdateAdminProposal.Proto> {
    title: string;
    description: string;
    contract: AccAddress;
    new_admin: AccAddress;
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract the address of the smart contract
     * @param new_admin address to be set
     */
    constructor(title: string, description: string, contract: AccAddress, new_admin: AccAddress);
    static fromAmino(data: UpdateAdminProposal.Amino, _?: boolean): UpdateAdminProposal;
    toAmino(_?: boolean): UpdateAdminProposal.Amino;
    static fromProto(proto: UpdateAdminProposal.Proto, _?: boolean): UpdateAdminProposal;
    toProto(_?: boolean): UpdateAdminProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): UpdateAdminProposal;
    static fromData(data: UpdateAdminProposal.Data, _?: boolean): UpdateAdminProposal;
    toData(_?: boolean): UpdateAdminProposal.Data;
}
export declare namespace UpdateAdminProposal {
    interface Amino {
        type: 'wasm/UpdateAdminProposal';
        value: {
            title: string;
            description: string;
            contract: AccAddress;
            new_admin: AccAddress;
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.UpdateAdminProposal';
        title: string;
        description: string;
        contract: AccAddress;
        new_admin: AccAddress;
    }
    type Proto = UpdateAdminProposal_pb;
}
