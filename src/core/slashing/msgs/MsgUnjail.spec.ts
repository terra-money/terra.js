import { MsgUnjail } from './MsgUnjail';
const MsgUnjailData = require('./MsgUnjail.data.json');

describe('MsgUnjail', () => {
  it('deserializes', () => {
    MsgUnjailData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'cosmos/MsgUnjail') {
          const e = MsgUnjail.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
