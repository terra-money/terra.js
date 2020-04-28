import { MsgCreateValidator } from './MsgCreateValidator';
const MsgCreateValidatorData = require('./MsgCreateValidator.data.json');

describe('MsgCreateValidator', () => {
  it('deserializes', () => {
    MsgCreateValidatorData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgCreateValidator') {
          const e = MsgCreateValidator.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
