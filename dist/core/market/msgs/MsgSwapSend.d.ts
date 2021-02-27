import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../strings';
/**
 * Executes a market swap send between 2 denominations at the exchange rate registered by the
 * Oracle module. The sender account will lose the amount of coins offered, and receiver will receive funds
 * in the requested denomination after a swap and send fee has been applied.
 */
export declare class MsgSwapSend extends JSONSerializable<MsgSwapSend.Data> {
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
    static fromData(data: MsgSwapSend.Data): MsgSwapSend;
    toData(): MsgSwapSend.Data;
}
export declare namespace MsgSwapSend {
    interface Data {
        type: 'market/MsgSwapSend';
        value: {
            from_address: AccAddress;
            to_address: AccAddress;
            offer_coin: Coin.Data;
            ask_denom: Denom;
        };
    }
}
