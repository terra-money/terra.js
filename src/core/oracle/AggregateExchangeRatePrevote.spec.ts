import { AggregateExchangeRatePrevote } from './AggregateExchangeRatePrevote';
const data = require('./AggregateExchangeRatePrevote.data.json');

describe('AggregateExchangeRatePrevote', () => {
  it('deserializes', () => {
    const obj = AggregateExchangeRatePrevote.fromData(data);
    expect(obj.toData()).toMatchObject(data);
  });
});
