import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';
/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export declare class MsgDelegate extends JSONSerializable<MsgDelegate.Data> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin;
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount amount of LUNA to be sent for delegation
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress, amount: Coin);
    static fromData(data: MsgDelegate.Data): MsgDelegate;
    toData(): MsgDelegate.Data;
}
export declare namespace MsgDelegate {
    interface Data {
        type: 'staking/MsgDelegate';
        value: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
            amount: Coin.Data;
        };
    }
}
