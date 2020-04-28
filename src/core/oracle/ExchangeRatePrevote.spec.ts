import { ExchangeRatePrevote } from './ExchangeRatePrevote';
const data = require('./ExchangeRatePrevote.data.json');

describe('ExchangeRatePrevote', () => {
  it('deserializes', () => {
    data.forEach((ex: ExchangeRatePrevote.Data) => {
      const xrpv = ExchangeRatePrevote.fromData(ex);
      expect(xrpv.toData()).toMatchObject(ex);
    });
  });
});
