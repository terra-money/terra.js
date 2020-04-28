import { MsgBeginRedelegate } from './MsgBeginRedelegate';
const MsgBeginRedelegateData = require('./MsgBeginRedelegate.data.json');

describe('MsgBeginRedelegate', () => {
  it('deserializes', () => {
    MsgBeginRedelegateData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgBeginRedelegate') {
          const e = MsgBeginRedelegate.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
