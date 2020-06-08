import { LCDClient } from './LCDClient';

describe('LCDClient', () => {
  it('runs', async () => {
    new LCDClient({
      chainID: 'columbus-3',
      URL: 'https://lcd.terra.dev',
    });
  });
});
