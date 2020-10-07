import { APIRequester } from '../APIRequester';
import { TreasuryAPI } from './TreasuryAPI';
import { Dec, PolicyConstraints } from '../../../core';

const c = new APIRequester('https://lcd.terra.dev/');
const treasury = new TreasuryAPI(c);

describe('TreasuryAPI', () => {
  it('parameters', async () => {
    await expect(treasury.parameters()).resolves.toMatchObject({
      tax_policy: expect.any(PolicyConstraints),
      reward_policy: expect.any(PolicyConstraints),
      seigniorage_burden_target: expect.any(Dec),
      mining_increment: expect.any(Dec),
      window_short: expect.any(Number),
      window_long: expect.any(Number),
      window_probation: expect.any(Number),
    });
  });
});
