import { MsgSubmitProposal } from './MsgSubmitProposal';
import { MsgVote } from './MsgVote';
import { MsgDeposit } from './MsgDeposit';
import { MsgVoteWeighted } from './MsgVoteWeighted';

export * from './MsgDeposit';
export * from './MsgSubmitProposal';
export * from './MsgVote';
export * from './MsgVoteWeighted';

export type GovMsg = MsgDeposit | MsgSubmitProposal | MsgVote | MsgVoteWeighted;

export namespace GovMsg {
  export type Amino =
    | MsgDeposit.Amino
    | MsgSubmitProposal.Amino
    | MsgVote.Amino
    | MsgVoteWeighted.Amino;
  export type Data =
    | MsgDeposit.Data
    | MsgSubmitProposal.Data
    | MsgVote.Data
    | MsgVoteWeighted.Data;
  export type Proto =
    | MsgDeposit.Proto
    | MsgSubmitProposal.Proto
    | MsgVote.Proto
    | MsgVoteWeighted.Proto;
}
