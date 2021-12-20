import { AggregateExchangeRatePrevote } from './AggregateExchangeRatePrevote';
import data from './AggregateExchangeRatePrevote.data.json';

describe('AggregateExchangeRatePrevote', () => {
  it('deserializes', () => {
    const obj = AggregateExchangeRatePrevote.fromAmino(data);
    expect(obj.toAmino()).toMatchObject(data);
  });
});
