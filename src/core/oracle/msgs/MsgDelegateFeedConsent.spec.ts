import { MsgDelegateFeedConsent } from './MsgDelegateFeedConsent';
const MsgDelegateFeedConsentData = require('./MsgDelegateFeedConsent.data.json');

describe('MsgDelegateFeedConsent', () => {
  it('deserializes', () => {
    MsgDelegateFeedConsentData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'oracle/MsgDelegateFeedConsent') {
          const e = MsgDelegateFeedConsent.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
