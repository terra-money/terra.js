import { AggregateExchangeRateVote } from './AggregateExchangeRateVote';
const data = require('./AggregateExchangeRateVote.data.json');

describe('AggregateExchangeRateVote', () => {
  it('deserializes', () => {
    const obj = AggregateExchangeRateVote.fromAmino(data);
    expect(obj.toAmino()).toMatchObject(data);
  });
});
