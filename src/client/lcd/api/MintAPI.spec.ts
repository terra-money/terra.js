import { Dec } from '../../../core/numeric';
import { LCDClient } from '../LCDClient';
import { MintAPI } from './MintAPI';

const terra = new LCDClient({ chainID: 'localterra', URL: "http://localhost:1317" });
const api = new MintAPI(terra);

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
