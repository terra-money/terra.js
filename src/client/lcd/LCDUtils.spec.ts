import { LCDClient } from './LCDClient';
import { LCDUtils } from './LCDUtils';
import { Validator } from '../../core';

const lcdUtils = new LCDUtils(
  new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
  })
);

describe('LCDUtils', () => {
  it('validatorsWithVotingPower', async () => {
    const vwv = await lcdUtils.validatorsWithVotingPower();

    expect(vwv[Object.keys(vwv)[0]]).toMatchObject({
      validatorInfo: expect.any(Validator),
      votingPower: expect.any(Number),
      proposerPriority: expect.any(Number),
    });
  });
});
