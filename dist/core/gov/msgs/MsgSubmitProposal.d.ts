import { Coins } from '../../Coins';
import { Proposal } from '../../Proposal';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
/**
 * Submit a proposal alongside an initial deposit.
 */
export declare class MsgSubmitProposal extends JSONSerializable<MsgSubmitProposal.Data> {
    content: Proposal.Content;
    proposer: AccAddress;
    initial_deposit: Coins;
    /**
     * @param content proposal content to submit
     * @param initial_deposit deposit provided
     * @param proposer proposer's account address
     */
    constructor(content: Proposal.Content, initial_deposit: Coins.Input, proposer: AccAddress);
    static fromData(data: MsgSubmitProposal.Data): MsgSubmitProposal;
    toData(): MsgSubmitProposal.Data;
}
export declare namespace MsgSubmitProposal {
    interface Data {
        type: 'gov/MsgSubmitProposal';
        value: {
            content: Proposal.Content.Data;
            initial_deposit: Coins.Data;
            proposer: AccAddress;
        };
    }
}
