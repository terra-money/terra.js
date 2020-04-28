import { MsgModifyWithdrawAddress } from './MsgModifyWithdrawAddress';
const MsgModifyWithdrawAddressData = require('./MsgModifyWithdrawAddress.data.json');

describe('MsgModifyWithdrawAddress', () => {
  it('deserializes', () => {
    MsgModifyWithdrawAddressData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgModifyWithdrawAddress') {
          const e = MsgModifyWithdrawAddress.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
