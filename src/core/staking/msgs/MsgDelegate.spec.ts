import { MsgDelegate } from './MsgDelegate';
import { Coin } from '../../Coin';
const MsgDelegateAmino = require('./MsgDelegate.data.json');

describe('MsgDelegate', () => {
  it('legacy deserialize', () => {
    MsgDelegateAmino.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'staking/MsgDelegate') {
          const e = MsgDelegate.fromAmino(msg);
          expect(e.toAmino(true)).toEqual(msg);
        }
      });
    });
  });

  it('deserialize amino', () => {
    const send = MsgDelegate.fromAmino({
      type: 'cosmos-sdk/MsgDelegate',
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
      type: 'cosmos-sdk/MsgDelegate',
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
