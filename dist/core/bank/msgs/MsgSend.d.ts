import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSend as MsgSend_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/tx';
/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export declare class MsgSend extends JSONSerializable<MsgSend.Amino, MsgSend.Data, MsgSend.Proto> {
    from_address: AccAddress;
    to_address: AccAddress;
    /**
     * value of the transaction
     */
    amount: Coins;
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    constructor(from_address: AccAddress, to_address: AccAddress, amount: Coins.Input);
    static fromAmino(data: MsgSend.Amino, _?: boolean): MsgSend;
    toAmino(isClassic?: boolean): MsgSend.Amino;
    static fromData(data: MsgSend.Data, isClassic?: boolean): MsgSend;
    toData(_?: boolean): MsgSend.Data;
    static fromProto(proto: MsgSend.Proto, _?: boolean): MsgSend;
    toProto(_?: boolean): MsgSend.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgSend;
}
export declare namespace MsgSend {
    interface Amino {
        type: 'bank/MsgSend' | 'cosmos-sdk/MsgSend';
        value: {
            from_address: AccAddress;
            to_address: AccAddress;
            amount: Coins.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.bank.v1beta1.MsgSend';
        from_address: AccAddress;
        to_address: AccAddress;
        amount: Coins.Data;
    }
    type Proto = MsgSend_pb;
}
