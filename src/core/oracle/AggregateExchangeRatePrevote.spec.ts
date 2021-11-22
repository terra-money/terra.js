import { AggregateExchangeRatePrevote } from './AggregateExchangeRatePrevote';
const data = require('./AggregateExchangeRatePrevote.data.json');

describe('AggregateExchangeRatePrevote', () => {
  it('deserializes', () => {
    const obj = AggregateExchangeRatePrevote.fromAmino(data);
    expect(obj.toAmino()).toMatchObject(data);
  });
});
