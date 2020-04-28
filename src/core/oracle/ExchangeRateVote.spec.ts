import { ExchangeRateVote } from './ExchangeRateVote';
const data = require('./ExchangeRateVote.data.json');

describe('ExchangeRateVote', () => {
  it('deserializes', () => {
    data.forEach((ex: ExchangeRateVote.Data) => {
      const xrv = ExchangeRateVote.fromData(ex);
      expect(xrv.toData()).toMatchObject(ex);
    });
  });
});
