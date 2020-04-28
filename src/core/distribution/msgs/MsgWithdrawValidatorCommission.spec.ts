import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';
const MsgWithdrawValidatorCommissionData = require('./MsgWithdrawValidatorCommission.data.json');

describe('MsgWithdrawValidatorCommission', () => {
  it('deserializes', () => {
    MsgWithdrawValidatorCommissionData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawValidatorCommission') {
          const e = MsgWithdrawValidatorCommission.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
