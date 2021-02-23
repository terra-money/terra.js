import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../strings';
/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
export declare class CommunityPoolSpendProposal extends JSONSerializable<CommunityPoolSpendProposal.Data> {
    title: string;
    description: string;
    recipient: AccAddress;
    amount: Coins;
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param recipient recipient address
     * @param amount amount to give recipient
     */
    constructor(title: string, description: string, recipient: AccAddress, amount: Coins.Input);
    static fromData(data: CommunityPoolSpendProposal.Data): CommunityPoolSpendProposal;
    toData(): CommunityPoolSpendProposal.Data;
}
export declare namespace CommunityPoolSpendProposal {
    interface Data {
        type: 'distribution/CommunityPoolSpendProposal';
        value: {
            title: string;
            description: string;
            recipient: AccAddress;
            amount: Coins.Data;
        };
    }
}
