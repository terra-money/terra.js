import { MsgSwap } from './MsgSwap';
const MsgSwapData = require('./MsgSwap.data.json');

describe('MsgSwap', () => {
  it('deserializes', () => {
    MsgSwapData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'market/MsgSwap') {
          const e = MsgSwap.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
