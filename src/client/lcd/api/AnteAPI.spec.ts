import { AnteAPI } from './AnteAPI';
import { BaseAccount } from '../../../core';
import { MnemonicKey } from '../../../key';
import { LCDClient } from '../LCDClient';

// TODO - restore to https://lcd.terra.dev
const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const ante = new AnteAPI(terra);

describe('AnteAPI', () => {
  describe('query minimum commission', () => {
    it('query minimum commission', async () => {
      const mc = await ante.minimumCommission();
      expect(mc).toBeGreaterThanOrEqual(0.0);
    });
  });

  describe('query ante params', () => {
    it('query ante params', async () => {
      const params = await ante.parameters();
      expect(params.minimumCommissionEnforced).toBeDefined();
    });
  });
});
