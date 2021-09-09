import { MsgSetWithdrawAddress } from './MsgSetWithdrawAddress';
const MsgSetWithdrawAddressData = require('./MsgSetWithdrawAddress.data.json');

describe('MsgSetWithdrawAddress', () => {
  it('deserializes', () => {
    MsgSetWithdrawAddressData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgModifyWithdrawAddress') {
          const e = MsgSetWithdrawAddress.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
