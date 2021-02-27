import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
/**
 * Vote for a proposal
 */
export declare class MsgVote extends JSONSerializable<MsgVote.Data> {
    proposal_id: number;
    voter: AccAddress;
    option: MsgVote.Option;
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    constructor(proposal_id: number, voter: AccAddress, option: MsgVote.Option);
    static fromData(data: MsgVote.Data): MsgVote;
    toData(): MsgVote.Data;
}
export declare namespace MsgVote {
    /** Voting options */
    enum Option {
        /** - */
        EMPTY = "Empty",
        /** Vote yes */
        YES = "Yes",
        /** Do not vote */
        ABSTAIN = "Abstain",
        /** Vote no */
        NO = "No",
        /** Vote No with the option to veto if passed */
        NO_WITH_VETO = "NoWithVeto"
    }
    interface Data {
        type: 'gov/MsgVote';
        value: {
            proposal_id: string;
            voter: AccAddress;
            option: Option;
        };
    }
}
