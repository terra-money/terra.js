import { MsgWithdrawDelegatorReward } from './MsgWithdrawDelegatorReward';
const MsgWithdrawDelegatorRewardData = require('./MsgWithdrawDelegatorReward.data.json');

describe('MsgWithdrawDelegatorReward', () => {
  it('deserializes', () => {
    MsgWithdrawDelegatorRewardData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawDelegationReward') {
          const e = MsgWithdrawDelegatorReward.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
