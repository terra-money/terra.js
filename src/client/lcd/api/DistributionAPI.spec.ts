import { APIRequester } from '../APIRequester';
import { DistributionAPI } from './DistributionAPI';

import { Dec } from '../../../core';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const distribution = new DistributionAPI(c);

describe('DistributionAPI', () => {
  it('parameters', async () => {
    await expect(distribution.parameters()).resolves.toMatchObject({
      community_tax: expect.any(Dec),
      base_proposer_reward: expect.any(Dec),
      bonus_proposer_reward: expect.any(Dec),
      withdraw_addr_enabled: expect.any(Boolean),
    });
  });
});
