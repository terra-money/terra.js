import { MsgAggregateExchangeRateVote } from './MsgAggregateExchangeRateVote';

describe('MsgAggregateExchangeRateVote', () => {
  it('getAggregateVoteHash', () => {
    const msg = new MsgAggregateExchangeRateVote(
      {
        ukrw: '245.000',
        uusd: '0.2242',
        usdr: '0.182',
      },
      'salt',
      'terra1krj7amhhagjnyg2tkkuh6l0550y733jnjulzjh',
      'terravaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy'
    );
    msg.getPrevote();
    expect(msg.getAggregateVoteHash()).toEqual(
      '7929908433e7399845fa60f9ef70ef7f2bb8f01b'
    );
  });
  it('conversion', () => {
    const msg = new MsgAggregateExchangeRateVote(
      {
        ukrw: '245.000',
        uusd: '0.2242',
        usdr: '0.182',
      },
      'salt',
      'terra1krj7amhhagjnyg2tkkuh6l0550y733jnjulzjh',
      'terravaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy'
    );
    const anyObj = msg.packAny(true);
    expect(MsgAggregateExchangeRateVote.unpackAny(anyObj, true)).toBeDefined();
  });
});
