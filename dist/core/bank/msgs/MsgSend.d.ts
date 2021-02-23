import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export declare class MsgSend extends JSONSerializable<MsgSend.Data> {
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
    static fromData(data: MsgSend.Data): MsgSend;
    toData(): MsgSend.Data;
}
export declare namespace MsgSend {
    interface Data {
        type: 'bank/MsgSend';
        value: {
            from_address: AccAddress;
            to_address: AccAddress;
            amount: Coins.Data;
        };
    }
}
