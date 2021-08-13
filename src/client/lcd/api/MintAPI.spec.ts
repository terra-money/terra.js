import { Dec } from '../../../core/numeric';
import { APIRequester } from '../APIRequester';
import { MintAPI } from './MintAPI';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const api = new MintAPI(c);

describe('MintAPI', () => {
  it('inflation', async () => {
    await expect(api.inflation()).resolves.toBeInstanceOf(Dec);
  });

  it('annual provisions', async () => {
    await expect(api.annualProvisions()).resolves.toBeInstanceOf(Dec);
  });

  it('parameters', async () => {
    await expect(api.parameters()).resolves.toMatchObject({
      mint_denom: expect.any(String),
      inflation_rate_change: expect.any(Dec),
      inflation_max: expect.any(Dec),
      inflation_min: expect.any(Dec),
      goal_bonded: expect.any(Dec),
      blocks_per_year: expect.any(Number),
    });
  });
});
