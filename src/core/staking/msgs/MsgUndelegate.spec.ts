import { MsgUndelegate } from './MsgUndelegate';
const MsgUndelegateData = require('./MsgUndelegate.data.json');

describe('MsgUndelegate', () => {
  it('deserializes', () => {
    MsgUndelegateData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgUndelegate') {
          const e = MsgUndelegate.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
