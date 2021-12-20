import { MsgWithdrawDelegatorReward } from './MsgWithdrawDelegatorReward';
import MsgWithdrawDelegatorRewardAmino from './MsgWithdrawDelegatorReward.data.json';

describe('MsgWithdrawDelegatorReward', () => {
  it('deserializes', () => {
    MsgWithdrawDelegatorRewardAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'distribution/MsgWithdrawDelegationReward') {
          const e = MsgWithdrawDelegatorReward.fromAmino(msg);
          expect(e.toAmino()).toEqual(msg);
        }
      });
    });
  });
});
