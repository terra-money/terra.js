import { LCDClient } from './LCDClient';
import { LCDUtils } from './LCDUtils';
import { Coin, Validator } from '../../core';

const lcdUtils = new LCDUtils(
  new LCDClient({
    chainID: 'pisco-1',
    URL: 'https://pisco-lcd.terra.dev',
  })
);

describe('LCDUtils', () => {
  it('calculateTax', async () => {
    if (lcdUtils.lcd.config.isClassic) {
      await expect(
        lcdUtils.calculateTax(new Coin('uluna', '0.0'))
      ).resolves.toBeInstanceOf(Coin);
    }
  });

  it('validatorsWithVotingPower', async () => {
    const vwv = await lcdUtils.validatorsWithVotingPower();

    expect(vwv[Object.keys(vwv)[0]]).toMatchObject({
      validatorInfo: expect.any(Validator),
      votingPower: expect.any(Number),
      proposerPriority: expect.any(Number),
    });
  });
});
