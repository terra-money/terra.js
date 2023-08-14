import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgInstantiateContract as MsgInstantiateContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
export declare class MsgInstantiateContract extends JSONSerializable<MsgInstantiateContract.Amino, MsgInstantiateContract.Data, MsgInstantiateContract.Proto> {
    sender: AccAddress;
    admin: AccAddress | undefined;
    code_id: number;
    init_msg: object | string;
    label?: string | undefined;
    init_coins: Coins;
    /**
     * @param sender is a sender address
     * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
     * @param code_id is the reference to the stored WASM code
     * @param init_msg json encoded message to be passed to the contract on instantiation
     * @param init_coins are transferred to the contract on execution
     * @param label label for the contract. v2 supported only
     */
    constructor(sender: AccAddress, admin: AccAddress | undefined, code_id: number, init_msg: object | string, init_coins?: Coins.Input, label?: string | undefined);
    static fromAmino(data: MsgInstantiateContract.Amino, _?: boolean): MsgInstantiateContract;
    toAmino(_?: boolean): MsgInstantiateContract.Amino;
    static fromProto(proto: MsgInstantiateContract.Proto, _?: boolean): MsgInstantiateContract;
    toProto(_?: boolean): MsgInstantiateContract.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgInstantiateContract;
    static fromData(data: MsgInstantiateContract.Data, _?: boolean): MsgInstantiateContract;
    toData(_?: boolean): MsgInstantiateContract.Data;
}
export declare namespace MsgInstantiateContract {
    interface AminoV1 {
        type: 'wasm/MsgInstantiateContract';
        value: {
            sender: AccAddress;
            admin?: AccAddress;
            code_id: string;
            init_msg: object | string;
            init_coins: Coins.Amino;
        };
    }
    interface AminoV2 {
        type: 'wasm/MsgInstantiateContract';
        value: {
            sender: AccAddress;
            admin?: AccAddress;
            code_id: string;
            label?: string;
            msg: object | string;
            funds: Coins.Amino;
        };
    }
    interface DataV1 {
        '@type': '/terra.wasm.v1beta1.MsgInstantiateContract';
        sender: AccAddress;
        admin: AccAddress;
        code_id: string;
        init_msg: object | string;
        init_coins: Coins.Data;
    }
    interface DataV2 {
        '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract';
        sender: AccAddress;
        admin: AccAddress;
        code_id: string;
        label?: string;
        msg: object | string;
        funds: Coins.Data;
    }
    type Amino = AminoV1 | AminoV2;
    type Data = DataV1 | DataV2;
    type Proto = MsgInstantiateContract_legacy_pb | MsgInstantiateContract_pb;
}
