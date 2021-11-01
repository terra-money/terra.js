import { APIRequester } from '../APIRequester';
import { TreasuryAPI } from './TreasuryAPI';
import { Coins, Dec, PolicyConstraints } from '../../../core';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const treasury = new TreasuryAPI(c);

describe('TreasuryAPI', () => {
  it('taxCaps', async () => {
    await expect(treasury.taxCaps()).resolves.toBeInstanceOf(Coins);
  });

  it('taxCap (uusd)', async () => {
    await expect(
      treasury.taxCap('uusd').then(r => r.toData())
    ).resolves.toMatchObject({
      denom: expect.any(String),
      amount: expect.any(String),
    });
  });

  it('taxCap (invalid)', async () => {
    await expect(treasury.taxCap('x')).rejects.toThrow();
  });

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
