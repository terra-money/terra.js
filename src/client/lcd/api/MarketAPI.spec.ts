import { MarketAPI } from './MarketAPI';
import { Dec } from '../../../core/numeric';
import { LCDClient } from '../LCDClient';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev/',
});
const market = new MarketAPI(terra);

describe('MarketAPI', () => {
  it('parameters', async () => {
    if (terra.config.isClassic) {
      // only classic network has param query
      await expect(market.parameters()).resolves.toMatchObject({
        pool_recovery_period: expect.any(Number),
        base_pool: expect.any(Dec),
        min_stability_spread: expect.any(Dec),
      });
    }
  });
});
