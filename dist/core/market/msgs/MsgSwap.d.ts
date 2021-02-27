import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../strings';
/**
 * Executes a market swap between 2 denominations at the exchange rate registered by the
 * Oracle module. The account will lose the amount of coins offered, and receive funds
 * in the requested denomination after a swap fee has been applied.
 */
export declare class MsgSwap extends JSONSerializable<MsgSwap.Data> {
    trader: AccAddress;
    offer_coin: Coin;
    ask_denom: Denom;
    /**
     * @param trader trader's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    constructor(trader: AccAddress, offer_coin: Coin, ask_denom: Denom);
    static fromData(data: MsgSwap.Data): MsgSwap;
    toData(): MsgSwap.Data;
}
export declare namespace MsgSwap {
    interface Data {
        type: 'market/MsgSwap';
        value: {
            trader: AccAddress;
            offer_coin: Coin.Data;
            ask_denom: Denom;
        };
    }
}
