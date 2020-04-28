import { MsgWithdrawDelegationReward } from './MsgWithdrawDelegationReward';
const MsgWithdrawDelegationRewardData = require('./MsgWithdrawDelegationReward.data.json');

describe('MsgWithdrawDelegationReward', () => {
  it('deserializes', () => {
    MsgWithdrawDelegationRewardData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawDelegationReward') {
          const e = MsgWithdrawDelegationReward.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });
});
