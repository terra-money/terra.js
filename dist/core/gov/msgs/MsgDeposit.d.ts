import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
/**
 * Add a deposit for a proposal
 */
export declare class MsgDeposit extends JSONSerializable<MsgDeposit.Data> {
    proposal_id: number;
    depositor: AccAddress;
    amount: Coins;
    /**
     * @param proposal_id Id of porposal to deposit to
     * @param depositor depositor's account address
     * @param amount amount to deposit
     */
    constructor(proposal_id: number, depositor: AccAddress, amount: Coins.Input);
    static fromData(data: MsgDeposit.Data): MsgDeposit;
    toData(): MsgDeposit.Data;
}
export declare namespace MsgDeposit {
    interface Data {
        type: 'gov/MsgDeposit';
        value: {
            proposal_id: string;
            depositor: AccAddress;
            amount: Coins.Data;
        };
    }
}
