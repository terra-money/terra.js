import { AggregateExchangeRateVote } from './AggregateExchangeRateVote';
import data from './AggregateExchangeRateVote.data.json';

describe('AggregateExchangeRateVote', () => {
  it('deserializes', () => {
    const obj = AggregateExchangeRateVote.fromAmino(data);
    expect(obj.toAmino()).toMatchObject(data);
  });
});
