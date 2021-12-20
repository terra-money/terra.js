import { MsgUndelegate } from './MsgUndelegate';
import MsgUndelegateAmino from './MsgUndelegate.data.json';

describe('MsgUndelegate', () => {
  it('deserializes', () => {
    MsgUndelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgUndelegate') {
          const e = MsgUndelegate.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
