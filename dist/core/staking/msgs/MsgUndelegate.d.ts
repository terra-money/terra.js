import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';
/**
 * A delegator can undelegate an amount of bonded Luna, and will begin the unbonding
 * process for those funds. The unbonding process takes 21 days to complete, during
 * which the Luna cannot be transacted or swapped.
 */
export declare class MsgUndelegate extends JSONSerializable<MsgUndelegate.Data> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin;
    /**
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount Luna to be undelegated
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress, amount: Coin);
    static fromData(data: MsgUndelegate.Data): MsgUndelegate;
    toData(): MsgUndelegate.Data;
}
export declare namespace MsgUndelegate {
    interface Data {
        type: 'staking/MsgUndelegate';
        value: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
            amount: Coin.Data;
        };
    }
}
