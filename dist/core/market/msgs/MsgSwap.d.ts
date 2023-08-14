import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../bech32';
import { MsgSwap as MsgSwap_pb } from '@classic-terra/terra.proto/terra/market/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
/**
 * Executes a market swap between 2 denominations at the exchange rate registered by the
 * Oracle module. The account will lose the amount of coins offered, and receive funds
 * in the requested denomination after a swap fee has been applied.
 */
export declare class MsgSwap extends JSONSerializable<MsgSwap.Amino, MsgSwap.Data, MsgSwap.Proto> {
    trader: AccAddress;
    offer_coin: Coin;
    ask_denom: Denom;
    /**
     * @param trader trader's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    constructor(trader: AccAddress, offer_coin: Coin, ask_denom: Denom);
    static fromAmino(data: MsgSwap.Amino, isClassic?: boolean): MsgSwap;
    toAmino(isClassic?: boolean): MsgSwap.Amino;
    static fromProto(proto: MsgSwap.Proto, isClassic?: boolean): MsgSwap;
    toProto(isClassic?: boolean): MsgSwap.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgSwap;
    static fromData(data: MsgSwap.Data, isClassic?: boolean): MsgSwap;
    toData(isClassic?: boolean): MsgSwap.Data;
}
export declare namespace MsgSwap {
    interface Amino {
        type: 'market/MsgSwap';
        value: {
            trader: AccAddress;
            offer_coin: Coin.Amino;
            ask_denom: Denom;
        };
    }
    interface Data {
        '@type': '/terra.market.v1beta1.MsgSwap';
        trader: AccAddress;
        offer_coin: Coin.Data;
        ask_denom: Denom;
    }
    type Proto = MsgSwap_pb;
}
