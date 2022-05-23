import { MarketAPI } from './MarketAPI';
import { Dec } from '../../../core/numeric';
import { LCDClient } from '../LCDClient';

const terra = new LCDClient({ chainID: 'bombay-12', URL: "https://bombay-lcd.terra.dev/" });
const market = new MarketAPI(terra);

describe('MarketAPI', () => {
  if (terra.config.legacy) { // only legacy network has param query
    it('parameters', async () => {
      await expect(market.parameters()).resolves.toMatchObject({
        pool_recovery_period: expect.any(Number),
        base_pool: expect.any(Dec),
        min_stability_spread: expect.any(Dec),
      });
    });
  }
});
