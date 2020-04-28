import { MsgExchangeRateVote } from './MsgExchangeRateVote';
const MsgExchangeRateVoteData = require('./MsgExchangeRateVote.data.json');

describe('MsgExchangeRateVote', () => {
  it('deserializes', () => {
    MsgExchangeRateVoteData.txs.forEach((txinfo: any) => {
      txinfo.tx.value.msg.forEach((msg: any) => {
        if (msg.type == 'oracle/MsgExchangeRateVote') {
          const e = MsgExchangeRateVote.fromData(msg);
          expect(e.toData()).toEqual(msg);
        }
      });
    });
  });

  it('calculates the correct vote hash', () => {
    const xrv = new MsgExchangeRateVote(
      '603.899',
      'umnt',
      '0dff',
      'terra13ld7qfuq37328mw6f5kunez3e2ygqumxfcysms',
      'terravaloper1vqnhgc6d0jyggtytzqrnsc40r4zez6tx99382w'
    );

    expect(xrv.getVoteHash()).toEqual(
      'b338c8a65a132edcf3e9a13013997cdf1e2b283d'
    );
  });
});
