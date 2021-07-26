import { APIRequester } from '../APIRequester';
import { MarketAPI } from './MarketAPI';
import { Dec } from '../../../core/numeric';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const market = new MarketAPI(c);

describe('MarketAPI', () => {
  it('parameters', async () => {
    await expect(market.parameters()).resolves.toMatchObject({
      pool_recovery_period: expect.any(Number),
      base_pool: expect.any(Dec),
      min_stability_spread: expect.any(Dec),
    });
  });
});
