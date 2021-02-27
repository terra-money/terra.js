import { MsgSubmitProposal } from './MsgSubmitProposal';
import { MsgVote } from './MsgVote';
import { MsgDeposit } from './MsgDeposit';
export * from './MsgDeposit';
export * from './MsgSubmitProposal';
export * from './MsgVote';
export declare type GovMsg = MsgDeposit | MsgSubmitProposal | MsgVote;
export declare namespace GovMsg {
    type Data = MsgDeposit.Data | MsgSubmitProposal.Data | MsgVote.Data;
}
