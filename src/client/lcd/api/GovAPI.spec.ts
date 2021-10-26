import { APIRequester } from '../APIRequester';
import { GovAPI } from './GovAPI';
import { Coins, Dec, Int } from '../../../core';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const gov = new GovAPI(c);

describe('GovAPI', () => {
  it('parameters', async () => {
    await expect(gov.parameters()).resolves.toMatchObject({
      deposit_params: {
        min_deposit: expect.any(Coins),
        max_deposit_period: expect.any(Number),
      },
      voting_params: {
        voting_period: expect.any(Number),
      },
      tally_params: {
        quorum: expect.any(Dec),
        threshold: expect.any(Dec),
        veto_threshold: expect.any(Dec),
      },
    });
  });

  it('tally', async () => {
    await expect(gov.tally(5333)).resolves.toMatchObject({
      yes: expect.any(Int),
      abstain: expect.any(Int),
      no: expect.any(Int),
      no_with_veto: expect.any(Int),
    });
  });
});
