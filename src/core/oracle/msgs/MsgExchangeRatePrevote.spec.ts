import { MsgExchangeRatePrevote } from './MsgExchangeRatePrevote';
const MsgExchangeRatePrevoteData = require('./MsgExchangeRatePrevote.data.json');

describe('MsgExchangeRatePrevote', () => {
  it('deserializes', () => {
    MsgExchangeRatePrevoteData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'oracle/MsgExchangeRatePrevote') {
          const e = MsgExchangeRatePrevote.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
