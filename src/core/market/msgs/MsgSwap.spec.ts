import { MsgSwap } from './MsgSwap';
const MsgSwapAmino = require('./MsgSwap.data.json');

describe('MsgSwap', () => {
  it('deserializes', () => {
    MsgSwapAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'market/MsgSwap') {
          const e = MsgSwap.fromAmino(msg, true);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });
});
