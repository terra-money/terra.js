import { MsgSetWithdrawAddress } from './MsgSetWithdrawAddress';
const MsgSetWithdrawAddressAmino = require('./MsgSetWithdrawAddress.data.json');

describe('MsgSetWithdrawAddress', () => {
  it('deserializes', () => {
    MsgSetWithdrawAddressAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgModifyWithdrawAddress') {
          const e = MsgSetWithdrawAddress.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
