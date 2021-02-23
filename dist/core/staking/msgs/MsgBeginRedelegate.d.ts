import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress, ValAddress } from '../../strings';
/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
export declare class MsgBeginRedelegate extends JSONSerializable<MsgBeginRedelegate.Data> {
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    amount: Coin;
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address validator to undelegate from
     * @param validator_dst_address validator to delegate to
     * @param amount LUNA to be redelegated
     */
    constructor(delegator_address: AccAddress, validator_src_address: ValAddress, validator_dst_address: ValAddress, amount: Coin);
    static fromData(data: MsgBeginRedelegate.Data): MsgBeginRedelegate;
    toData(): MsgBeginRedelegate.Data;
}
export declare namespace MsgBeginRedelegate {
    interface Data {
        type: 'staking/MsgBeginRedelegate';
        value: {
            delegator_address: AccAddress;
            validator_src_address: ValAddress;
            validator_dst_address: ValAddress;
            amount: Coin.Data;
        };
    }
}
