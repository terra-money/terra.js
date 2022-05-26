import { SlashingAPI } from './SlashingAPI';
import { Dec } from '../../../core/numeric';
import { LCDClient } from '../LCDClient';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const slashing = new SlashingAPI(terra);

describe('SlashingAPI', () => {
  it('parameters', async () => {
    await expect(slashing.parameters()).resolves.toMatchObject({
      signed_blocks_window: expect.any(Number),
      min_signed_per_window: expect.any(Dec),
      downtime_jail_duration: expect.any(Number),
      slash_fraction_double_sign: expect.any(Dec),
      slash_fraction_downtime: expect.any(Dec),
    });
  });
});
