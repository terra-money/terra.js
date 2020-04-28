import { MsgSubmitProposal } from './MsgSubmitProposal';
const MsgSubmitProposalData = require('./MsgSubmitProposal.data.json');

describe('MsgSubmitProposal', () => {
  it('deserializes', () => {
    MsgSubmitProposalData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'gov/MsgSubmitProposal') {
          // we are not checking for equality of toData() because toJSON() doesn't marshal
          // ParamaterChangeProposal's JSON keys in the same order
          MsgSubmitProposal.fromData(msg);
        }
      });
    });
  });
});
