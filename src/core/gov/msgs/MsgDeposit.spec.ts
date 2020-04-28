import { MsgDeposit } from './MsgDeposit';
const MsgDepositData = require('./MsgDeposit.data.json');

describe('MsgDeposit', () => {
  it('deserializes', () => {
    MsgDepositData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'gov/MsgDeposit') {
          const e = MsgDeposit.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
