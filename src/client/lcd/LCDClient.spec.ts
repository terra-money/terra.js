import { Coin } from '../../core';
import { LCDClient } from './LCDClient';

describe('LCDClient', () => {
  it('runs', async () => {
    const terra = new LCDClient({
      chainID: 'columbus-4',
      URL: 'https://lcd.terra.dev',
    });

    console.log(await terra.utils.calcTax(new Coin('ukrw', 23209)));
  });
});
