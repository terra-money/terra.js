import { MsgSubmitProposal } from './MsgSubmitProposal';
import MsgSubmitProposalAmino from './MsgSubmitProposal.data.json';

describe('MsgSubmitProposal', () => {
  it('deserializes', () => {
    MsgSubmitProposalAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'gov/MsgSubmitProposal') {
          // we are not checking for equality of toAmino() because toJSON() doesn't marshal
          // ParamaterChangeProposal's JSON keys in the same order
          MsgSubmitProposal.fromAmino(msg);
        }
      });
    });
  });
});
