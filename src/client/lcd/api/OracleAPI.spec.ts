import { APIRequester } from '../APIRequester';
import { OracleAPI } from './OracleAPI';
import { Dec } from '../../../core/numeric';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const oracle = new OracleAPI(c);

describe('OracleAPI', () => {
  it('parameters', async () => {
    await expect(oracle.parameters()).resolves.toMatchObject({
      vote_period: expect.any(Number),
      vote_threshold: expect.any(Dec),
      reward_band: expect.any(Dec),
      reward_distribution_window: expect.any(Number),
      whitelist: expect.any(Array),
      slash_fraction: expect.any(Dec),
      slash_window: expect.any(Number),
      min_valid_per_window: expect.any(Dec),
    });

    const params = await oracle.parameters();
    expect(params.whitelist[0].tobin_tax).toEqual(expect.any(Dec));
  });
});
