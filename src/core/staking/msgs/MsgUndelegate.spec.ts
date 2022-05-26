import { MsgUndelegate } from './MsgUndelegate';
import { Coin } from '../../Coin';
const MsgUndelegateAmino = require('./MsgUndelegate.data.json');

describe('MsgUndelegate', () => {
  it('legacy deserialize', () => {
    MsgUndelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgUndelegate') {
          const e = MsgUndelegate.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const send = MsgUndelegate.fromAmino({
      type: 'cosmos-sdk/MsgUndelegate',
      value: {
        delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address:
          'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        amount: {
          denom: 'uluna',
          amount: '8102024952',
        },
      },
    });

    expect(send).toMatchObject({
      delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      validator_address: 'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
      amount: new Coin('uluna', '8102024952'),
    });

    expect(send.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgUndelegate',
      value: {
        delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_address:
          'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        amount: {
          denom: 'uluna',
          amount: '8102024952',
        },
      },
    });
  });
});
