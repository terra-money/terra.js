import { MsgDelegateFeedConsent } from './MsgDelegateFeedConsent';
const MsgDelegateFeedConsentAmino = require('./MsgDelegateFeedConsent.data.json');

describe('MsgDelegateFeedConsent', () => {
  it('deserializes', () => {
    MsgDelegateFeedConsentAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'oracle/MsgDelegateFeedConsent') {
          const e = MsgDelegateFeedConsent.fromAmino(msg, true);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });
});
