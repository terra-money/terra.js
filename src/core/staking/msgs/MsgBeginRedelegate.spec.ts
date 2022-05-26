import { MsgBeginRedelegate } from './MsgBeginRedelegate';

import { Coin } from '../../Coin';
const MsgBeginRedelegateAmino = require('./MsgBeginRedelegate.data.json');

describe('MsgBeginRedelegate', () => {
  it('legacy deserialize', () => {
    MsgBeginRedelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgBeginRedelegate') {
          const e = MsgBeginRedelegate.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const send = MsgBeginRedelegate.fromAmino({
      type: 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_src_address:
          'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        validator_dst_address:
          'terravaloper1fa2gmum9kl9ms73hnrhvg0rkk0s9jvqxpunyr3',
        amount: {
          denom: 'uluna',
          amount: '8102024952',
        },
      },
    });

    expect(send).toMatchObject({
      delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      validator_src_address:
        'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
      validator_dst_address:
        'terravaloper1fa2gmum9kl9ms73hnrhvg0rkk0s9jvqxpunyr3',
      amount: new Coin('uluna', '8102024952'),
    });

    expect(send.toAmino()).toMatchObject({
      type: 'cosmos-sdk/MsgBeginRedelegate',
      value: {
        delegator_address: 'terra1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        validator_src_address:
          'terravaloper1guxk2q4wn92fw0mchx2rhsenjvq0hj9pzp0ngt',
        validator_dst_address:
          'terravaloper1fa2gmum9kl9ms73hnrhvg0rkk0s9jvqxpunyr3',
        amount: {
          denom: 'uluna',
          amount: '8102024952',
        },
      },
    });
  });
});
