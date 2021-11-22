import { MsgDelegate } from './MsgDelegate';
const MsgDelegateAmino = require('./MsgDelegate.data.json');

describe('MsgDelegate', () => {
  it('deserializes', () => {
    MsgDelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgDelegate') {
          const e = MsgDelegate.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
