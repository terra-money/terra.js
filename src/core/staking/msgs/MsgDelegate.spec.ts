import { MsgDelegate } from './MsgDelegate';
const MsgDelegateData = require('./MsgDelegate.data.json');

describe('MsgDelegate', () => {
  it('deserializes', () => {
    MsgDelegateData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgDelegate') {
          const e = MsgDelegate.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
