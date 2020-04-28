import { MsgEditValidator } from './MsgEditValidator';
const MsgEditValidatorData = require('./MsgEditValidator.data.json');

describe('MsgEditValidator', () => {
  it('deserializes', () => {
    MsgEditValidatorData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgEditValidator') {
          const e = MsgEditValidator.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
