import { APIRequester } from '../APIRequester';
import { StakingAPI } from './StakingAPI';

// TODO - restore to https://lcd.terra.dev
const c = new APIRequester('https://bombay-lcd.terra.dev/');
const staking = new StakingAPI(c);

describe('StakingAPI', () => {
  it('parameters', async () => {
    await expect(staking.parameters()).resolves.toMatchObject({
      unbonding_time: expect.any(Number),
      max_validators: expect.any(Number),
      max_entries: expect.any(Number),
      historical_entries: expect.any(Number),
      bond_denom: expect.any(String),
      power_reduction: expect.any(String),
    });
  });
});
