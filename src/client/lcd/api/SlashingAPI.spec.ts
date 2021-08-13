import { APIRequester } from '../APIRequester';
import { SlashingAPI } from './SlashingAPI';
import { Dec } from '../../../core/numeric';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const slashing = new SlashingAPI(c);

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
