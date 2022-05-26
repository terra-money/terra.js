import { MsgSubmitProposal } from './MsgSubmitProposal';
const MsgSubmitProposalAmino = require('./MsgSubmitProposal.data.json');
const MsgSubmitProposalAminoV2 = require('./MsgSubmitProposal.data.v2.json');

describe('MsgSubmitProposal', () => {
  it('legacy: deserializes', () => {
    MsgSubmitProposalAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'gov/MsgSubmitProposal') {
          // we are not checking for equality of toAmino() because toJSON() doesn't marshal
          // ParamaterChangeProposal's JSON keys in the same order
          MsgSubmitProposal.fromAmino(msg, true);
        }
      });
    });
  });

  it('deserializes', () => {
    MsgSubmitProposalAminoV2.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'cosmos-sdk/MsgSubmitProposal') {
          // we are not checking for equality of toAmino() because toJSON() doesn't marshal
          // ParamaterChangeProposal's JSON keys in the same order
          MsgSubmitProposal.fromAmino(msg, false);
        }
      });
    });
  });
});
