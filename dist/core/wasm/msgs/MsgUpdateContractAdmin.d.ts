import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpdateContractAdmin as MsgUpdateContractAdmin_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgUpdateAdmin as MsgUpdateAdmin_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
export declare class MsgUpdateContractAdmin extends JSONSerializable<MsgUpdateContractAdmin.Amino, MsgUpdateContractAdmin.Data, MsgUpdateContractAdmin.Proto> {
    admin: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
    /**
     * @param admin contract admin
     * @param new_admin new admin
     * @param contract contract address
     */
    constructor(admin: AccAddress, new_admin: AccAddress, contract: AccAddress);
    static fromAmino(data: MsgUpdateContractAdmin.Amino, _?: boolean): MsgUpdateContractAdmin;
    toAmino(_?: boolean): MsgUpdateContractAdmin.Amino;
    static fromProto(proto: MsgUpdateContractAdmin.Proto, _?: boolean): MsgUpdateContractAdmin;
    toProto(_?: boolean): MsgUpdateContractAdmin.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgUpdateContractAdmin;
    static fromData(data: MsgUpdateContractAdmin.Data, isClassic?: boolean): MsgUpdateContractAdmin;
    toData(isClassic?: boolean): MsgUpdateContractAdmin.Data;
}
export declare namespace MsgUpdateContractAdmin {
    interface AminoV1 {
        type: 'wasm/MsgUpdateContractAdmin';
        value: {
            admin: AccAddress;
            new_admin: AccAddress;
            contract: AccAddress;
        };
    }
    interface AminoV2 {
        type: 'wasm/MsgUpdateAdmin';
        value: {
            sender: AccAddress;
            new_admin: AccAddress;
            contract: AccAddress;
        };
    }
    interface DataV1 {
        '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin';
        admin: AccAddress;
        new_admin: AccAddress;
        contract: AccAddress;
    }
    interface DataV2 {
        '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin';
        sender: AccAddress;
        new_admin: AccAddress;
        contract: AccAddress;
    }
    type Amino = AminoV1 | AminoV2;
    type Data = DataV1 | DataV2;
    type Proto = MsgUpdateContractAdmin_legacy_pb | MsgUpdateAdmin_pb;
}
