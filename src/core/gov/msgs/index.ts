import { MsgSubmitProposal } from './MsgSubmitProposal';
import { MsgVote } from './MsgVote';
import { MsgDeposit } from './MsgDeposit';

export * from './MsgDeposit';
export * from './MsgSubmitProposal';
export * from './MsgVote';
export * from './MsgVoteWeighted';

export type GovMsg = MsgDeposit | MsgSubmitProposal | MsgVote;

export namespace GovMsg {
  export type Data = MsgDeposit.Data | MsgSubmitProposal.Data | MsgVote.Data;
}
