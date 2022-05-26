import { MsgDeposit } from './MsgDeposit';
const MsgDepositAmino = require('./MsgDeposit.data.json');
const MsgDepositAminoV2 = require('./MsgDeposit.data.v2.json');

describe('MsgDeposit', () => {
  it('legacy: deserializes', () => {
    MsgDepositAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'gov/MsgDeposit') {
          const e = MsgDeposit.fromAmino(msg, true);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserializes', () => {
    MsgDepositAminoV2.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'cosmos-sdk/MsgDeposit') {
          const e = MsgDeposit.fromAmino(msg, false);
          expect(e.toAmino(false)).toEqual(msg);
        }
      });
    });
  });
});
