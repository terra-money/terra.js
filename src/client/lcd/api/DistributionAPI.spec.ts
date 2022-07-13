import { DistributionAPI } from './DistributionAPI';

import { Dec, Coins } from '../../../core';
import { LCDClient } from '../LCDClient';

const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const distribution = new DistributionAPI(terra);

// distributionForTest()
describe('DistributionAPI', () => {
  it('parameters', async () => {
    await expect(distribution.parameters()).resolves.toMatchObject({
      community_tax: expect.any(Dec),
      base_proposer_reward: expect.any(Dec),
      bonus_proposer_reward: expect.any(Dec),
      withdraw_addr_enabled: expect.any(Boolean),
    });
  });

  it('rewards', async () => {
    await expect(
      distribution.rewards('terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v')
    ).resolves.toMatchObject({
      rewards: expect.anything(),
      total: expect.any(Coins),
    });
  });

  // it('validatorCommission', async ()=>{
  //   await expect(distribution.validatorCommission(validatorWallet.key.valAddress)).resolves.toEqual(expect.any(Coins))
  // })

  it('withdrawAddress', async () => {
    await expect(
      distribution.withdrawAddress(
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'
      )
    ).resolves.toEqual('terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v');
  });

  it('communityPool', async () => {
    await expect(distribution.communityPool()).resolves.toEqual(
      expect.any(Coins)
    );
  });
});
