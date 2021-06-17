import { AggregateExchangeRateVote } from './AggregateExchangeRateVote';
const data = require('./AggregateExchangeRateVote.data.json');

describe('AggregateExchangeRateVote', () => {
  it('deserializes', () => {
    const obj = AggregateExchangeRateVote.fromData(data);
    expect(obj.toData()).toMatchObject(data);
  });
});
