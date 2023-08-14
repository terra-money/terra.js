import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
export declare class MsgExecuteContract extends JSONSerializable<MsgExecuteContract.Amino, MsgExecuteContract.Data, MsgExecuteContract.Proto> {
    sender: AccAddress;
    contract: AccAddress;
    execute_msg: object | string;
    coins: Coins;
    /**
     * @param sender contract user
     * @param contract contract address
     * @param execute_msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    constructor(sender: AccAddress, contract: AccAddress, execute_msg: object | string, coins?: Coins.Input);
    static fromAmino(data: MsgExecuteContract.Amino, _?: boolean): MsgExecuteContract;
    toAmino(_?: boolean): MsgExecuteContract.Amino;
    static fromProto(proto: MsgExecuteContract.Proto, _?: boolean): MsgExecuteContract;
    toProto(_?: boolean): MsgExecuteContract.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgExecuteContract;
    static fromData(data: MsgExecuteContract.Data, _?: boolean): MsgExecuteContract;
    toData(_?: boolean): MsgExecuteContract.Data;
}
export declare namespace MsgExecuteContract {
    interface AminoV1 {
        type: 'wasm/MsgExecuteContract';
        value: {
            sender: AccAddress;
            contract: AccAddress;
            execute_msg: object | string;
            coins: Coins.Amino;
        };
    }
    interface AminoV2 {
        type: 'wasm/MsgExecuteContract';
        value: {
            sender: AccAddress;
            contract: AccAddress;
            msg: object | string;
            funds: Coins.Amino;
        };
    }
    interface DataV1 {
        '@type': '/terra.wasm.v1beta1.MsgExecuteContract';
        sender: AccAddress;
        contract: AccAddress;
        execute_msg: object | string;
        coins: Coins.Data;
    }
    interface DataV2 {
        '@type': '/cosmwasm.wasm.v1.MsgExecuteContract';
        sender: AccAddress;
        contract: AccAddress;
        msg: object | string;
        funds: Coins.Data;
    }
    type Amino = AminoV1 | AminoV2;
    type Data = DataV1 | DataV2;
    type Proto = MsgExecuteContract_legacy_pb | MsgExecuteContract_pb;
}
