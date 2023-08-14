import { MsgSubmitProposal } from './MsgSubmitProposal';
import { MsgVote } from './MsgVote';
import { MsgDeposit } from './MsgDeposit';
import { MsgVoteWeighted } from './MsgVoteWeighted';
export * from './MsgDeposit';
export * from './MsgSubmitProposal';
export * from './MsgVote';
export * from './MsgVoteWeighted';
export declare type GovMsg = MsgDeposit | MsgSubmitProposal | MsgVote | MsgVoteWeighted;
export declare namespace GovMsg {
    type Amino = MsgDeposit.Amino | MsgSubmitProposal.Amino | MsgVote.Amino | MsgVoteWeighted.Amino;
    type Data = MsgDeposit.Data | MsgSubmitProposal.Data | MsgVote.Data | MsgVoteWeighted.Data;
    type Proto = MsgDeposit.Proto | MsgSubmitProposal.Proto | MsgVote.Proto | MsgVoteWeighted.Proto;
}
