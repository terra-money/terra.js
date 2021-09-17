import { MsgDeposit } from './MsgDeposit';
const MsgDepositAmino = require('./MsgDeposit.data.json');

describe('MsgDeposit', () => {
  it('deserializes', () => {
    MsgDepositAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'gov/MsgDeposit') {
          const e = MsgDeposit.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
