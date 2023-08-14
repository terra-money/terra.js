import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSwapSend as MsgSwapSend_pb } from '@classic-terra/terra.proto/terra/market/v1beta1/tx';
/**
 * Executes a market swap send between 2 denominations at the exchange rate registered by the
 * Oracle module. The sender account will lose the amount of coins offered, and receiver will receive funds
 * in the requested denomination after a swap and send fee has been applied.
 */
export declare class MsgSwapSend extends JSONSerializable<MsgSwapSend.Amino, MsgSwapSend.Data, MsgSwapSend.Proto> {
    from_address: AccAddress;
    to_address: AccAddress;
    offer_coin: Coin;
    ask_denom: Denom;
    /**
     * @param from_address sender's account address
     * @param to_address receiver's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    constructor(from_address: AccAddress, to_address: AccAddress, offer_coin: Coin, ask_denom: Denom);
    static fromAmino(data: MsgSwapSend.Amino, isClassic?: boolean): MsgSwapSend;
    toAmino(isClassic?: boolean): MsgSwapSend.Amino;
    static fromProto(proto: MsgSwapSend.Proto, isClassic?: boolean): MsgSwapSend;
    toProto(isClassic?: boolean): MsgSwapSend.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgSwapSend;
    static fromData(data: MsgSwapSend.Data, isClassic?: boolean): MsgSwapSend;
    toData(isClassic?: boolean): MsgSwapSend.Data;
}
export declare namespace MsgSwapSend {
    interface Amino {
        type: 'market/MsgSwapSend';
        value: {
            from_address: AccAddress;
            to_address: AccAddress;
            offer_coin: Coin.Amino;
            ask_denom: Denom;
        };
    }
    interface Data {
        '@type': '/terra.market.v1beta1.MsgSwapSend';
        from_address: AccAddress;
        to_address: AccAddress;
        offer_coin: Coin.Data;
        ask_denom: Denom;
    }
    type Proto = MsgSwapSend_pb;
}
