import { APIRequester } from '../APIRequester';
import { GovAPI } from './GovAPI';
import { Coins, Dec } from '../../../core';

const c = new APIRequester('https://lcd.terra.dev/');
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
        veto: expect.any(Dec),
      },
    });
  });
});
